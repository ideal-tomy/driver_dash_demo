import { Link } from "react-router-dom";
import { useDemo } from "../state/DemoStore";
import { ProgressBar } from "../components/shell/ProgressBar";
import { useSelectionReturn } from "../hooks/useSelectionReturn";
import { DemoProvider } from "../state/DemoStore";
import { BoardExperience } from "./BoardExperience";
import { TodayConsole } from "./TodayConsole";

function DeliveryInner() {
  const { step, setStep, setConsoleTab } = useDemo();
  const { returnUrl } = useSelectionReturn();

  return (
    <>
      <header className="bar">
        <div className="barin wide">
          <b>配車</b>
          <nav className="bar-nav">
            {returnUrl ? <a href={returnUrl}>← 紹介へ</a> : null}
            <Link to="/lp">この画面の意味</Link>
          </nav>
        </div>
      </header>
      <ProgressBar />
      <div className="wrap wide" style={{ paddingTop: 8 }}>
        {step === "today" ? <TodayConsole returnUrl={returnUrl} /> : null}
        {step === "board" ? (
          <BoardExperience
            onBack={() => {
              setConsoleTab("today");
              setStep("today");
            }}
            onDone={() => {
              setConsoleTab("today");
              setStep("today");
            }}
          />
        ) : null}
      </div>
    </>
  );
}

export function BoardApp() {
  return (
    <DemoProvider>
      <DeliveryInner />
    </DemoProvider>
  );
}
