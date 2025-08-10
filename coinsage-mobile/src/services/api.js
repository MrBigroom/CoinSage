import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: 'http://192.168.0.172:5000/api',     // temporal local url
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (email, password) =>
    api.post('/auth/login', { email, password });

export const signup = (username, email, password) =>
    api.post('/auth/signup', { username, email, password });

export const getTransactions = () => api.get('/transactions');
export const addTransaction = (transaction) =>
    api.post('/transactions', transaction);
export const deleteTransaction = (id) =>
    api.delete(`/transactions/${id}`);

export const getBudgets = () => api.get('/budgets');
export const updateBudget = (budget) =>
    api.post('/budgets', budget);

export default api;