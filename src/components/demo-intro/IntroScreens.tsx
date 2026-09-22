import { memo, useEffect, type ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { DispatchBoard } from "../board/DispatchBoard";
import { TodayConsole } from "../../app/TodayConsole";
import { DemoProvider, useDemo, type ConsoleTab } from "../../state/DemoStore";
import type { ReturnDecision } from "../../knowledge/types";
import type { DeviceId } from "./story";

function phoneClass(id: DeviceId, stars: readonly DeviceId[]) {
  return `ki-device ki-monitor ki-${id}${stars.includes(id) ? " ki-active" : " ki-idle"}`;
}

function Monitor({
  id,
  tab,
  stars,
  children,
}: {
  id: DeviceId;
  tab: string;
  stars: readonly DeviceId[];
  children: ReactNode;
}) {
  return (
    <div className={phoneClass(id, stars)}>
      <div className="ki-device-bar">
        配車 <span>{tab}</span>
      </div>
      <div className="ki-monitor-body">{children}</div>
    </div>
  );
}

function IntroSeed({
  tab,
  decision,
}: {
  tab: ConsoleTab;
  decision: ReturnDecision;
}) {
  const { setConsoleTab, acceptReturn, resetReturn, returnDecision } = useDemo();
  useEffect(() => {
    setConsoleTab(tab);
    if (decision === "accepted" && returnDecision !== "accepted") acceptReturn();
    if (decision === "pending" && returnDecision !== "pending") resetReturn();
  }, [tab, decision, returnDecision, setConsoleTab, acceptReturn, resetReturn]);
  return null;
}

function Seeded({
  tab,
  decision,
  children,
}: {
  tab: ConsoleTab;
  decision: ReturnDecision;
  children: ReactNode;
}) {
  return (
    <MemoryRouter>
      <DemoProvider>
        <IntroSeed tab={tab} decision={decision} />
        {children}
      </DemoProvider>
    </MemoryRouter>
  );
}

function TodayScreen() {
  return (
    <Seeded tab="today" decision="pending">
      <div className="ld-scale">
        <TodayConsole />
      </div>
    </Seeded>
  );
}

function BoardScreen({ accepted }: { accepted: boolean }) {
  return (
    <Seeded tab="board" decision={accepted ? "accepted" : "pending"}>
      <div className="ld-scale ld-board-scale">
        <div className="console">
          <header className="console-hd">
            <div>
              <h1>配車</h1>
              <p>配車盤</p>
            </div>
          </header>
          <DispatchBoard interactive showIntent={false} compact={false} />
        </div>
      </div>
    </Seeded>
  );
}

function AlertsScreen() {
  return (
    <Seeded tab="alerts" decision="accepted">
      <div className="ld-scale">
        <TodayConsole />
      </div>
    </Seeded>
  );
}

export const IntroScreens = memo(function IntroScreens({
  phase,
  stars,
}: {
  phase: number;
  stars: readonly DeviceId[];
}) {
  return (
    <>
      <Monitor id="today" tab="今日" stars={stars}>
        <TodayScreen />
      </Monitor>
      <Monitor id="board" tab="配車盤" stars={stars}>
        <BoardScreen accepted={phase >= 4} />
      </Monitor>
      <Monitor id="alerts" tab="確認" stars={stars}>
        <AlertsScreen />
      </Monitor>
    </>
  );
});
