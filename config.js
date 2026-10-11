/* =========================================================
 * TCM 2026 クリスマスマグカップメーカー — 設定ファイル
 * 本番/テストの切替やURLはここだけを書き換えます。
 * ========================================================= */
window.TCM_MUG = {
  // 'test' | 'production'（集計シートで本番分だけを数えるための目印）
  ENV: 'production',

  // GAS Webアプリ（/exec）のURL。空ならログ送信は行わない
  GAS_URL: 'https://script.google.com/macros/s/AKfycbwKyWiqyIDH5KByu4TdO7s9i8ZTBg2IXTEhpBwDM6uRP1ucucRCN4EqQuk-KsIeKAyWfQ/exec',

  // SNSシェアで共有するURL。空なら表示中のページのURLを使う
  SHARE_URL: 'https://kakerushirasawa.github.io/tcm2026-mug-maker/'
};
