import "./App.scss";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./template/Layout";
import Main from "./page/Main";
import Menu from "./page/Menu";

function App() {
    const [theme, setTheme] = useState("light");

    const getTheme = (text) => {
        setTheme(text);
    };

    return (
        <div className={`App ${theme}`}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Main getTheme={getTheme} />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu/:id" element={<Menu />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
