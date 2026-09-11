import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BoardApp } from "./app/BoardApp";
import { DemoFlow } from "./app/DemoFlow";
import { DemoProvider } from "./state/DemoStore";

function DemoShell() {
  return (
    <DemoProvider>
      <DemoFlow />
    </DemoProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DemoShell />} />
        <Route path="/board" element={<BoardApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
