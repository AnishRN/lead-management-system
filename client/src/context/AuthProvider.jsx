import { useMemo, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {

        const storedUser = localStorage.getItem("user");

        return storedUser

            ? JSON.parse(storedUser)

            : null;

    });

    const login = (userData, token) => {

        localStorage.setItem(

            "user",

            JSON.stringify(userData)

        );

        localStorage.setItem(

            "token",

            token

        );

        setUser(userData);

    };

    const logout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        setUser(null);

    };

    const value = useMemo(() => ({

        user,

        login,

        logout,

        token: localStorage.getItem("token"),

        isAuthenticated: !!user

    }), [user]);

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};

export default AuthProvider;