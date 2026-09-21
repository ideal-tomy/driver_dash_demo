import { useDemo } from "../state/DemoStore";
import { ProgressBar } from "../components/shell/ProgressBar";
import { StoryStage } from "../components/story/StoryStage";
import { BoardExperience } from "./BoardExperience";
import { TodayConsole } from "./TodayConsole";

export function DemoFlow() {
  const { step, setStep } = useDemo();
  const wide = step === "today" || step === "board";

  return (
    <>
      <ProgressBar variant="pitch" />
      <div className={`wrap${wide ? " wide" : ""}`}>
        {step === "today" ? <TodayConsole variant="pitch" /> : null}
        {step === "part1" ? (
          <StoryStage
            mode="part1"
            onPart1Done={() => setStep("board")}
            onBackFromPart1={() => setStep("today")}
          />
        ) : null}
        {step === "board" ? (
          <BoardExperience
            onBack={() => setStep("part1")}
            onDone={() => setStep("today")}
          />
        ) : null}
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
