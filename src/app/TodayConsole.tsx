import { Link } from "react-router-dom";
import { useDemo, type ConsoleTab } from "../state/DemoStore";
import { DispatchBoard } from "../components/board/DispatchBoard";
import { OrderDetail } from "../components/orders/OrderDetail";
import { OrderInbox } from "../components/orders/OrderInbox";
import { LeisurePanel } from "../components/orders/LeisurePanel";
import { DispatchDesk } from "../components/orders/DispatchDesk";

const TABS: { id: ConsoleTab; label: string }[] = [
  { id: "today", label: "今日" },
  { id: "orders", label: "受注" },
  { id: "board", label: "配車盤" },
  { id: "alerts", label: "確認" },
];

type Props = {
  returnUrl?: string | null;
};

export function TodayConsole({ returnUrl = null }: Props) {
  const {
    board,
    consoleTab,
    setConsoleTab,
    setStep,
    returnDecision,
    openCount,
    confirmCount,
    idleCount,
    candidateCount,
    dutyAlerts,
    orders,
  } = useDemo();

  const decided = returnDecision !== "pending";
  const faxAlerts = orders.filter((o) => o.needsConfirm);

  return (
    <div className="console">
      <header className="console-hd">
        <div>
          <h1>配車</h1>
          <p>{board.dateLabel}</p>
        </div>
      </header>

      <nav className="console-tabs" aria-label="画面">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={consoleTab === t.id ? "is-on" : undefined}
            onClick={() => setConsoleTab(t.id)}
          >
            {t.label}
            {t.id === "alerts" && dutyAlerts.length + faxAlerts.length > 0 ? (
              <em>{dutyAlerts.length + faxAlerts.length}</em>
            ) : null}
          </button>
        ))}
      </nav>

      {consoleTab === "today" ? (
        <div className="console-body is-desk">
          <div className="stat-row is-slim">
            <div className="stat">
              <b>{openCount}</b>
              <span>未処理</span>
            </div>
            <div className="stat">
              <b>{confirmCount}</b>
              <span>要確認</span>
            </div>
            <div className="stat">
              <b>{idleCount}</b>
              <span>空で戻る</span>
            </div>
            <div className={`stat${candidateCount ? " is-hot" : ""}`}>
              <b>{candidateCount}</b>
              <span>候補</span>
            </div>
          </div>

          <DispatchDesk />

          {dutyAlerts.length > 0 || faxAlerts.length > 0 ? (
            <div className="console-section">
              <div className="console-label">確認</div>
              <ul className="alert-list">
                {dutyAlerts.map((a) => (
                  <li key={a.vehicleId + a.ruleId}>
                    <span className="alert-tag">運行</span>
                    {a.vehicleName}　{a.message}
                  </li>
                ))}
                {faxAlerts.map((o) => (
                  <li key={o.id}>
                    <span className="alert-tag">受注</span>
                    {o.channel}　{o.route.from} → {o.route.to}　
                    {o.confirmNote}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="console-cta">
            {!decided ? (
              <button
                type="button"
                className="btn"
                onClick={() => setStep("board")}
              >
                空の車を見る
              </button>
            ) : (
              <div className="console-after">
                <p>
                  {returnDecision === "accepted"
                    ? "帰り荷を載せました。休息の確認は残っています。"
                    : "帰り荷は載せませんでした。確認は残っています。"}
                </p>
                <Link className="btn ghost" to="/lp" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                  この画面の意味を読む
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {consoleTab === "orders" ? (
        <div className="console-body">
          <OrderInbox />
          <div className="console-section">
            <div className="console-label">依頼の内容</div>
            <OrderDetail />
          </div>
          <div className="console-section">
            <div className="console-label">記録が少ない案件</div>
            <LeisurePanel />
          </div>
        </div>
      ) : null}

      {consoleTab === "board" ? (
        <div className="console-body">
          <DispatchBoard interactive={false} showIntent={false} />
        </div>
      ) : null}

      {consoleTab === "alerts" ? (
        <div className="console-body">
          <ul className="alert-list tall">
            {dutyAlerts.length === 0 && faxAlerts.length === 0 ? (
              <li>いま確認する件はありません。</li>
            ) : null}
            {dutyAlerts.map((a) => (
              <li key={a.vehicleId + a.ruleId}>
                <span className="alert-tag">運行</span>
                {a.vehicleName}　{a.message}
              </li>
            ))}
            {faxAlerts.map((o) => (
              <li key={o.id}>
                <span className="alert-tag">受注</span>
                {o.channel}　{o.route.from} → {o.route.to}
                <br />
                <span className="alert-sub">{o.confirmNote}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
