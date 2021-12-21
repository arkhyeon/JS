import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./template/Layout";
import Main from "./page/Main";
import Menu from "./page/Menu";
import Menu2 from "./page/Menu2";
import Menu3 from "./page/Menu3";
import Menu4 from "./page/Menu4";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/a" element={<Menu2 />}>
                        <Route path="/a/1" element={<Menu2 />} />
                        <Route path="/a/2" element={<Menu2 />}>
                            <Route path="/a/2:id" element={<Menu2 />} />
                        </Route>
                        <Route path="/a/3" element={<Menu2 />} />
                        <Route path="/a/4" element={<Menu2 />} />
                    </Route>
                    <Route path="/b" element={<Menu3 />}>
                        <Route path="/b/1" element={<Menu3 />} />
                        <Route path="/b/2" element={<Menu3 />} />
                        <Route path="/b/3" element={<Menu3 />}>
                            <Route path="/b/3/1" element={<Menu3 />} />
                            <Route path="/b/3/2" element={<Menu3 />}>
                                <Route path="/b/3/2/1" element={<Menu3 />} />
                                <Route path="/b/3/2/2" element={<Menu3 />} />
                                <Route path="/b/3/2/3" element={<Menu3 />}>
                                    <Route path="/b/3/2/3/1" element={<Menu3 />} />
                                </Route>
                            </Route>
                            <Route path="/b/3/3" element={<Menu3 />} />
                        </Route>
                        <Route path="/b/4" element={<Menu3 />} />
                    </Route>
                    <Route path="/c" element={<Menu4 />} />
                    <Route path="/d" element={<Menu4 />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
