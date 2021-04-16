import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {store, StoreContext} from "./stores/store";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css"

export const history = createBrowserHistory();

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <Router history={history}>
            <App/>
        </Router>
    </StoreContext.Provider>,
    document.getElementById("root")
);
