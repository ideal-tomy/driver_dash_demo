import { useState } from "react";
import { useDemo } from "../../state/DemoStore";
import { DispatchBoard } from "../board/DispatchBoard";
import { ThisTimeCard } from "./ThisTimeCard";

export function DispatchDesk() {
  const { deskOrders, board } = useDemo();
  const [selectedId, setSelectedId] = useState("ord-1058695");
  const selected =
    deskOrders.find((o) => o.id === selectedId) ?? deskOrders[0] ?? null;

  return (
    <div className="desk">
      <div className="desk-split">
        <section className="desk-left" aria-label="受注一覧">
          <div className="desk-pane-hd">
            <span>受注一覧</span>
            <span>{board.dateLabel}</span>
          </div>
          <div className="desk-table-wrap">
            <table className="desk-table">
              <thead>
                <tr>
                  <th>入口</th>
                  <th>荷主</th>
                  <th>積地</th>
                  <th>卸地</th>
                  <th>車種</th>
                  <th>日時</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {deskOrders.map((o) => {
                  const on = o.id === selected?.id;
                  const rowClass = [
                    on ? "is-on" : "",
                    o.isReturnCandidate ? "is-cand" : "",
                    o.needsConfirm ? "is-confirm" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <tr
                      key={o.id}
                      className={rowClass || undefined}
                      aria-selected={on}
                      tabIndex={0}
                      onClick={() => setSelectedId(o.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(o.id);
                        }
                      }}
                    >
                      <td>{o.channel}</td>
                      <td>{o.shipper}</td>
                      <td>{o.route.from}</td>
                      <td>{o.route.to}</td>
                      <td>{o.vehicleType}</td>
                      <td>{o.loadDate}</td>
                      <td>
                        {o.isReturnCandidate ? (
                          <span className="tg sug">候補</span>
                        ) : o.needsConfirm ? (
                          <span className="tg w">要確認</span>
                        ) : o.status === "done" ? (
                          <span className="tg">処理済</span>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="desk-right" aria-label="運行">
          <DispatchBoard
            interactive={false}
            compact
            showIntent={false}
            showAlerts={false}
            showReason={false}
          />
        </section>
      </div>

      <section className="desk-bottom" aria-label="今回の根拠">
        {selected?.isReturnCandidate ? (
          <div className="scr">
            <div className="top">
              <span>帰り荷の候補</span>
              <span>
                {selected.route.from} → {selected.route.to}
              </span>
            </div>
            <p className="knowledge-reason">{board.suggestion.reason}</p>
          </div>
        ) : selected?.needsConfirm ? (
          <div className="scr">
            <div className="top">
              <span>要確認</span>
              <span>
                {selected.route.from} → {selected.route.to}
              </span>
            </div>
            <p className="knowledge-lead">
              {selected.confirmNote}。読めないところは埋めません。確定するのは担当者です。
            </p>
          </div>
        ) : selected?.id === "ord-1058695" ? (
          <ThisTimeCard />
        ) : (
          <div className="scr">
            <div className="top">
              <span>今回の配車の場合</span>
              <span>
                {selected?.route.from} → {selected?.route.to}
              </span>
            </div>
            <p className="knowledge-lead">
              この条件の過去がまだ少ないため、候補は出していません。
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
