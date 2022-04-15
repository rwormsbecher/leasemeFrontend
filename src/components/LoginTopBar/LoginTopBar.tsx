import React from "react";
import styled from "styled-components";

const TopBarWrapper = styled.div`
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
`;

export const LoginTopBar = () => {
    return (
        <TopBarWrapper>
            <img src="assets/images/abn-logo.svg" alt="logo abn" />
        </TopBarWrapper>
    );
};
