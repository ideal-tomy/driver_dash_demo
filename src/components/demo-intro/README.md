# 配車紹介（型B）

設計の正本：`axeon_demo_selection/docs/impl/logistics-dispatch-intro-design.md`

- 見せ切る操作：今日の一覧 → 帰り荷候補 → 人が載せる → 確認が残る
- 掲載：`/?embed=intro` のみ。`/board` と `/lp` には出さない
- 再生中に API・保存は走らせない（メモリ上の fixtures のみ）
