import { useCallback, useEffect, useRef, useState } from "react";
import {
  CAP1,
  CAP3,
  CAP4,
  FIG1_VIEWBOX,
  NEXT1,
  NEXT3,
  NEXT4,
  mountPart1Engine,
  mountPart4Engine,
  type Part1Engine,
  type Part4Engine,
} from "../../story/engine";

const AUTO_MS = 5000;

type Props = {
  mode: "part1" | "part3" | "part4";
  onPart1Done?: () => void;
  onPart3Done?: () => void;
  onPart4Done?: () => void;
  onBackFromPart1?: () => void;
  onBackFromPart3?: () => void;
  onBackFromPart4?: () => void;
};

function CapText({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const hit = /^\[\[(.+)\]\]$/.exec(part);
        if (hit) {
          return (
            <strong key={i} className="cap-em">
              {hit[1]}
            </strong>
          );
        }
        return part ? <span key={i}>{part}</span> : null;
      })}
    </>
  );
}

function useCapFlash(title: string) {
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 420);
    return () => clearTimeout(t);
  }, [title]);
  return flash;
}

function useAutoPlay() {
  const timerRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(
    (advance: () => boolean) => {
      stop();
      timerRef.current = window.setInterval(() => {
        if (advance()) stop();
      }, AUTO_MS);
    },
    [stop],
  );

  useEffect(() => stop, [stop]);

  return { start, stop };
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
  const { start: startAuto, stop: stopAuto } = useAutoPlay();

  useEffect(() => {
    stopAuto();
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
  }, [mode, stopAuto]);

  const goPart1 = (n: number, animate: boolean) => {
    setCur(n);
    eng1.current?.apply(n, animate);
    setCapT(CAP1[n - 1][0]);
    setCapS(CAP1[n - 1][1]);
  };

  const goPart3 = (n: number, animate: boolean) => {
    setC3(n);
    eng1.current?.apply3(n, animate);
    setCapT(CAP3[n - 1][0]);
    setCapS(CAP3[n - 1][1]);
  };

  const goPart4 = (n: number) => {
    setC4(n);
    eng4.current?.apply(n);
    setCapT(CAP4[n - 1][0]);
    setCapS(CAP4[n - 1][1]);
  };

  const startPart1Auto = (fromStep: number) => {
    let step = fromStep;
    startAuto(() => {
      if (step < 8) {
        step += 1;
        goPart1(step, true);
        return false;
      }
      goPart1(1, false);
      return true;
    });
  };

  const startPart3Auto = (fromStep: number) => {
    let step = fromStep;
    startAuto(() => {
      if (step < 3) {
        step += 1;
        goPart3(step, true);
        return false;
      }
      goPart3(1, false);
      return true;
    });
  };

  const startPart4Auto = (fromStep: number) => {
    let step = fromStep;
    startAuto(() => {
      if (step < 3) {
        step += 1;
        goPart4(step);
        return false;
      }
      goPart4(1);
      return true;
    });
  };

  if (mode === "part4") {
    return (
      <div>
        <div className="step">{c4} / 3</div>
        <div className={`cap cap-above${flash ? " is-flash" : ""}`}>
          <b>
            <CapText text={capT} />
          </b>
          <p>
            <CapText text={capS} />
          </p>
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
              stopAuto();
              if (c4 <= 1) {
                onBackFromPart4?.();
                return;
              }
              goPart4(c4 - 1);
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
                goPart4(n);
                if (c4 === 1) {
                  startPart4Auto(n);
                  return;
                }
                stopAuto();
                return;
              }
              stopAuto();
              goPart4(1);
              onPart4Done?.();
            }}
          >
            {NEXT4[c4 - 1]}
          </button>
        </div>
      </div>
    );
  }

  if (mode === "part3") {
    return (
      <div>
        <div className="step">{c3} / 3</div>
        <div className={`cap cap-above${flash ? " is-flash" : ""}`}>
          <b>
            <CapText text={capT} />
          </b>
          <p>
            <CapText text={capS} />
          </p>
        </div>
        <div className="stage">
          <svg
            ref={figRef}
            viewBox={FIG1_VIEWBOX}
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
              stopAuto();
              if (c3 <= 1) {
                onBackFromPart3?.();
                return;
              }
              goPart3(c3 - 1, false);
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
                goPart3(n, true);
                if (c3 === 1) {
                  startPart3Auto(n);
                  return;
                }
                stopAuto();
                return;
              }
              stopAuto();
              goPart3(1, false);
              onPart3Done?.();
            }}
          >
            {NEXT3[c3 - 1]}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="step">{cur} / 8</div>
      <div className={`cap cap-above${flash ? " is-flash" : ""}`}>
        <b>
          <CapText text={capT} />
        </b>
        <p>
          <CapText text={capS} />
        </p>
      </div>
      <div className="stage">
        <svg
          ref={figRef}
          viewBox={FIG1_VIEWBOX}
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
            stopAuto();
            if (cur <= 1) {
              onBackFromPart1?.();
              return;
            }
            goPart1(cur - 1, false);
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
              goPart1(n, true);
              if (cur === 1) {
                startPart1Auto(n);
                return;
              }
              stopAuto();
              return;
            }
            stopAuto();
            goPart1(1, false);
            onPart1Done?.();
          }}
        >
          {NEXT1[cur - 1]}
        </button>
      </div>
    </div>
  );
}
