import React, { FC } from "react";
import styled from "styled-components";

const H1 = styled.h1`
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 39px;
    margin-bottom: 16px;
`;

const H2 = styled.h2`
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 16px;
`;

const H3 = styled.h3`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    margin-bottom: 8px;
`;

export const Header1: FC<any> = ({ children, ...props }) => {
    return <H1 {...props}>{children}</H1>;
};

export const Header2: FC<any> = ({ children, ...props }) => {
    return <H2 {...props}>{children}</H2>;
};

export const Header3: FC<any> = ({ children, ...props }) => {
    return <H3 {...props}>{children}</H3>;
};
