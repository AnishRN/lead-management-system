import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";

import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(

    <StrictMode>

        <AuthProvider>

            <App />

        </AuthProvider>

    </StrictMode>

);