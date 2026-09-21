# 運送 配車ナレッジ — Demo Definition

## 1. Demo Identity

- Demo ID: `driver-dash`
- Demo Name: 運送 配車ナレッジ デモ
- Brand ID: `ideal`
- Demo Type: Workflow + Dashboard
- Requirement File: `docs/01_テーマ別要件定義書.md`

## 2. Demo Goal

依頼が同じ表に入り、空で戻る車に隣の荷物が候補として出る。載せるかは人が決める、と体験する。

体験終了時の理想状態: 「候補は出るが、確定は自分。配車室に置きたい。」

最重要価値: 実務感 / 信頼性 / 導入後の想像しやすさ

## 3. Common Core Integration

- Access Mode: Sample のみ
- Core / Trial / ROI: **未接続（次フェーズ）**
- AI API: 呼ばない
- Knowledge: デモ固有の `KnowledgeRepository`（JSON）。差し替え口だけ先に切る

## 4. Routes

| パス | 内容 |
|------|------|
| `/` | `/board` へ転送（体験を先に出す） |
| `/board` | 体験デモ（今日 → 候補 → 今日） |
| `/lp` | デモ後の説明（図をページ内に埋め込み） |

厳選版 CTA: `/board?from=axeon-demo-selection`（説明LPを経由しない）

## 5. Scenario

1. `/board` で今日の手配デスクを見る
2. 配車盤で帰り荷候補を載せる／載せない
3. 今日の画面に決定が反映される（休息・FAX確認は残る）
4. 任意で `/lp` を読み、今の現場・さっきの画面・人が増えたときを確認する

## 6. Adapter

| Port | v1 | 本番 |
|------|----|------|
| KnowledgeRepository | `memory.ts` + fixtures JSON | Core Knowledge / API |
| DispatchSession | メモリ上の確定 | API / DB |

## 7. Demo Config

```ts
export const demoConfig = {
  demoId: "driver-dash",
  demoName: "運送 配車ナレッジ デモ",
  brandId: "ideal",
  demoType: "workflow-dashboard",
  defaultMode: "sample",
};
```

## 8. 受け入れ条件

- [ ] 厳選版・直アクセスとも、先に `/board` が出る
- [ ] `/board` で候補を載せる／載せないができる（図に飛ばない）
- [ ] 載せても休息の確認は消えない
- [ ] 決定後に `/lp` へ進める
- [ ] `/lp` に図が埋め込まれ、別画面の図解に出ない
- [ ] 金額・配車の確定をシステムが言わない
- [ ] `npm run build` 成功
