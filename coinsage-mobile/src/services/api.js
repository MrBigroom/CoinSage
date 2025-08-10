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

export default api;