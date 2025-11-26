/**
 * Configuration de base pour les appels API
 * Instance Axios configurée avec intercepteurs
 */
import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 secondes
});

// Intercepteur de requête pour logger les appels
api.interceptors.request.use(
    (config) => {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error: AxiosError) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Intercepteur de réponse pour gérer les erreurs
api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(`[API Response] ${response.status} ${response.config.url}`);
        return response;
    },
    (error: AxiosError) => {
        const typedError = error as AxiosError<{ message?: string }>;
        const message = typedError.response?.data?.message || typedError.message;
        console.error('[API Response Error]', message);
        return Promise.reject(error);
    }
);

export default api;
