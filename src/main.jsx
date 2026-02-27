import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import SearchPage from "./Pages/SearchPage/SearchPage.jsx"
import VideoPage from "./Pages/VideoPage/VideoPage.jsx";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./index.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/Search" element={<SearchPage/>} />
      <Route path="/Video" element={<VideoPage />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
