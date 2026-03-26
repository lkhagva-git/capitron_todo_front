import React, { createContext, useState, useEffect, useContext } from 'react';
import { getRequest } from '../utils';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        accessToken: localStorage.getItem('access'),
        refreshToken: localStorage.getItem('refresh'),
        profile: null,
        loading: true,
    });

    const login = (access, refresh, profile) => {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);

        setAuth({
            accessToken: access,
            refreshToken: refresh,
            profile: profile ? profile : null,
            loading: false,
        });
    };

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        setAuth({
            accessToken: null,
            refreshToken: null,
            profile: null,
            loading: false,
        });
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const accessToken = localStorage.getItem('access');
            const refreshToken = localStorage.getItem('refresh');

            if (!accessToken || !refreshToken) {
                console.log("end bn");
                setAuth({
                    accessToken: null,
                    refreshToken: null,
                    profile: null,
                    loading: false,
                });
                return;
            }

            try {
                const response = await getRequest('/api/profile_data/');
                setAuth({
                    accessToken,
                    refreshToken,
                    profile: response,
                    loading: false,
                });
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
                logout();
            }
        };

        fetchProfile();
    }, []);

    const isAuthenticated = !!auth.accessToken;

    return (
        <AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};