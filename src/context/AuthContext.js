import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        initialized: false
    });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setAuthState({
            isAuthenticated: !!token,
            initialized: true
        });
    }, []);

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        setAuthState({
            isAuthenticated: true,
            initialized: true
        });
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setAuthState({
            isAuthenticated: false,
            initialized: true
        });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);