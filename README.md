# 運送 配車ナレッジ デモ

配車の入口を揃え、空で戻る車に帰り荷の候補を出すデモです。確定は人がします。

## 体験の流れ

1. **今日** — 業務画面（件数・盤・確認）
2. **分かれ方** — 問題の図（8段）
3. **候補** — 配車盤で載せる／載せない
4. **今日** — 同じ画面に決定が反映
5. 任意：図の再演／規模の話

## 起動

```bash
npm install
npm run dev
```

- `/` … 商談フロー（最初から今日画面）
- `/board` … 今日コンソール単独

## 技術

- Vite + React + TypeScript
- 仮ナレッジ: `src/knowledge/fixtures/*.json`（DBなし）
- Core / Trial / ROI: 未接続

## ドキュメント

- [docs/01_テーマ別要件定義書.md](docs/01_テーマ別要件定義書.md)
- [docs/02_demo_definition.md](docs/02_demo_definition.md)
- [docs/仮ナレッジ.md](docs/仮ナレッジ.md)
