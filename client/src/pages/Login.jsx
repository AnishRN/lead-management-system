import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";

const Login = () => {

    const {

        isAuthenticated

    } = useAuth();

    if (isAuthenticated) {

        return <Navigate to="/dashboard" replace />;

    }

    return (

        <div

            className="container d-flex justify-content-center align-items-center"

            style={{

                minHeight: "100vh"

            }}

        >

            <LoginForm />

        </div>

    );

};

export default Login;