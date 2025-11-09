import { useAuth } from "@/contexts/Auth/auth-context";
import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

const useAxiosEffect = () => {
  const { setUser } = useAuth();
  useEffect(() => {
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  });
};

export { axiosSecure, useAxiosEffect };
