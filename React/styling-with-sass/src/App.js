import React from "react";
import "./App.scss";
import Button from "./component/Button";

function App() {
    return (
        <div className="App">
            <div className="buttons">
                <Button size="large">Button</Button>
                <Button>Button</Button>
                <Button size="small">Button</Button>
            </div>
            <div className="buttons">
                <Button size="large" color="gray">
                    Button
                </Button>
                <Button color="gray">Button</Button>
                <Button size="small" color="gray">
                    Button
                </Button>
            </div>
            <div className="buttons">
                <Button size="large" color="pink">
                    Button
                </Button>
                <Button color="pink">Button</Button>
                <Button size="small" color="pink">
                    Button
                </Button>
            </div>
            <div className="buttons">
                <Button outline>Button</Button>
                <Button outline color="gray">
                    Button
                </Button>
                <Button outline color="pink">
                    Button
                </Button>
            </div>
            <div className="buttons">
                <Button outline fullWidth className="custom-button">
                    Button
                </Button>
                <Button outline fullWidth color="gray">
                    Button
                </Button>
                <Button
                    outline
                    fullWidth
                    color="pink"
                    onClick={() => {
                        alert("click");
                    }}
                    onMouseMove={() => {
                        console.log("mouse move");
                    }}
                >
                    Button
                </Button>
            </div>
        </div>
    );
}

export default App;
