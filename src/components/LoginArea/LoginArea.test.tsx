import {
    act,
    findByTestId,
    fireEvent,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { translationSets } from "../../i18n/translations";
import { server } from "../../mocks/server";
import { LoginArea } from "./LoginArea";

function setupTest() {
    const queryClient = new QueryClient();
    render(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <LoginArea />
                </BrowserRouter>
            </QueryClientProvider>
        </IntlProvider>
    );
}

// pay attention to write it at the top level of your file
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any), // technically it passes without this too, but I'm not sure if its there for other tests to use the real thing so I left it in
    useNavigate: () => mockedNavigator,
}));

describe("Loginarea page", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
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

    test("display a message when user fills in invalid credentials", async () => {
        server.use(
            rest.post(`https://leaseme-api.azurewebsites.net/login`, (req, res, ctx) => {
                return res(
                    ctx.status(422),
                    ctx.json({
                        detail: "Wrong email or password",
                    })
                );
            })
        );

        setupTest();

        const usernameInput = screen.getByLabelText(/gebruikersnaam/i);
        expect(usernameInput).toHaveFocus();
        userEvent.type(usernameInput, "ro22@live.nl");
        expect(usernameInput).toHaveValue("ro22@live.nl");
        userEvent.tab();

        const passwordInput = screen.getByLabelText(/wachtwoord/i);
        expect(passwordInput).toHaveFocus();
        userEvent.type(passwordInput, "987");
        expect(passwordInput).toHaveValue("987");
        userEvent.tab();

        const loginButton = screen.getByRole("button", {
            name: /inloggen/i,
        });
        expect(loginButton).toHaveFocus();

        await waitFor(async () => {
            await fireEvent.click(loginButton);
        });

        const failedLoginAlert = await screen.findByRole("alert");
        expect(failedLoginAlert.textContent).toMatchInlineSnapshot(
            `"Er is een fout opgetreden tijdens het inloggen. controleer uw gegevens en probeer het nogmaals."`
        );
    });

    test("should redirect to home when the login is succesful", async () => {
        server.use(
            rest.post(`https://leaseme-api.azurewebsites.net/login`, (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImV4cCI6MTY1MDMyMzkzM367.cPTle8WMDvyYw2-IllPXUouJcOByT2RSsWk2ROhZNeo",
                    })
                );
            })
        );

        setupTest();

        const usernameInput = screen.getByLabelText(/gebruikersnaam/i);
        expect(usernameInput).toHaveFocus();
        userEvent.type(usernameInput, "ro22@live.nl");
        expect(usernameInput).toHaveValue("ro22@live.nl");
        userEvent.tab();

        const passwordInput = screen.getByLabelText(/wachtwoord/i);
        expect(passwordInput).toHaveFocus();
        userEvent.type(passwordInput, "987");
        expect(passwordInput).toHaveValue("987");
        userEvent.tab();

        const loginButton = screen.getByRole("button", {
            name: /inloggen/i,
        });
        expect(loginButton).toHaveFocus();
        fireEvent.click(loginButton);

        await waitFor(async () => {
            await screen.findByTestId("success");
        });

        expect(mockedNavigator).toHaveBeenCalledTimes(1);
    });
});
