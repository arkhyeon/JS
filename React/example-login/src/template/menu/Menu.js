import React from "react";
import Header from "../Header";

function Menu() {
    return (
        <>
            <Header />
            <div style={{ background: "blue" }}>
                Menu
                <img
                    src="http://192.168.10.26:8080/Trans4.7/image/header/top_icon_off_02.png"
                    alt=""
                />
            </div>
        </>
    );
}

export default Menu;
