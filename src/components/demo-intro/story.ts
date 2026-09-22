export type Camera = readonly [number, number, number];
export type DeviceId = "today" | "board" | "alerts";

export const scenes: {
  title: string;
  caption: string;
  duration: number;
  camera: Camera;
  stars: readonly DeviceId[];
}[] = [
  {
    title: "件数を見る",
    caption: "未処理と空で戻る車が、同じ画面に並びます。",
    duration: 5000,
    camera: [158, 176, 1.22],
    stars: ["today"],
  },
  {
    title: "依頼を一覧する",
    caption: "入口の違う依頼も、一つの一覧です。",
    duration: 5000,
    camera: [158, 176, 1.18],
    stars: ["today"],
  },
  {
    title: "空の車を見る",
    caption: "空で戻る車の近くに、帰り荷の候補が出ます。",
    duration: 4500,
    camera: [306, 176, 0.96],
    stars: ["today", "board"],
  },
  {
    title: "載せるかを決める",
    caption: "候補は出します。載せるかは人が決めます。",
    duration: 5500,
    camera: [454, 176, 1.18],
    stars: ["board"],
  },
  {
    title: "確認は残る",
    caption: "載せても、休息の確認は残ります。",
    duration: 5500,
    camera: [604, 176, 0.96],
    stars: ["board", "alerts"],
  },
];

export const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);

export function storyFrame(time: number) {
  let elapsed = ((time % totalDuration) + totalDuration) % totalDuration;
  let index = 0;
  while (index < scenes.length - 1 && elapsed >= scenes[index].duration) {
    elapsed -= scenes[index++].duration;
  }
  const previous = scenes[index === 0 ? 0 : index - 1];
  const next = scenes[index];
  const t = Math.min(1, elapsed / 1200);
  const ease = t * t * (3 - 2 * t);
  const camera = next.camera.map(
    (value, i) => previous.camera[i] + (value - previous.camera[i]) * ease,
  ) as unknown as Camera;
  return { index, elapsed, camera, stars: next.stars, previousStars: previous.stars, ease };
}
