import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import "./index.css";
import { IntlProvider } from "react-intl";
import { translationSets } from "./i18n/translations";

if (process.env.NODE_ENV === "development" && process.env.REACT_APP_USE_MSW) {
    const { worker } = require("./mocks/browser");
    worker.start();
}

ReactDOM.render(
    <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
        <Login />
    </IntlProvider>,
    document.getElementById("root") as HTMLElement
);
