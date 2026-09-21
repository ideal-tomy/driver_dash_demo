const SVGNS = "http://www.w3.org/2000/svg";

const LT = 28;
export const FIG1_VIEWBOX = "0 0 370 332";
const LH = 50;
const LP = 58;
const TX0 = 64;
const TX1 = 358;
const QX = 68;
const QG = 13;
const TRUCK_HOME = 142;
const TRUCK_FAR = 296;
const ARRIVE = 332;
const LANES = ["北関東", "信越", "東北", "南関東", "東海"];
const QUEUE = [4, 4, 4, 5, 3];
export const CAP1: [string, string][] = [
  [
    "配送依頼は、Web・FAX・電話などから入ります。",
    "受付方法が違うため、[[依頼の残り方や確認する場所]]もそれぞれです。",
  ],
  [
    "受け付けた依頼は、それぞれの担当者が管理します。",
    "どの担当者がどの依頼を持っているのか、[[ほかの担当者からは分かりにくい]]状態です。",
  ],
  [
    "担当者は、自分が管理している依頼をもとに車両を手配します。",
    "荷物を積み、配送先まで運びます。",
  ],
  [
    "配送先で荷物を降ろすと、[[車両は空車になります]]。",
    "帰りに載せられる荷物がなければ、[[そのまま営業所へ戻ります]]。",
  ],
  [
    "その近くでは、[[別の担当者]]が配送依頼を受けています。",
    "空車になった車両で運べそうな荷物ですが、[[その情報は別の担当者が管理しています]]。",
  ],
  [
    "車両と荷物を組み合わせられる可能性があっても、[[担当者が違うと気づけません]]。",
    "それぞれが自分の依頼だけを見ているため、[[ほかの担当者の荷物や空車の状況が分かりません]]。",
  ],
  [
    "車両は、荷物を載せずに[[営業所へ戻ります]]。",
    "一方、別の担当者が受けた荷物は、[[まだ配送されないまま残ります]]。",
  ],
  [
    "同じようなことが、ほかの担当者の間でも起こります。",
    "誰かが悪いわけではありません。担当者ごとに情報が分かれているため、[[組み合わせられる車両と荷物を見つけにくい]]状態です。",
  ],
];

/** いまの段から次へ進むときのボタン文言（最終段は出口） */
export const NEXT1 = [
  "担当者に分かれる",
  "配送する",
  "荷物を降ろす",
  "別の依頼が入る",
  "情報が共有されない",
  "空車で戻る",
  "ほかでも起きる",
  "最初に戻る",
];

export const NEXT3 = ["荷物を降ろす", "隣の荷物が載る", "最初に戻る"];

export const NEXT4 = ["人が増えると", "同じ表を見る", "最初に戻る"];

export const CAP3: [string, string][] = [
  [
    "受け付けた依頼を、[[一つの一覧で確認]]します。",
    "担当者の分け方はそのままです。[[ほかの担当者の依頼]]も必要なときに確認できるようになります。",
  ],
  [
    "荷物を降ろして[[空車になった車両]]を確認します。",
    "ここまでは、これまでの流れと変わりません。",
  ],
  [
    "帰り便に載せられそうな荷物があれば、[[候補として表示]]します。",
    "候補を確認し、[[実際に載せるかどうかは担当者が判断]]します。",
  ],
];

export const CAP4: [string, string][] = [
  [
    "担当者が少ないうちは、直接確認しても対応できます。",
    "ほかの担当者が持っている依頼を知りたいときは、[[電話や声かけで確認]]します。",
  ],
  [
    "担当者が増えると、[[確認する相手と回数]]も増えていきます。",
    "配送件数が増えるほど、[[情報確認のやり取り]]も増えていきます。",
  ],
  [
    "[[一つの一覧を共有]]すれば、自分で必要な情報を確認できます。",
    "担当者が増えても、[[情報を確認するためだけの電話や声かけを減らせます]]。",
  ],
];

function cy(i: number) {
  return LT + i * LP + LH / 2;
}

