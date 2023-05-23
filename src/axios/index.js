import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "https://api.hubapi.com",
    baseURL: process.env.REACT_APP_API_BASE_URL
});
console.log("process.env.REACT_APP_API_BASE_URL", process.env.REACT_APP_API_BASE_URL);
axiosInstance.interceptors.request.use(
    config => {
        const token =process.env.REACT_APP_HUBSPOT_ACCESS_TOKEN
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
            // config.headers['Access-Control-Allow-Origin']=true 
        }
        // config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        Promise.reject(error)
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);