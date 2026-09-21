import { useDemo, type FlowStep } from "../../state/DemoStore";

type Props = {
  variant?: "pitch" | "delivery";
};

const PITCH_STEPS: { id: FlowStep; label: string }[] = [
  { id: "today", label: "今日" },
  { id: "part1", label: "分かれ方" },
  { id: "board", label: "候補" },
  { id: "today", label: "今日" },
];

const DELIVERY_STEPS = [
  { label: "今日" },
  { label: "候補" },
  { label: "今日" },
];

function pitchIndex(step: FlowStep, decided: boolean): number {
  if (step === "today") return decided ? 3 : 0;
  if (step === "part1") return 1;
  if (step === "board") return 2;
  if (step === "part3" || step === "part4") return 3;
  return 0;
}

function deliveryIndex(step: FlowStep, decided: boolean): number {
  if (step === "board") return 1;
  if (step === "today") return decided ? 2 : 0;
  return 0;
}

export function ProgressBar({ variant = "pitch" }: Props) {
  const { step, returnDecision } = useDemo();
  const decided = returnDecision !== "pending";
  const steps = variant === "delivery" ? DELIVERY_STEPS : PITCH_STEPS;
  const on =
    variant === "delivery"
      ? deliveryIndex(step, decided)
      : pitchIndex(step, decided);

  return (
    <ol className="progress" aria-label="流れ">
      {steps.map((s, i) => (
        <li key={`${s.label}-${i}`} className={i === on ? "is-on" : undefined}>
          {i > 0 ? <span className="progress-sep" aria-hidden /> : null}
          <span className="progress-lab">{s.label}</span>
        </li>
      ))}
    </ol>
  );
}
