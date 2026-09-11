# 運送 配車ナレッジ — Demo Definition

## 1. Demo Identity

- Demo ID: `driver-dash`
- Demo Name: 運送 配車ナレッジ デモ
- Brand ID: `ideal`
- Demo Type: Workflow + Dashboard
- Requirement File: `docs/01_テーマ別要件定義書.md`

## 2. Demo Goal

依頼が同じ一覧に入り、空で戻る車に隣の荷物が候補として出る。載せるかは人が決める、と体験する。

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
| `/` | 商談フロー（今日 → 図 → 候補 → 今日） |
| `/board` | 今日コンソール単独 |

## 5. Scenario

1. 今日の業務画面を見る（件数・盤・確認）
2. 分かれ方の図で「隣に渡らない」を見る
3. 配車盤で帰り荷候補を載せる／載せない
4. 今日の画面に決定が反映される
5. 任意で図の再演・規模の話

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

- [ ] 図解のあと、盤で候補を載せる／載せないがどちらもできる
- [ ] 載せても休息の確認は消えない
- [ ] 金額・配車の確定をシステムが言わない
- [ ] 画面の件数・ルートが fixtures と一致する
- [ ] 第4部を飛ばして最初に戻れる
- [ ] 説明文を開かなくても盤の操作は完走できる
- [ ] `npm run build` 成功
