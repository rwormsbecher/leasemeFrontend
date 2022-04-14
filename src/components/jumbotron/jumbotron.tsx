import React from "react";
import styled from "styled-components";

const JumbotronWrapper = styled.div`
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    width: 100%;
    height: 160px;
    display: flex;
    position: relative;
    background: url("assets/images/jumbotron.png");
    background-size: cover;
`;

interface JumbotronProps {
    children?: React.ReactNode;
}

export const Jumbotron: React.FC<JumbotronProps> = (props: JumbotronProps) => {
    return <JumbotronWrapper>{props.children}</JumbotronWrapper>;
};
