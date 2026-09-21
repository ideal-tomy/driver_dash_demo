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
      <ProgressBar variant="delivery" />
      <div className="wrap wide" style={{ paddingTop: 8 }}>
        {step === "today" ||
        step === "part1" ||
        step === "part3" ||
        step === "part4" ? (
          <TodayConsole variant="delivery" returnUrl={returnUrl} />
        ) : null}
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
        {!returnUrl ? (
          <div className="foot">
            <Link to="/" style={{ color: "#6B6B66" }}>
              商談フローに戻る
            </Link>
          </div>
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
