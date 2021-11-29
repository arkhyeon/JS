import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/User/About";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Optional from "./pages/Optional";
import User from "./pages/User/User";
import UserMain from "./pages/User/UserMain";

function App() {
    return (
        <>
            <Routes>
                {/* exact는 전 버전에서 화면에 모든 라우트를 뿌려줬기 때문에
                exact를 이용해 원하는 것만 뿌려주게 하였다.
                이제는 exact가 기본이라 사용하지 않아도 된다.
                <Route path="/" element={<Home />} exact={true} /> */}
                <Route path="/" element={<Home />}>
                    <Route path="/posts/:id" element={<Post />} />
                    <Route path="/users/:username/*" element={<User />}>
                        <Route path="" element={<UserMain />} />
                        <Route path="about" element={<About />} />
                    </Route>
                    <Route path="/optional/:value" element={<Optional />} />
                    <Route path="/optional" element={<Optional />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
