import { Link } from "react-router-dom";
import { TodayConsole } from "./TodayConsole";
import { DemoProvider } from "../state/DemoStore";

export function BoardApp() {
  return (
    <DemoProvider>
      <div className="wrap wide" style={{ paddingTop: 12 }}>
        <TodayConsole inFlow={false} />
        <div className="foot">
          <Link to="/" style={{ color: "#6B6B66" }}>
            商談フローに戻る
          </Link>
        </div>
      </div>
    </DemoProvider>
  );
}