function el(n: string, a: Record<string, string | number>) {
  const e = document.createElementNS(SVGNS, n);
  for (const k in a) e.setAttribute(k, String(a[k]));
  return e;
}

function mv(e: SVGElement, dx: number, dy: number) {
  e.style.transform = `translate(${dx}px,${dy}px)`;
}

function show(e: SVGElement, v: boolean) {
  e.style.opacity = v ? "1" : "0";
}

export type Part1Engine = {
  apply: (s: number, animate: boolean) => void;
  apply3: (s: number, animate: boolean) => void;
  destroy: () => void;
};

export function mountPart1Engine(fig: SVGSVGElement): Part1Engine {
  while (fig.firstChild) fig.removeChild(fig.firstChild);
  const timers: number[] = [];
  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers.length = 0;
  };

  for (let i = 0; i < 5; i++) {
    fig.appendChild(
      el("rect", {
        x: TX0,
        y: LT + i * LP,
        width: TX1 - TX0,
        height: LH,
        rx: 3,
        fill: "#EFEFEA",
      }),
    );
    const t = el("text", {
      x: 58,
      y: cy(i) + 4,
      "text-anchor": "end",
      "font-size": "10.5",
      fill: "#6B6B66",
    });
    t.textContent = LANES[i];
    t.setAttribute("class", "fd");
    (t as SVGElement).style.opacity = "0";
    t.dataset.from = "1";
    fig.appendChild(t);
  }

  const divs: SVGLineElement[] = [];
  for (let i = 0; i < 4; i++) {
    const d = el("line", {
      x1: 44,
      y1: LT + (i + 1) * LP - 4,
      x2: TX1,
      y2: LT + (i + 1) * LP - 4,
      stroke: "#DCDCD6",
      "stroke-width": 1,
    }) as SVGLineElement;
    d.setAttribute("class", "dv fd");
    d.style.opacity = "0";
    d.dataset.from = "1";
    fig.appendChild(d);
    divs.push(d);
  }

  const cargo: SVGRectElement[][] = [];
  for (let i = 0; i < 5; i++) {
    cargo[i] = [];
    for (let k = 0; k < QUEUE[i]; k++) {
      const r = el("rect", {
        x: QX + k * QG,
        y: cy(i) - 5,
        width: 10,
        height: 10,
        rx: 1.5,
        fill: "#1F1F1D",
      }) as SVGRectElement;
      r.setAttribute("class", "mv");
      r.style.opacity = "0";
      fig.appendChild(r);
      cargo[i].push(r);
    }
  }

  const trucks: SVGGElement[] = [];
  for (let i = 0; i < 5; i++) {
    const g = el("g", {}) as SVGGElement;
    g.setAttribute("class", "mv fd");
    g.style.opacity = "0";
    g.dataset.from = "2";
    g.appendChild(
      el("rect", {
        x: TRUCK_HOME,
        y: cy(i) - 11,
        width: 30,
        height: 22,
        rx: 2,
        fill: "none",
        stroke: "#1F1F1D",
        "stroke-width": 1.6,
      }),
    );
    g.appendChild(
      el("circle", {
        cx: TRUCK_HOME + 8,
        cy: cy(i) + 13,
        r: 3,
        fill: "#1F1F1D",
      }),
    );
    g.appendChild(
      el("circle", {
        cx: TRUCK_HOME + 23,
        cy: cy(i) + 13,
        r: 3,
        fill: "#1F1F1D",
      }),
    );
    fig.appendChild(g);
    trucks.push(g);
  }

  const back: SVGRectElement[] = [];
  [2, 4].forEach((i) => {
    const r = el("rect", {
      x: TRUCK_FAR + 10,
      y: cy(i) - 5,
      width: 10,
      height: 10,
      rx: 1.5,
      fill: "#D9480F",
    }) as SVGRectElement;
    r.setAttribute("class", "mv");
    r.style.opacity = "0";
    fig.appendChild(r);
    back.push(r);
  });

  const C1 = () => cargo[1][QUEUE[1] - 1];
  const inTruck = (lane: number) =>
    TRUCK_HOME + 10 - (QX + (QUEUE[lane] - 1) * QG);

  function apply(s: number, animate: boolean) {
    clearTimers();
    fig.querySelectorAll<SVGElement>("[data-from]").forEach((e) => {
      show(e, s >= Number(e.dataset.from));
    });

    for (let i = 0; i < 5; i++) {
      for (let k = 0; k < QUEUE[i]; k++) {
        const isDrop = k === 0 && (i === 0 || i === 2 || i === 3);
        show(cargo[i][k], s >= 2 || (s >= 1 && isDrop));
      }
    }

    [0, 2, 3].forEach((lane) => {
      mv(cargo[lane][0], 0, 0);
    });

    for (let i = 0; i < 5; i++) mv(trucks[i], 0, 0);
    [0, 2, 3, 4].forEach((i) => {
      mv(cargo[i][QUEUE[i] - 1], inTruck(i), 0);
    });
    mv(C1(), 0, 0);

    if (s >= 3 && s <= 6) mv(trucks[1], TRUCK_FAR - TRUCK_HOME, 0);
    if (s === 3) mv(C1(), inTruck(1) + (TRUCK_FAR - TRUCK_HOME), 0);
    if (s >= 4) mv(C1(), ARRIVE - (QX + (QUEUE[1] - 1) * QG), 0);

    show(back[0], s >= 5);
    show(back[1], s >= 8);
    mv(back[0], 0, s >= 6 ? -20 : 0);
    mv(back[1], 0, s >= 8 ? -20 : 0);
    if (s === 8 && animate) {
      show(back[1], false);
      mv(back[1], 0, 0);
      timers.push(
        window.setTimeout(() => {
          show(back[1], true);
        }, 900),
      );
      timers.push(
        window.setTimeout(() => {
          mv(back[1], 0, -20);
        }, 1600),
      );
    }

    divs.forEach((d, i) => {
      const strong = (s >= 6 && i === 1) || (s >= 8 && i === 3);
      d.setAttribute("stroke", strong ? "#1F1F1D" : "#DCDCD6");
      d.setAttribute("stroke-width", strong ? "2.4" : "1");
    });
  }

  function apply3(s: number, animate: boolean) {
    clearTimers();
    fig.querySelectorAll<SVGElement>("[data-from]").forEach((e) => {
      show(e, true);
    });
    for (let i = 0; i < 5; i++) {
      for (let k = 0; k < QUEUE[i]; k++) show(cargo[i][k], true);
    }
    for (let i = 0; i < 5; i++) {
      mv(trucks[i], 0, 0);
      mv(cargo[i][QUEUE[i] - 1], inTruck(i), 0);
    }
    for (let i = 0; i < 5; i++) {
      for (let k = 0; k < QUEUE[i] - 1; k++) mv(cargo[i][k], 0, 0);
    }
    divs.forEach((d) => {
      d.setAttribute("stroke", "#DCDCD6");
      d.setAttribute("stroke-width", "1");
    });
    show(back[1], false);
    show(back[0], s >= 1);
    mv(back[0], 0, 0);

    if (s === 1) mv(C1(), 0, 0);
    if (s >= 2) {
      mv(trucks[1], TRUCK_FAR - TRUCK_HOME, 0);
      mv(C1(), ARRIVE - (QX + (QUEUE[1] - 1) * QG), 0);
      if (s === 2 && animate) {
        mv(C1(), inTruck(1) + (TRUCK_FAR - TRUCK_HOME), 0);
        timers.push(
          window.setTimeout(() => {
            mv(C1(), ARRIVE - (QX + (QUEUE[1] - 1) * QG), 0);
          }, 950),
        );
      }
    }
    if (s >= 3) {
      mv(back[0], 0, cy(1) - cy(2));
      if (animate) {
        timers.push(
          window.setTimeout(() => {
            mv(trucks[1], 0, 0);
            mv(back[0], TRUCK_HOME - TRUCK_FAR, cy(1) - cy(2));
          }, 1100),
        );
      } else {
        mv(trucks[1], 0, 0);
        mv(back[0], TRUCK_HOME - TRUCK_FAR, cy(1) - cy(2));
      }
    }
  }

  return {
    apply,
    apply3,
    destroy: () => {
      clearTimers();
      while (fig.firstChild) fig.removeChild(fig.firstChild);
    },
  };
}

