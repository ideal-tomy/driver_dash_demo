import { useDemo } from "../state/DemoStore";
import { DispatchBoard } from "../components/board/DispatchBoard";

type Props = {
  onBack: () => void;
  onDone: () => void;
};

/** 配車盤で帰り荷候補を載せる／載せない */
export function BoardExperience({ onBack, onDone }: Props) {
  const { returnDecision } = useDemo();
  const decided = returnDecision !== "pending";

  return (
    <div className="board-step">
      <DispatchBoard showIntent={false} />
      <div className="nav" style={{ padding: "16px 12px 0" }}>
        <button type="button" className="btn ghost" onClick={onBack}>
          戻る
        </button>
        <button
          type="button"
          className="btn"
          disabled={!decided}
          onClick={onDone}
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
