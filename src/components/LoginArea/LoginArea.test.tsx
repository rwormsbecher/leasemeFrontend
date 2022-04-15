import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { translationSets } from "../../i18n/translations";
import { LoginArea } from "./LoginArea";

function setupTest() {
    render(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <LoginArea />
        </IntlProvider>
    );
}

describe("Loginarea page", () => {
    // make sure the login page gets loaded
    test("renders the heading Welcome", () => {
        setupTest();

        const header = screen.getByRole("heading", {
            name: /welkom/i,
        });
        expect(header).toBeInTheDocument();
        expect(header.textContent).toMatchInlineSnapshot(`"Welkom!"`);
    });

    test("renders the textfields on the page and renders errors when nothing is typed in it and form submitted.", async () => {
        setupTest();

        const usernameInput = screen.getByLabelText(/gebruikersnaam/i);
        expect(usernameInput).toHaveFocus();
        userEvent.tab();

        const passwordInput = screen.getByLabelText(/wachtwoord/i);
        expect(passwordInput).toHaveFocus();
        userEvent.tab();

        const loginButton = screen.getByRole("button", {
            name: /inloggen/i,
        });
        expect(loginButton).toHaveFocus();

        await waitFor(async () => {
            await fireEvent.click(loginButton);
        });

        const usernameAlert = screen.getByRole("alert", { name: /username/i });
        expect(usernameAlert.textContent).toMatchInlineSnapshot(`"Voer een gebruikersnaam in"`);

        const passwordAlert = screen.getByRole("alert", { name: /password/i });
        expect(passwordAlert.textContent).toMatchInlineSnapshot(`"Voer een wachtwoord in"`);
    });
});
