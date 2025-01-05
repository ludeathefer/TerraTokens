import axios from "axios";
import { useStore } from "./hooks/use-store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useStore.getState().sessionToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.data?.message === "User public key is required"
    ) {
      useStore.getState().clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Daily Tokens API
export const getDailyTokensApi = async () =>
  (await axiosInstance.get("/daily_tokens")).data;

// Land Tokens API
export const getLandTokensApi = async () =>
  (await axiosInstance.get("/land_tokens")).data;

// Tokens for Sale API
export const getTokensForSaleApi = async () =>
  (await axiosInstance.get("/tokens_for_sale")).data;

// Tokens Purchased API
export const getTokensPurchasedApi = async () =>
  (await axiosInstance.get("/tokens_purchased")).data;

// Users API
export const getUsersApi = async () => (await axiosInstance.get("/users")).data;

// Check User API
export const checkUserApi = async (userPublicKey: string) =>
  (
    await axiosInstance.post("/check-user", {
      user_public_key: userPublicKey,
    })
  ).data;

// Add User API
export const addUserApi = async ({
  userPublicKey,
  name: username,
  email,
  phoneNumber,
}: {
  userPublicKey: string;
  name: string;
  email: string;
  phoneNumber: string;
}) =>
  (
    await axiosInstance.post("/add-user", {
      user_public_key: userPublicKey,
      username,
      email,
      phone_number: phoneNumber,
    })
  ).data;

// Top Lands API
export const getTopLandsApi = async () =>
  (await axiosInstance.get("/top-lands")).data;

// Recent Lands API
export const getRecentLandsApi = async () =>
  (await axiosInstance.get("/recent-lands")).data;

// Land Token Details API
export const getLandTokenDetailsApi = async (token: string) =>
  (await axiosInstance.get(`/land_tokens/${token}`)).data;

// Land Token Prices API
export const getLandTokenPricesApi = async (token: string) =>
  (await axiosInstance.get(`/land_tokens/${token}/prices`)).data;

// Holding Status API
export const getHoldingStatusApi = async (userPublicKey: string) =>
  (
    await axiosInstance.post("/holding-status", {
      user_public_key: userPublicKey,
    })
  ).data;
