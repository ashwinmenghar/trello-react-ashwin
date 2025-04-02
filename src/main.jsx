import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter, Route, Routes } from "react-router";
import Board from "./components/board/Board";
import Cards from "./components/Cards/Cards";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/boards" element={<App />} />
          <Route path="/boards/:id" element={<Cards />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
