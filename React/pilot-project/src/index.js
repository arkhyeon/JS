import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider
                theme={{
                    menuColor: "#0b2444",
                    menuFontColor: "#fafafa",
                    defaultColor: "#0b2444",
                }}
            >
                <CookiesProvider>
                    <App />
                </CookiesProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
