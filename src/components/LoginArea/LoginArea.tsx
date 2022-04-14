import React from "react";
import styled from "styled-components";

const LoginAreaWrapper = styled.div`
    width: 33%;
    display: flex;
    position: absolute;
    left: 33%;
    top: 120px;
    height: 200px;
    background: #ffffff;
    box-shadow: 0px 2px 2px rgba(34, 34, 34, 0.08);
    border-radius: 2px;
`;

export const LoginArea = () => {
    return <LoginAreaWrapper>LoginArea</LoginAreaWrapper>;
};
