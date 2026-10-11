/**
 * TCM 2026 クリスマスマグカップメーカー — GASバックエンド（利用ログ集計）
 *
 * 役割
 *  ・ページの利用ログ（open / start / to_photo / capture / save / share）をスプレッドシートに記録
 *  ・撮影時に選ばれた「地色・キャラ・色違い・フレーム・背景」を記録し、人気ランキングを自動集計
 *  ※ 利用者が撮った写真や画像は受け取りません・保存しません
 *
 * 初回のみ：エディタで setup() を実行 → ウェブアプリとしてデプロイ
 *          （実行ユーザー：自分 / アクセスできるユーザー：全員）→ /exec のURLを config.js の GAS_URL へ
 *
 * スクリプトプロパティ
 *  SPREADSHEET_ID : setup() が自動設定
 */

const PROPS = PropertiesService.getScriptProperties();
const LOG_HEADERS = ['timestamp', 'env', 'event', 'sessionId', 'device', 'color', 'slots', 'pats', 'frame', 'bg', 'detail', 'ua'];

/* ---------------- 初期セットアップ ---------------- */
function setup() {
  let ssId = PROPS.getProperty('SPREADSHEET_ID');
  if (!ssId) {
    const ss = SpreadsheetApp.create('TCM2026_マグカップメーカー_集計');
    ssId = ss.getId();
    PROPS.setProperty('SPREADSHEET_ID', ssId);
  }
  const ss = SpreadsheetApp.openById(ssId);
  const logs = ensureSheet_(ss, 'logs', LOG_HEADERS);
  logs.setFrozenRows(1);

  const sum = ensureSheet_(ss, 'summary', []);
  sum.clear();
  sum.getRange('A1').setValue('イベント別 件数（本番のみ）').setFontWeight('bold');
  sum.getRange('A2').setFormula("=IFERROR(QUERY(logs!A2:L,\"select C, count(C) where B='production' and C<>'' group by C label C 'event', count(C) '件数'\",0),\"（まだデータがありません）\")");

  sum.getRange('D1').setValue('日別×イベント（本番のみ）').setFontWeight('bold');
  sum.getRange('D2').setFormula("=IFERROR(QUERY({ARRAYFORMULA(IF(logs!A2:A=\"\",,INT(logs!A2:A))),logs!B2:C},\"select Col1, count(Col3) where Col2='production' and Col3<>'' group by Col1 pivot Col3 label Col1 '日付'\",0),\"（まだデータがありません）\")");
  sum.getRange('D3:D').setNumberFormat('yyyy/mm/dd');

  sum.getRange('A14').setValue('人気の地色（撮影時・本番）').setFontWeight('bold');
  sum.getRange('A15').setFormula("=IFERROR(QUERY(logs!B2:F,\"select F, count(F) where B='production' and C='capture' group by F order by count(F) desc label F '地色', count(F) '回数'\",0),\"（まだデータがありません）\")");

  sum.getRange('D14').setValue('人気のキャラクター（撮影時・本番、6か所の合計）').setFontWeight('bold');
  sum.getRange('D15').setFormula("=IFERROR(QUERY(FLATTEN(ARRAYFORMULA(IFERROR(SPLIT(FILTER(logs!G2:G,logs!B2:B=\"production\",logs!C2:C=\"capture\"),\"|\")))),\"select Col1, count(Col1) where Col1<>'' and Col1<>'-' group by Col1 order by count(Col1) desc label Col1 'キャラ', count(Col1) '回数'\",0),\"（まだデータがありません）\")");

  sum.getRange('G14').setValue('フレーム / 背景（撮影時・本番）').setFontWeight('bold');
  sum.getRange('G15').setFormula("=IFERROR(QUERY(logs!B2:J,\"select I, J, count(I) where B='production' and C='capture' group by I, J label I 'フレーム', J '背景', count(I) '回数'\",0),\"（まだデータがありません）\")");

  sum.getRange('A40').setValue('ユニーク利用（本番・session数）').setFontWeight('bold');
  sum.getRange('A41').setFormula("=IFERROR(ROWS(UNIQUE(FILTER(logs!D2:D, logs!B2:B=\"production\"))),0)");
  sum.getRange('D40').setValue('端末（本番・open）').setFontWeight('bold');
  sum.getRange('D41').setFormula("=IFERROR(QUERY(logs!B2:E,\"select E, count(E) where B='production' and C='open' group by E label E '端末', count(E) '回数'\",0),\"（まだデータがありません）\")");

  ss.getSheets().forEach(s => { if (s.getName() === 'シート1' || s.getName() === 'Sheet1') ss.deleteSheet(s); });
  Logger.log('Spreadsheet: https://docs.google.com/spreadsheets/d/' + ssId);
}

function ensureSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (headers.length && sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  }
  return sh;
}

/* ---------------- エンドポイント ---------------- */
function doGet() {
  return json_({ ok: true, service: 'tcm2026-mug-maker', time: new Date().toISOString() });
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad_json' }); }
  try {
    if (body.action === 'log') return json_(handleLog_(body));
    return json_({ ok: false, error: 'unknown_action' });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err.message || err) });
  }
}

const EVENTS = ['open', 'start', 'to_photo', 'capture', 'save', 'share'];

function handleLog_(b) {
  const event = String(b.event || '');
  if (EVENTS.indexOf(event) < 0) return { ok: false, error: 'unknown_event' };
  const d = (b.detail && typeof b.detail === 'object') ? b.detail : {};
  const cut = (v, n) => String(v == null ? '' : v).slice(0, n);
  const row = [
    new Date(),
    b.env === 'production' ? 'production' : 'test',
    event,
    cut(b.sessionId, 40),
    cut(b.device, 4),
    cut(d.color, 20),
    cut(d.slots, 120),
    cut(d.pats, 80),
    cut(d.frame, 10),
    cut(d.bg, 10),
    cut(d.ref, 120),
    cut(b.ua, 180)
  ];
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    SpreadsheetApp.openById(PROPS.getProperty('SPREADSHEET_ID')).getSheetByName('logs').appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return { ok: true };
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
