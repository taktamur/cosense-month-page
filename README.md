# Cosense Month Page

Cosense(Scrapbox) 用の月次ページを生成する Web ツール。

## デモ

https://cosense-month-page.taktamur.workers.dev/

## 機能

- 指定した月のカレンダーページを Scrapbox 形式で生成
- 前月・翌月へのナビゲーション
- クリップボードへのワンクリックコピー

## 出力例

```
2024/12
[2024/11] ← →[2025/01]

 [2024/12/01] (日)
 [2024/12/02] (月)
 [2024/12/03] (火)
 ...
 [2024/12/31] (火)
```

## 技術スタック

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Hono](https://hono.dev/) - 軽量 Web フレームワーク
- TypeScript

## 開発

```bash
# 依存関係のインストール
yarn install

# 開発サーバーの起動
yarn start

# Cloudflare Workers へのデプロイ
yarn deploy
```

## 使い方

1. デモ URL にアクセス
2. 必要に応じて前月・翌月に移動
3. 「Copy to Clipboard」ボタンでテキストをコピー
4. Scrapbox に貼り付け

クエリパラメータ `?date=YYYYMM` で任意の月を指定可能（例: `?date=202501`）

## ライセンス

MIT
