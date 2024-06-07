import React from "react";
import ReactDOM from "react-dom/client";
import Home from "@/pages/Home";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>about page</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
