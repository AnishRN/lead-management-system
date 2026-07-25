import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (

        <nav className="navbar navbar-dark bg-dark px-4">

            <span className="navbar-brand">
                CRM System
            </span>

            <div className="d-flex align-items-center gap-3">

                <span className="text-light">
                    {user?.name} ({user?.role})
                </span>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

};

export default Navbar;