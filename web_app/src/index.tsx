import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ double check this is the correct path

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);