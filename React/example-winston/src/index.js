import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { logger } from "./config";

logger.info("d");

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
