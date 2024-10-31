import axios from "axios";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "./tokenStorage";

const axiosInstance = axios.create({
    baseURL: 'https://leaderboardbackend-f70q.onrender.com',
    timeout: 10000,
});

let isRefreshing = false;
let failedQueue:any = [];





// Function to process the failed requests when the token is refreshed
function processQueue(error, token = null) {
    failedQueue.forEach((prom:any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
}

// Request Interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getAccessToken(); // Get the access token from storage

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If we are already refreshing, wait for it to finish
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = getRefreshToken(); // Get the refresh token from storage
                axiosInstance.defaults.headers['Authorization']  = `Bearer ${refreshToken}`

                const response = await axios.get('https://leaderboardbackend-f70q.onrender.com/newAccessToken', {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`, // Set the Authorization header
                    },
                });
                const { access_token, refresh_token } = response.data; // Assume response contains new tokens
                setAccessToken(access_token); // Save new access token
                setRefreshToken(refresh_token); // Save new refresh token

                axiosInstance.defaults.headers['Authorization'] = `Bearer ${access_token}`; // Set new token in default headers

                processQueue(null, access_token); // Process all queued requests successfully
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`; // Set new token in original request

                return axiosInstance(originalRequest); // Retry original request
            } catch (err) {
                processQueue(err, null); // Process all queued requests with error
                return Promise.reject(err);
            } finally {
                isRefreshing = false; // Reset refreshing status
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

