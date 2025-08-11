import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrapAsync = async() => {
            try {
                const token = await AsyncStorage.getItem('token');
                if(token) {
                    const { data } = await api.get('/auth/me');
                    setUser(data);
                }
            } catch (error) {
                console.error('Restoring token failed', error);
            } finally {
                setIsLoading(false);
            }
        };
        bootstrapAsync();
    }, []);

    const authActions = {
        login: async(email, password) => {
            try {
                const { data } = await api.post('/auth/login', { email, password });
                await AsyncStorage.setItem('token', data.token);
                setUser(data.user);
                return { success: true };
            } catch(error) {
                return { success: false, error: error.message };
            }
        },
        signup: async(username, email, password) => {
            try {
                await api.post('/auth/signup', { username, email, password });
                return { success: true };
            } catch(error) {
                return { success: false, error: error.message };
            }
        },
        logout: async() => {
            await AsyncStorage.removeItem('token');
            setUser(null);
        },
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, ...authActions }}>{children}</AuthContext.Provider>
    );
};