export type Part4Engine = {
  apply: (s: number) => void;
  destroy: () => void;
};

export function mountPart4Engine(f4: SVGSVGElement): Part4Engine {
  while (f4.firstChild) f4.removeChild(f4.firstChild);
  const CX = 185;
  const CY = 188;
  const R = 134;
  const N = 20;
  const FIVE = [0, 4, 8, 12, 16];
  const pt = (i: number) => {
    const a = ((-90 + i * (360 / N)) * Math.PI) / 180;
    return [CX + R * Math.cos(a), CY + R * Math.sin(a)] as const;
  };
  const e4 = (n: string, a: Record<string, string | number>) => {
    const e = el(n, a);
    f4.appendChild(e);
    return e;
  };

  const linesAll: SVGElement[] = [];
  const lines5: SVGElement[] = [];
  const hub: SVGElement[] = [];
  const dots: { el: SVGElement; five: boolean }[] = [];

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const p = pt(i);
      const q = pt(j);
      const isFive = FIVE.includes(i) && FIVE.includes(j);
      const L = e4("line", {
        x1: p[0],
        y1: p[1],
        x2: q[0],
        y2: q[1],
        stroke: "#1F1F1D",
        "stroke-width": isFive ? 1 : 0.6,
        opacity: 0,
      });
      L.setAttribute("class", "fd");
      if (isFive) lines5.push(L);
      else linesAll.push(L);
    }
  }

  const board = e4("g", {}) as SVGGElement;
  board.setAttribute("class", "fd");
  board.style.opacity = "0";
  board.appendChild(
    el("rect", {
      x: CX - 42,
      y: CY - 28,
      width: 84,
      height: 56,
      rx: 4,
      fill: "#FAFAF8",
      stroke: "#1F1F1D",
      "stroke-width": 2,
    }),
  );
  for (let r = 0; r < 4; r++) {
    board.appendChild(
      el("line", {
        x1: CX - 32,
        y1: CY - 14 + r * 10,
        x2: CX + 32,
        y2: CY - 14 + r * 10,
        stroke: "#1F1F1D",
        "stroke-width": 1.4,
      }),
    );
  }
  for (let i = 0; i < N; i++) {
    const p = pt(i);
    const L = e4("line", {
      x1: p[0],
      y1: p[1],
      x2: CX,
      y2: CY,
      stroke: "#1F1F1D",
      "stroke-width": 1,
      opacity: 0,
    });
    L.setAttribute("class", "fd");
    hub.push(L);
  }
  f4.appendChild(board);
  for (let i = 0; i < N; i++) {
    const p = pt(i);
    const five = FIVE.includes(i);
    const c = e4("circle", {
      cx: p[0],
      cy: p[1],
      r: five ? 7 : 6,
      fill: "#1F1F1D",
      opacity: 0,
    });
    c.setAttribute("class", "fd");
    dots.push({ el: c, five });
  }

  return {
    apply(s: number) {
      dots.forEach((d) => {
        d.el.style.opacity = s >= 2 || d.five ? "1" : "0";
      });
      lines5.forEach((l) => {
        l.style.opacity = s <= 2 ? "1" : "0";
      });
      linesAll.forEach((l) => {
        l.style.opacity = s === 2 ? "0.85" : "0";
      });
      hub.forEach((l) => {
        l.style.opacity = s >= 3 ? "1" : "0";
      });
      board.style.opacity = s >= 3 ? "1" : "0";
    },
    destroy() {
      while (f4.firstChild) f4.removeChild(f4.firstChild);
    },
  };
}
