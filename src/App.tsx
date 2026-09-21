import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BoardApp } from "./app/BoardApp";
import { LandingPage } from "./app/LandingPage";

export default function App() {
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
