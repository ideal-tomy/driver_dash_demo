import { findSurchargeHint } from "../../domain/findSimilarCases";
import { useDemo } from "../../state/DemoStore";

/** 本線で一度見せる「今回の配車の場合は…」。金額は決めない。 */
export function ThisTimeCard() {
  const { detailOrder, similarForDetail, fleet } = useDemo();
  if (!detailOrder) return null;

  const hint = findSurchargeHint(
    similarForDetail,
    detailOrder.surchargeListed,
  );

  return (
    <div className="scr knowledge-card">
      <div className="top">
        <span>今回の配車の場合</span>
        <span>
          {detailOrder.route.from} → {detailOrder.route.to}
        </span>
      </div>
      <p className="knowledge-lead">
        過去の近い案件です。出す金額は担当者が決めます。
      </p>
      {similarForDetail.map((c) => (
        <div className="row" key={c.id}>
          <div className="rt">
            {c.route.from} → {c.route.to}
          </div>
          <div className="sub">
            {c.date} ／ 運賃 {c.fare?.toLocaleString("ja-JP")}円 ／ 付帯{" "}
            {c.surcharge ? `${c.surcharge.toLocaleString("ja-JP")}円` : "なし"}
          </div>
        </div>
      ))}
      {hint ? (
        <div className="warn">
          <b>{hint.title}</b>
          {hint.body}
        </div>
      ) : null}
      <p className="knowledge-remain">{fleet.remainingReason}</p>
    </div>
  );
}
