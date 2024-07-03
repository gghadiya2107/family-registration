// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getCookieValues, removeCookie, setCookiesValues } from './cookies';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated (e.g., by checking local storage or cookies)
        const storedUser = getCookieValues('userData'); // Example: storing user info in local storage
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // Example login logic: set user data in local storage or cookies
        setCookiesValues('userData', userData);
        setUser(userData);
    };

    const logout = () => {
        // Example logout logic: clear user data from local storage or cookies
        removeCookie('userData');
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
