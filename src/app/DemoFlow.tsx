import { useDemo } from "../state/DemoStore";
import { DispatchBoard } from "../components/board/DispatchBoard";
import { ProgressBar } from "../components/shell/ProgressBar";
import { StoryStage } from "../components/story/StoryStage";
import { TodayConsole } from "./TodayConsole";

function BoardExperience() {
  const { setStep, returnDecision } = useDemo();
  const decided = returnDecision !== "pending";

  return (
    <div className="board-step">
      <DispatchBoard showIntent={false} />
      <div className="nav" style={{ padding: "16px 12px 0" }}>
        <button
          type="button"
          className="btn ghost"
          onClick={() => setStep("part1")}
        >
          戻る
        </button>
        <button
          type="button"
          className="btn"
          disabled={!decided}
          onClick={() => setStep("today")}
        >
          今日の画面に戻る
        </button>
      </div>
      {!decided ? (
        <p className="foot" style={{ textAlign: "center" }}>
          「載せる」か「載せない」を決めてください。
        </p>
      ) : null}
    </div>
  );
}

export function DemoFlow() {
  const { step, setStep } = useDemo();
  const wide = step === "today" || step === "board";

  return (
    <>
      <ProgressBar />
      <div className={`wrap${wide ? " wide" : ""}`}>
        {step === "today" ? <TodayConsole inFlow /> : null}
        {step === "part1" ? (
          <StoryStage
            mode="part1"
            onPart1Done={() => setStep("board")}
            onBackFromPart1={() => setStep("today")}
          />
        ) : null}
        {step === "board" ? <BoardExperience /> : null}
        {step === "part3" ? (
          <StoryStage
            mode="part3"
            onPart3Done={() => setStep("today")}
            onBackFromPart3={() => setStep("today")}
          />
        ) : null}
        {step === "part4" ? (
          <StoryStage
            mode="part4"
            onPart4Done={() => setStep("today")}
            onBackFromPart4={() => setStep("today")}
          />
        ) : null}
      </div>
    </>
  );
}
