import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./template/Login";
import Main from "./template/Main";
import Menu from "./template/menu/Menu";
import Menu1 from "./template/menu/Menu1";
import Menu2 from "./template/menu/Menu2";
import Menu3 from "./template/menu/Menu3";
import Menu4 from "./template/menu/Menu4";
import Menu5 from "./template/menu/Menu5";
import Menu6 from "./template/menu/Menu6";
import Menu7 from "./template/menu/Menu7";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/main" element={<Main />} exact />
                <Route path="/menu" element={<Menu />} exact />
                <Route path="/menu1" element={<Menu1 />} exact />
                <Route path="/menu2" element={<Menu2 />} exact />
                <Route path="/menu3" element={<Menu3 />} exact />
                <Route path="/menu4" element={<Menu4 />} exact />
                <Route path="/menu5" element={<Menu5 />} exact />
                <Route path="/menu6" element={<Menu6 />} exact />
                <Route path="/menu7" element={<Menu7 />} exact />
            </Routes>
        </>
    );
}

export default App;
