import React from "react";
import styled from "styled-components";

function Main({ getTheme }) {
    const MainDiv = styled.div`
        width: 800px;
        height: 667px;
        margin: 0 auto;
        line-height: 300px;
    `;
    return (
        <MainDiv>
            <button onClick={() => getTheme("dark")}>테마 변경</button>
            <button onClick={() => getTheme("light")}>테마 변경</button>
            <h1>Main</h1>
        </MainDiv>
    );
}

export default Main;
