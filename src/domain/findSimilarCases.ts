import type { PastCase, RulesSnapshot } from "../knowledge/types";

export type SurchargeHint = {
  ruleId: string;
  title: string;
  body: string;
};

export function findSurchargeHint(
  cases: PastCase[],
  surchargeListed: boolean | null,
): SurchargeHint | null {
  if (surchargeListed !== false) return null;
  const withSurcharge = cases.filter((c) => (c.surcharge ?? 0) > 0);
  if (withSurcharge.length * 2 < cases.length) return null;
  const min = Math.min(...withSurcharge.map((c) => c.surcharge ?? 0));
  const max = Math.max(...withSurcharge.map((c) => c.surcharge ?? 0));
  return {
    ruleId: "SURCHARGE-FORK",
    title: "付帯作業料の記載がありません",
    body: `積み地と卸し地の両方に、ドライバーのフォーク作業が入っています。条件の近い${cases.length}件のうち${withSurcharge.length}件では、付帯作業料が${min.toLocaleString("ja-JP")}円から${max.toLocaleString("ja-JP")}円ついていました。`,
  };
}

/** 最低件数ちょうどでは候補にしない（画面4の「3件しかない」に合わせる） */
export function canSuggestStaff(
  recordCount: number,
  rules: RulesSnapshot,
): boolean {
  return recordCount > rules.staffCandidateMinCases;
}
