import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { logger } from "./config/logConfig";

logger.info("Server listening on port 3000");
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
