# TCM2026 クリスマスマグカップメーカー

2026年の公式マグカップの原画から作った立体マグに、36色の地色・12のキャラクター（キャラごとの色違い付き）を組み合わせ、
会場の背景・カメラ・手持ちの写真にフォトフレーム付きで飾って撮影できるWebコンテンツ。

## 構成
| パス | 役割 |
|---|---|
| `index.html` / `style.css` / `app.js` | GitHub Pages で公開する本体（トップページ → デザイン → ARフォト） |
| `config.js` | 本番/テスト切替・GASのURL・シェアURL（ここだけ書き換える） |
| `assets/` | マグの原画（PDF）から切り出した柄・足元の柄・キャラ12体・会場背景、配置データ `data.js` |
| `gas/` | Google Apps Script（利用ログ・人気の色/キャラの集計 → スプレッドシート） |

外部読み込みは three.js（cdnjs）と Google Fonts のみ。写真は端末内で合成し、サーバーには送りません。

## テスト → 本番の流れ
1. **テスト公開**：リポジトリの Settings → Pages → Source「Deploy from a branch」/ `main` / `/(root)`
   → `https://kakerushirasawa.github.io/<リポジトリ名>/` で確認（`config.js` は `ENV: 'test'` のまま）
2. **GAS**：script.google.com で新規プロジェクト → `gas/Code.gs` と `gas/appsscript.json` を貼り付け
   → `setup()` を実行（集計シート「TCM2026_マグカップメーカー_集計」が自動作成）
   → デプロイ → 新しいデプロイ → 種類「ウェブアプリ」（実行ユーザー：自分 / アクセス：全員）
   → 発行された `/exec` のURLを `config.js` の `GAS_URL` に設定
3. **本番**：`config.js` を `ENV: 'production'` に変更（集計は本番分のみ summary に出る）
4. **独自ドメイン（お名前.com）**：取得後、DNS設定で
   - サブドメインの場合（例 `mug.example.jp`）：CNAME → `kakerushirasawa.github.io`
   - ルートドメインの場合：A レコード `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`
   → Pages の Custom domain にドメインを入力 → 「Enforce HTTPS」にチェック（カメラ利用に https が必須）
   → `config.js` の `SHARE_URL` を新ドメインに変更
5. **公式HPへの掲載**：新ドメイン（または Pages URL）へのリンク、または iframe で埋め込む場合は
   `<iframe src="…" allow="camera; clipboard-write; web-share" style="width:100%;height:100vh;border:0"></iframe>`

## 集計シート（summary）
イベント別件数 / 日別 / 人気の地色 / 人気のキャラクター / フレーム・背景 / ユニーク利用 / 端末（PC・SP）

## 文言
文章は仮。Geminiで最終化した文言を `index.html` に差し替える。
