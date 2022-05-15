import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppWFakeData from "./AppWFakeData";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* if cors-anywhere api limits requests, use app with fake data. */}
        <Route path="app-w-fake-data" element={<AppWFakeData />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
