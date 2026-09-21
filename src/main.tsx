import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Admin from "./Admin";

const path = window.location.pathname;
const isAdmin = path === "/admin" || path === "/admin/" || path.startsWith("/admin/");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isAdmin ? <Admin /> : <App />}
  </StrictMode>
);
