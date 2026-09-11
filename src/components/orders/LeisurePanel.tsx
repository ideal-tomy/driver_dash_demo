import { canSuggestStaff } from "../../domain/findSimilarCases";
import { useDemo } from "../../state/DemoStore";

export function LeisurePanel() {
  const { rules, leisureCases } = useDemo();
  const job = rules.leisureJob;
  const staffOk = canSuggestStaff(job.staffRecordCount, rules);

  return (
    <div className="scr">
      <div className="top">
        <span>{job.title}</span>
        <span>{job.window}</span>
      </div>
      <table className="kv">
        <tbody>
          <tr>
            <th>現場</th>
            <td>{job.site}</td>
          </tr>
          <tr>
            <th>車両</th>
            <td>
              大型ウィング {job.vehiclesNeeded}台{" "}
              <span className="tg">候補 {job.vehicleCandidates.length}件</span>
              <br />
              {job.vehicleCandidates.join("／")}　どちらも当日は空いています
            </td>
          </tr>
          <tr>
            <th>人員</th>
            <td>
              {job.staffNeeded}{" "}
              <span className={`tg${staffOk ? "" : " w"}`}>
                {staffOk ? "候補あり" : "候補なし"}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      {!staffOk ? (
        <div className="warn">
          <b>人員の候補を出せません</b>
          この種類の案件は、記録が{job.staffRecordCount}
          件しかありません。候補を出せる件数に達していません。
        </div>
      ) : null}
      <div className="hdr">過去にこの種類でやったこと</div>
      {leisureCases.map((c) => (
        <div className="row" key={c.id}>
          <div className="rt">
            {c.date}　{c.route.from}　{c.leisure?.machines}台
          </div>
          <div className="sub">
            {c.leisure?.staff} ／ {c.leisure?.hours}時間 ／{" "}
            {c.leisure?.sourcing}
          </div>
        </div>
      ))}
      <details className="intent" style={{ margin: "0 10px 12px" }}>
        <summary>この画面の意図</summary>
        <div className="exp">
          車両は候補を出せますが、人員は出せません。記録が足りないためです。
          <b>できないことは、できないと画面に出します。</b>
        </div>
      </details>
    </div>
  );
}
