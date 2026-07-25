import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, loading, user } = useContext(AuthContext);

    // ⏳ Wait until auth loads from localStorage
    if (loading) {
        return <div>Loading...</div>;
    }

    // ❌ Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 🔐 Role-based protection (optional)
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    // ✅ Allow access
    return children;
};

export default ProtectedRoute;