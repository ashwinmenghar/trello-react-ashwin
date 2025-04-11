import axios from "axios";

// Access env variables
const keyValue = import.meta.env.VITE_API_KEY;
const tokenValue = import.meta.env.VITE_TOKEN;
const baseURL = import.meta.env.VITE_BASE_URL;

// Create Axios instance
export const apiV1Instance = axios.create({
  baseURL,
  responseType: "json",
});

// Attach key/token as query params to every request
apiV1Instance.interceptors.request.use((request) => {
  if (keyValue && tokenValue) {
    request.params = {
      ...request.params,
      key: keyValue,
      token: tokenValue,
    };
  }
  return request;
});
