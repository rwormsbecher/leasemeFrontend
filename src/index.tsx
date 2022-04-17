import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import { IntlProvider } from "react-intl";
import { translationSets } from "./i18n/translations";
import { QueryClient, QueryClientProvider } from "react-query";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

if (process.env.NODE_ENV === "development" && process.env.REACT_APP_USE_MSW) {
    const { worker } = require("./mocks/browser");
    worker.start();
}

const queryClient = new QueryClient();

ReactDOM.render(
    <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
        <QueryClientProvider client={queryClient}>
            <Login />
        </QueryClientProvider>
    </IntlProvider>,
    document.getElementById("root") as HTMLElement
);
