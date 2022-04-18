import { useEffect } from "react";

interface IAuthenticationProps {
    children?: React.ReactNode;
}

const AuthenticationGuard: React.FC<IAuthenticationProps> = (props: IAuthenticationProps) => {
    useEffect(() => {
        console.log("check the jwt token");
    }, []);
    return <>{props.children}</>;
};

export default AuthenticationGuard;
