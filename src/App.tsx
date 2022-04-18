import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import AuthenticationGuard from "./components/auth/AuthenticationGuard";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";

const Main = styled.main`
    width: 100%;
    grid-row: 1 / -1;
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 6.4rem repeat(10, 1fr) 6.4rem;
`;

function App() {
    return (
        <Main>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/home"
                    element={
                        <AuthenticationGuard>
                            <Home />
                        </AuthenticationGuard>
                    }
                />
            </Routes>
        </Main>
    );
}

export default App;
