import axios from "axios";

const keyValue = import.meta.env.VITE_API_KEY;
const tokenValue = import.meta.env.VITE_TOKEN;
const baseURL = import.meta.env.VITE_BASE_URL;

export const apiV1Instance = axios.create({
  baseURL,
  responseType: "json",
});

apiV1Instance.interceptors.request.use((request) => {
  if (tokenValue && keyValue) {
    request.params = {
      ...request.params,
      key: keyValue,
      token: tokenValue,
    };
  }
  return request;
});
