import { useDemo } from "../../state/DemoStore";

type Props = {
  onConfirmFax?: boolean;
};

export function OrderInbox({ onConfirmFax = true }: Props) {
  const { orders, confirmFax } = useDemo();
  const open = orders.filter((o) => o.status === "open");
  const done = orders.filter((o) => o.status === "done");

  return (
    <div className="scr">
      <div className="top">
        <span>受注一覧</span>
        <span>9月12日(金)</span>
      </div>
      <div className="tab">
        <b>未処理 {open.length}</b>
        <span>処理済 {done.length + 15}</span>
        <span>すべて</span>
      </div>
      {orders.map((o) => (
        <div className="row" key={o.id}>
          <div className="hd">
            <span className={`tg${o.channel === "ネット" ? " k" : ""}`}>
              {o.channel}
            </span>
            <span className="sub">{o.receivedAt} 受付</span>
            {o.needsConfirm ? <span className="tg w">要確認</span> : null}
            {o.status === "done" ? <span className="tg">処理済</span> : null}
          </div>
          <div className="rt">
            {o.route.from} → {o.route.to}
          </div>
          <div className="sub">
            {o.loadDate} ／ {o.vehicleType} ／ {o.cargoSummary}
          </div>
          {onConfirmFax &&
          o.needsConfirm &&
          o.channel === "FAX" &&
          o.id === "ord-1058696" ? (
            <div style={{ marginTop: 6 }}>
              <button
                type="button"
                className="btn"
                style={{ padding: "8px 10px", fontSize: 12 }}
                onClick={() => confirmFax(o.id)}
              >
                総重量を確定して処理済にする
              </button>
            </div>
          ) : null}
        </div>
      ))}
      <details className="intent" style={{ margin: "0 10px 12px" }}>
        <summary>この画面の意図</summary>
        <div className="exp">
          ネット、FAX、電話で来た依頼が、<b>同じ形で一覧に並びます</b>。
          FAXと電話は、読み取れなかったところに要確認が付きます。
          読めないものをシステムが埋めることはしません。中身を確定するのは担当者です。
        </div>
      </details>
    </div>
  );
}
