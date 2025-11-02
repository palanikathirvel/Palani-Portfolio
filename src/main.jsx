import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

// Apply initial theme
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
}
