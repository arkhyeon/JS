import React from "react";
import styled from "styled-components";
// import Draggable from "react-draggable";

const MainDiv = styled.div`
    width: 800px;
    height: 687px;
    margin: 0 auto;
    line-height: 300px;
    display: flex;
    justify-content: center;
    align-content: center;
    h1 {
        line-height: 667px;
    }
`;

// const DialogWrap = styled.div`
//     position: fixed;
//     width: 100%;
//     height: 100%;
//     top: 0px;
//     left: 0px;
//     background-color: black;
//     opacity: 0.4;
//     display: none;
//     justify-content: center;
//     align-items: center;
// `;

// const Dialog = styled.div`
//     width: 602px;
//     height: 560px;
//     position: fixed;
//     top: calc(50% - 275px);
//     left: calc(50% - 300px);
//     background-color: white;
//     border-radius: 10px;
//     border: 1px solid black;
//     padding: 10px 0px;
//     display: none;
// `;

// const DialogHeader = styled.div`
//     width: 600px;
//     height: 70px;
//     border-bottom: 1px solid black;
//     background-color: white;
//     line-height: 70px;
//     font-size: 18px;
//     font-weight: 600;
// `;
// const DialogMain = styled.div`
//     width: 600px;
//     height: 400px;
//     background-color: white;
// `;
// const DialogFooter = styled.div`
//     width: 600px;
//     height: 70px;
//     border-top: 1px solid black;
//     background-color: white;
// `;

function Main() {
    // const [position, setPosition] = useState();
    // const nodeRef = useRef(null);
    // const trackPos = (data) => {
    //     setPosition({ x: data.x, y: data.y });
    // };
    return (
        <>
            <MainDiv>
                <h1>Main</h1>
            </MainDiv>
            {/* <DialogWrap></DialogWrap>
            <Dialog>
                <Draggable nodeRef={nodeRef} onDrag={(e, data) => trackPos(data)}>
                <DialogHeader>모달의 헤더(Modal Header)</DialogHeader>
                </Draggable>
                <DialogMain></DialogMain>
                <DialogFooter></DialogFooter>
            </Dialog> */}
        </>
    );
}

export default Main;
