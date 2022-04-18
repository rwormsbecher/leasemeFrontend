import styled from "styled-components";
import { Jumbotron } from "../../components/jumbotron/jumbotron";
import { LoginArea } from "../../components/LoginArea/LoginArea";
import { LoginTopBar } from "../../components/LoginTopBar/LoginTopBar";

const Main = styled.main`
    width: 100%;
    grid-row: 1 / -1;
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 6.4rem repeat(10, 1fr) 6.4rem;
`;

function Login() {
    return (
        <Main>
            <LoginTopBar />
            <Jumbotron>
                <LoginArea></LoginArea>
            </Jumbotron>
        </Main>
    );
}

export default Login;
