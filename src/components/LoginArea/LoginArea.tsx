import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled, { ThemeProvider } from "styled-components";
import { abfTheme } from "../../themes/abf";
import { themeSelector } from "../../themes/themeselector";
import { Header1 } from "../html/Headers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { YellowButton } from "../html/YellowButton";
import { useMutation, useQuery } from "react-query";
import { positiveResponseCode } from "../../utils/responseCodeHelper";
import { IThemeModel } from "../../models/IThemeModel";
import { Alert } from "react-bootstrap";

const loginSchema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

const LoginAreaWrapper = styled.div`
    width: 352px;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: calc((100% - 352px) / 2);
    top: 120px;
    background: #ffffff;
    box-shadow: 0px 2px 2px rgba(34, 34, 34, 0.08);
    border-radius: 2px;
    padding: 24px;

    h1 {
        color: ${(p) => p.theme.primaryColor};
        width: 100%;
        height: auto;
    }

    p {
        line-height: 24px;
    }
`;

const FormWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: ${(p) => p.theme.primaryColor};
`;

const ErrorLine = styled.p`
    color: darkred;
    font-style: italic;
    margin-bottom: 8px;
`;

const Textbox = styled.input`
    display: block;
    padding: 8px 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: ${(p) => p.theme.primaryTextColor};
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 24px;
    &:focus-visible {
        outline: -webkit-focus-ring-color 1px;
        outline-color: ${(p) => p.theme.primaryColor};
        outline-style: auto;
        outline-width: 1px;
    }
    &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #999;
        opacity: 1; /* Firefox */
    }
    &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #999;
    }
    &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #999;
    }
`;

const HelpText = styled.p`
    margin-bottom: 0;
    color: #808080;
`;

interface ILoginResults {
    token: string;
}

export const LoginArea = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const [theme, setTheme] = useState<IThemeModel>(abfTheme);
    const [error, setError] = useState<boolean>(false);
    const intl = useIntl();

    const getInitialData = async () => {
        await setTheme(themeSelector("abf"));
    };

    useEffect(() => {
        getInitialData();
    }, []);

    async function submitLogin<ILoginResults>(body: any) {
        const response = await fetch("https://leaseme-api.azurewebsites.net/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: body.username,
                password: body.password,
            }),
        });

        if (positiveResponseCode(response.status)) {
            const results: any | ILoginResults = await response.json();
            localStorage.setItem("user", results?.token);
            setError(false);
        } else {
            setError(true);
        }
    }

    const loginMutation = useMutation((body) => submitLogin(body));

    const submit = (data: any) => {
        loginMutation.mutate(data);
    };

    return (
        <ThemeProvider theme={theme}>
            <LoginAreaWrapper>
                <Header1>
                    <FormattedMessage id="login.welcome" defaultMessage="Welkom"></FormattedMessage>!
                </Header1>

                <p>
                    <FormattedMessage
                        id="login.introtext"
                        defaultMessage="Log in door je gebruikersnaam en wachtwoord in te voeren"
                    ></FormattedMessage>
                </p>

                {error ? (
                    <Alert variant="danger">
                        <FormattedMessage
                            id="login.error"
                            defaultMessage="Er is een fout opgetreden tijdens het inloggen. controleer uw gegevens en probeer het nogmaals"
                        ></FormattedMessage>
                        .
                    </Alert>
                ) : (
                    ""
                )}
                <form onSubmit={handleSubmit(submit)}>
                    <FormWrapper>
                        <Label htmlFor="username">
                            <FormattedMessage id="login.username" defaultMessage="Gebruikersnaam" />
                        </Label>
                        {errors.username && (
                            <ErrorLine role="alert" aria-label="username">
                                <FormattedMessage
                                    id="login.username.error"
                                    defaultMessage="Voer een gebruikersnaam in"
                                />
                            </ErrorLine>
                        )}
                        <Textbox {...register("username")} id="username" name="username" tabIndex={1} autoFocus />

                        <Label htmlFor="password">
                            <FormattedMessage id="login.password" defaultMessage="Wachtwoord" />
                        </Label>
                        {errors.password && (
                            <ErrorLine role="alert" aria-label="password">
                                <FormattedMessage id="login.password.error" defaultMessage="Voer een wachtwoord in" />
                            </ErrorLine>
                        )}
                        <Textbox {...register("password")} id="password" name="password" type="password" tabIndex={2} />
                        <YellowButton
                            text={intl.formatMessage({
                                id: "login.loginbutton",
                                defaultMessage: "Inloggen",
                            })}
                            disabled={loginMutation.isLoading}
                            type="submit"
                            tabIndex={4}
                        />
                    </FormWrapper>
                </form>

                <HelpText>
                    <FormattedMessage
                        id="login.needhelp"
                        defaultMessage="Heeft u hulp nodig? Neem contact op via 030 212 6020"
                    ></FormattedMessage>
                    .
                </HelpText>
            </LoginAreaWrapper>
        </ThemeProvider>
    );
};
