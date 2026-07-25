import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔄 Load from localStorage ONCE
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }

        setLoading(false);
    }, []);

    // 🔐 Login
    const login = (userData, tokenData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);

        // ✅ IMPORTANT: set state AFTER storage
        setUser(userData);
        setToken(tokenData);
    };

    // 🚪 Logout
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
        setToken(null);
    };

    // ✅ FIX: depend on BOTH token + user
    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;