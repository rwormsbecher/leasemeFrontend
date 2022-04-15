import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { IntlProvider } from "react-intl";
import { translationSets } from "./i18n/translations";

function setupTest() {
    render(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <Login />
        </IntlProvider>
    );
}

describe("Login page", () => {
    // make sure the login page gets loaded
    test("renders the heading Welcome", () => {
        setupTest();

        const header = screen.getByRole("heading", {
            name: /welkom/i,
        });
        expect(header).toBeInTheDocument();
        expect(header.textContent).toMatchInlineSnapshot(`"Welkom!"`);
    });
});
