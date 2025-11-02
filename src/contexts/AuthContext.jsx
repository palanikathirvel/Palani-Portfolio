import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username, password) => {
        if (username === "palani" && password === "palani@2005") {
            setUser({ username });
            setIsAuthenticated(true);
            localStorage.setItem("auth", JSON.stringify({ username }));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("auth");
    };

    React.useEffect(() => {
        const savedAuth = localStorage.getItem("auth");
        if (savedAuth) {
            try {
                const user = JSON.parse(savedAuth);
                setUser(user);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Failed to parse saved auth:", error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
