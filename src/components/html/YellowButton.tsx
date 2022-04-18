import React from "react";
import styled from "styled-components";

const YellowButtonRegular = styled.button`
    width: 100%;
    padding: 12px 16px;
    background: ${(p) => p.theme.yellowPrimary};
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        background: #aaa;
        color: #222;
    }
`;

interface IYellowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const YellowButton = ({ text, ...props }: IYellowButtonProps) => {
    return <YellowButtonRegular {...props}>{text}</YellowButtonRegular>;
};
