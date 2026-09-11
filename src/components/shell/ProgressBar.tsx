import { useDemo, type FlowStep } from "../../state/DemoStore";

const STEPS: { id: FlowStep; label: string }[] = [
  { id: "today", label: "今日" },
  { id: "part1", label: "分かれ方" },
  { id: "board", label: "候補" },
  { id: "today", label: "今日" },
];

/** 進捗表示用。2つ目の「今日」は決定後の戻りを指す */
function activeIndex(step: FlowStep, decided: boolean): number {
  if (step === "today") return decided ? 3 : 0;
  if (step === "part1") return 1;
  if (step === "board") return 2;
  if (step === "part3" || step === "part4") return 3;
  return 0;
}

export function ProgressBar() {
  const { step, returnDecision } = useDemo();
  const decided = returnDecision !== "pending";
  const on = activeIndex(step, decided);

  return (
    <ol className="progress" aria-label="流れ">
      {STEPS.map((s, i) => (
        <li key={`${s.label}-${i}`} className={i === on ? "is-on" : undefined}>
          {i > 0 ? <span className="progress-sep" aria-hidden /> : null}
          <span className="progress-lab">{s.label}</span>
        </li>
      ))}
    </ol>
  );
}
