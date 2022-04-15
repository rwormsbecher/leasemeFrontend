import { isDisabled } from "@testing-library/user-event/dist/utils";
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
`;

interface IYellowButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isDisabled?: boolean;
}

export const YellowButton = ({
    text,
    isDisabled,
    ...props
}: IYellowButtonProps) => {
    return (
        <YellowButtonRegular {...props} disabled={isDisabled ? true : false}>
            {text}
        </YellowButtonRegular>
    );
};
