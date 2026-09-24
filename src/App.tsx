import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BoardApp } from "./app/BoardApp";
import { LandingPage } from "./app/LandingPage";
import { DemoIntro } from "./components/demo-intro/DemoIntro";

function isEmbedIntro() {
  return new URLSearchParams(window.location.search).get("embed") === "intro";
}

function isStageView() {
  return new URLSearchParams(window.location.search).get("view") === "stage";
}

export default function App() {
  if (isEmbedIntro()) {
    return (
      <main className={`ki-embed-intro${isStageView() ? " ki-embed-stage" : ""}`}>
        <DemoIntro />
      </main>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/board" replace />} />
        <Route path="/board" element={<BoardApp />} />
        <Route path="/lp" element={<LandingPage />} />
        <Route path="/story/*" element={<Navigate to="/lp" replace />} />
        <Route path="*" element={<Navigate to="/board" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
