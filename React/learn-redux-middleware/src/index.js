import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger))
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
