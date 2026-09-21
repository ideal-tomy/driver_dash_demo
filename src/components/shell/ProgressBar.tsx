import { useDemo, type FlowStep } from "../../state/DemoStore";

const STEPS = [{ label: "今日" }, { label: "候補" }, { label: "今日" }];

function stepIndex(step: FlowStep, decided: boolean): number {
  if (step === "board") return 1;
  if (step === "today") return decided ? 2 : 0;
  return 0;
}

export function ProgressBar() {
  const { step, returnDecision } = useDemo();
  const decided = returnDecision !== "pending";
  const on = stepIndex(step, decided);

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
