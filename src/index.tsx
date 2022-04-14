import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { IntlProvider } from "react-intl";
import { translationSets } from "./i18n/translations";

ReactDOM.render(
    <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
        <Login />
    </IntlProvider>,
    document.getElementById("root") as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
