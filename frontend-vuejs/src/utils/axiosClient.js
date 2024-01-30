import axios from "axios";

import store from "@store";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    common: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
});

axiosClient.interceptors.request.use((config) => {
  const userTokenFull = store.getters.getUserTokenFull || "";
  if (userTokenFull) {
    config.headers.Authorization = userTokenFull;
  }

  return config;
});

export default axiosClient;
