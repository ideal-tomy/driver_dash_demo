import { useEffect, useRef, useState } from "react";
import {
  CAP1,
  CAP3,
  CAP4,
  NEXT1,
  NEXT3,
  NEXT4,
  mountPart1Engine,
  mountPart4Engine,
  type Part1Engine,
  type Part4Engine,
} from "../../story/engine";

type Props = {
  mode: "part1" | "part3" | "part4";
  onPart1Done?: () => void;
  onPart3Done?: () => void;
  onPart4Done?: () => void;
  onBackFromPart1?: () => void;
  onBackFromPart3?: () => void;
  onBackFromPart4?: () => void;
};

function useCapFlash(title: string) {
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 420);
    return () => clearTimeout(t);
  }, [title]);
  return flash;
}

export function StoryStage({
  mode,
  onPart1Done,
  onPart3Done,
  onPart4Done,
  onBackFromPart1,
  onBackFromPart3,
  onBackFromPart4,
}: Props) {
  const figRef = useRef<SVGSVGElement>(null);
  const fig4Ref = useRef<SVGSVGElement>(null);
  const eng1 = useRef<Part1Engine | null>(null);
  const eng4 = useRef<Part4Engine | null>(null);
  const [cur, setCur] = useState(1);
  const [c3, setC3] = useState(1);
  const [c4, setC4] = useState(1);
  const [capT, setCapT] = useState("");
  const [capS, setCapS] = useState("");
  const flash = useCapFlash(capT);

  useEffect(() => {
    if (mode === "part4") {
      if (!fig4Ref.current) return;
      eng4.current = mountPart4Engine(fig4Ref.current);
      eng4.current.apply(1);
      setC4(1);
      setCapT(CAP4[0][0]);
      setCapS(CAP4[0][1]);
      return () => {
        eng4.current?.destroy();
        eng4.current = null;
      };
    }
    if (!figRef.current) return;
    eng1.current = mountPart1Engine(figRef.current);
    if (mode === "part1") {
      setCur(1);
      setCapT(CAP1[0][0]);
      setCapS(CAP1[0][1]);
      const t = window.setTimeout(() => {
        eng1.current?.apply(1, true);
      }, 350);
      return () => {
        clearTimeout(t);
        eng1.current?.destroy();
        eng1.current = null;
      };
    }
    setC3(1);
    setCapT(CAP3[0][0]);
    setCapS(CAP3[0][1]);
    eng1.current.apply3(1, false);
    return () => {
      eng1.current?.destroy();
      eng1.current = null;
    };
  }, [mode]);

  if (mode === "part4") {
    return (
      <div>
        <div className="step">{c4} / 3</div>
        <div className={`cap cap-above${flash ? " is-flash" : ""}`}>
          <b>{capT}</b>
          <p>{capS}</p>
        </div>
        <div className="stage">
          <svg
            ref={fig4Ref}
            viewBox="0 0 370 392"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="担当者の間の確認の数を示す図"
          />
        </div>
        <div className="nav">
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              if (c4 <= 1) {
                onBackFromPart4?.();
                return;
              }
              const n = c4 - 1;
              setC4(n);
              eng4.current?.apply(n);
              setCapT(CAP4[n - 1][0]);
              setCapS(CAP4[n - 1][1]);
            }}
          >
            戻る
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (c4 < 3) {
                const n = c4 + 1;
                setC4(n);
                eng4.current?.apply(n);
                setCapT(CAP4[n - 1][0]);
                setCapS(CAP4[n - 1][1]);
                return;
              }
              setC4(1);
              eng4.current?.apply(1);
              setCapT(CAP4[0][0]);
              setCapS(CAP4[0][1]);
              onPart4Done?.();
            }}
          >
            {NEXT4[c4 - 1]}
          </button>
        </div>
        <div className="note">
          人が増えると、隣に聞く回数が増えます。同じ表を見ると、聞く先はその表だけになります。数字は説明用です。
        </div>
      </div>
    );
  }

  if (mode === "part3") {
    return (
      <div>
        <div className="step">{c3} / 3</div>
        <div className={`cap cap-above${flash ? " is-flash" : ""}`}>
          <b>{capT}</b>
          <p>{capS}</p>
        </div>
        <div className="stage">
          <svg
            ref={figRef}
            viewBox="0 0 370 408"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="配車の流れを示す図"
          />
        </div>
        <div className="nav">
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              if (c3 <= 1) {
                onBackFromPart3?.();
                return;
              }
              const n = c3 - 1;
              setC3(n);
              eng1.current?.apply3(n, false);
              setCapT(CAP3[n - 1][0]);
              setCapS(CAP3[n - 1][1]);
            }}
          >
            戻る
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (c3 < 3) {
                const n = c3 + 1;
                setC3(n);
                eng1.current?.apply3(n, true);
                setCapT(CAP3[n - 1][0]);
                setCapS(CAP3[n - 1][1]);
                return;
              }
              setC3(1);
              eng1.current?.apply3(1, false);
              setCapT(CAP3[0][0]);
              setCapS(CAP3[0][1]);
              onPart3Done?.();
            }}
          >
            {NEXT3[c3 - 1]}
          </button>
        </div>
        <div className="note">
          担当の分け方は変えていません。変えたのは、全員が同じ表を見ていることだけです。
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="step">{cur} / 8</div>
      <div className={`cap cap-above${flash ? " is-flash" : ""}`}>
        <b>{capT}</b>
        <p>{capS}</p>
      </div>
      <div className="stage">
        <svg
          ref={figRef}
          viewBox="0 0 370 408"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="配車の流れを示す図"
        />
      </div>
      <div className="nav">
        <button
          type="button"
          className="btn ghost"
          onClick={() => {
            if (cur <= 1) {
              onBackFromPart1?.();
              return;
            }
            const n = cur - 1;
            setCur(n);
            eng1.current?.apply(n, false);
            setCapT(CAP1[n - 1][0]);
            setCapS(CAP1[n - 1][1]);
          }}
        >
          戻る
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            if (cur < 8) {
              const n = cur + 1;
              setCur(n);
              eng1.current?.apply(n, true);
              setCapT(CAP1[n - 1][0]);
              setCapS(CAP1[n - 1][1]);
              return;
            }
            setCur(1);
            eng1.current?.apply(1, false);
            setCapT(CAP1[0][0]);
            setCapS(CAP1[0][1]);
            onPart1Done?.();
          }}
        >
          {NEXT1[cur - 1]}
        </button>
      </div>
      <div className="note">
        この図の人数と件数は仮です。担当5人、1日20件として描いています。
      </div>
    </div>
  );
}
