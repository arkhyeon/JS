import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./template/Login";
import Main from "./template/Main";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/main" element={<Main />} exact />
            </Routes>
        </>
    );
}

export default App;
