import { useDemo } from "../../state/DemoStore";

type Props = {
  interactive?: boolean;
  compact?: boolean;
  showIntent?: boolean;
  showAlerts?: boolean;
};

export function DispatchBoard({
  interactive = true,
  compact = false,
  showIntent = true,
  showAlerts = true,
}: Props) {
  const {
    board,
    displayVehicles,
    suggestionVisible,
    returnDecision,
    acceptReturn,
    rejectReturn,
    resetReturn,
    dutyAlerts,
  } = useDemo();

  const hours: number[] = [];
  for (let h = board.hourStart; h <= board.hourEnd; h += 2) hours.push(h);

  const left = (startHour: number) =>
    (startHour - board.hourStart) * board.pxPerHour;
  const width = (startHour: number, endHour: number) =>
    Math.max(8, (endHour - startHour) * board.pxPerHour);

  const suggestion = board.suggestion;

  return (
    <div className={`scr board-scr${compact ? " is-compact" : ""}`}>
      <div className="top">
        <span>配車盤　担当5名ぶん</span>
        <span>{board.dateLabel}</span>
      </div>
      <div className="board">
        <div className="bd">
          <div className="tl">
            {hours.flatMap((h) => [
              <span key={h}>{h}</span>,
              <span key={`${h}-gap`} />,
            ])}
          </div>
          {displayVehicles.map((v) => (
            <div key={v.id}>
              <div className="br">
                <div className="nm">
                  {v.name}
                  <em>{v.lane}</em>
                </div>
                <div className="bars">
                  {v.segments.map((s) => (
                    <div
                      key={s.id}
                      className={`gbar ${s.kind}`}
                      style={{
                        left: left(s.startHour),
                        width: width(s.startHour, s.endHour),
                      }}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>
              {suggestionVisible &&
              v.id === suggestion.targetVehicleId ? (
                <div className="br">
                  <div className="nm cand">候補</div>
                  <div className="bars">
                    <div
                      className="gbar sug"
                      style={{
                        left: left(suggestion.startHour),
                        width: width(
                          suggestion.startHour,
                          suggestion.endHour,
                        ),
                      }}
                    >
                      {suggestion.label}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
          <div className="lg">
            <span>
              <i style={{ background: "#1F1F1D" }} />
              荷物を積んでいる
            </span>
            <span>
              <i
                style={{
                  background: "#E4E4DE",
                  border: "1px solid #DCDCD6",
                }}
              />
              空
            </span>
            <span>
              <i style={{ background: "#D9480F" }} />
              候補
            </span>
          </div>
        </div>
      </div>

      {showAlerts && dutyAlerts.length > 0 ? (
        <div className="warn">
          <b>{dutyAlerts.length}件、確認してください</b>
          {dutyAlerts.map((a) => (
            <span key={a.vehicleId + a.ruleId}>
              {a.vehicleName}　{a.message}
              <br />
            </span>
          ))}
        </div>
      ) : null}

      {suggestionVisible ? (
        <p className="knowledge-reason">{suggestion.reason}</p>
      ) : null}
      {returnDecision === "accepted" ? (
        <p className="knowledge-reason">
          佐野 → 深谷を載せました。向きが同じだったため候補に出しています。休息の確認は残ります。
        </p>
      ) : null}
      {returnDecision === "rejected" ? (
        <p className="knowledge-reason is-muted">
          候補は出しました。載せるかは人が決めています。
        </p>
      ) : null}

      {interactive ? (
        <div className="actions">
          {returnDecision === "pending" ? (
            <>
              <button
                type="button"
                className="btn ghost"
                onClick={rejectReturn}
              >
                載せない
              </button>
              <button type="button" className="btn" onClick={acceptReturn}>
                載せる
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn ghost" onClick={resetReturn}>
                やり直す
              </button>
              <button type="button" className="btn" disabled>
                {returnDecision === "accepted"
                  ? "載せた（確認は残る）"
                  : "載せなかった"}
              </button>
            </>
          )}
        </div>
      ) : null}

      {showIntent ? (
        <details className="intent" style={{ margin: "0 10px 12px" }}>
          <summary>この画面の意図</summary>
          <div className="exp">
            5人の担当が別々に持っていた予定を、1枚に並べています。斜線の区間は荷物を積んでいない時間です。
            <b>
              ウィング①が空で戻る時間に、東北担当が持っていた荷物が候補として出ています。
            </b>
            システムがするのはここまでです。組み替えるかどうかは担当者が決めます。
            休息や連続運転の警告も、止めるのではなく、確認してくださいと出すところまでです。
          </div>
        </details>
      ) : null}
    </div>
  );
}
