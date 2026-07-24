import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-dark bg-dark">

            <div className="container-fluid">

                <span className="navbar-brand">

                    Lead Management System

                </span>

                <div className="d-flex align-items-center">

                    <span className="text-white me-3">

                        {user?.name}

                        {" | "}

                        {user?.role}

                    </span>

                    <button

                        className="btn btn-danger btn-sm"

                        onClick={handleLogout}

                    >

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;