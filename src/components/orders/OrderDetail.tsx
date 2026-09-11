import { filterAvailableVehicles } from "../../domain/filterAvailableVehicles";
import { findSurchargeHint } from "../../domain/findSimilarCases";
import { useDemo } from "../../state/DemoStore";

export function OrderDetail() {
  const { detailOrder, similarForDetail, fleet } = useDemo();
  if (!detailOrder) return null;

  const hint = findSurchargeHint(
    similarForDetail,
    detailOrder.surchargeListed,
  );
  const filters = filterAvailableVehicles(fleet);

  return (
    <div className="scr">
      <div className="top">
        <span>依頼の内容</span>
        <span>受付番号 1058695</span>
      </div>
      <table className="kv">
        <tbody>
          <tr>
            <th>積み</th>
            <td>
              {detailOrder.pickup?.when}
              <br />
              {detailOrder.pickup?.place}
              <br />
              ドライバー作業：{detailOrder.pickup?.driverWork}
            </td>
          </tr>
          <tr>
            <th>卸し</th>
            <td>
              {detailOrder.dropoff?.when}
              <br />
              {detailOrder.dropoff?.place}
              <br />
              ドライバー作業：{detailOrder.dropoff?.driverWork}
            </td>
          </tr>
          <tr>
            <th>荷物</th>
            <td>{detailOrder.cargoDetail}</td>
          </tr>
          <tr>
            <th>車両</th>
            <td>{detailOrder.vehicleNote}</td>
          </tr>
        </tbody>
      </table>
      <div className="hdr">条件の近い過去の案件</div>
      {similarForDetail.map((c) => (
        <div className="row" key={c.id}>
          <div className="rt">
            {c.route.from} → {c.route.to}　{c.vehicleType}
          </div>
          <div className="sub">
            {c.date} ／ 運賃 {c.fare?.toLocaleString("ja-JP")}円 ／ 付帯作業料{" "}
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
      <div className="hdr">この依頼に出せる車</div>
      {filters.map((f) => (
        <div className="fn" key={f.label}>
          <span className="b" style={{ width: f.barWidth }} />
          <span className="t">
            <b>{f.count}台</b>
            {f.label}
          </span>
        </div>
      ))}
      <div className="warn">
        <b>残り1台になります</b>
        {fleet.remainingReason}
      </div>
      <details className="intent" style={{ margin: "0 10px 12px" }}>
        <summary>この画面の意図</summary>
        <div className="exp">
          <b>金額を決めるのはシステムではありません。</b>
          過去にいくらで受けたかを並べて、記載の抜けているところだけを指摘します。
          出すかどうかは担当者が荷主と決めます。
        </div>
      </details>
    </div>
  );
}
