import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SEVER_URL,
});

const useAxiosInstance = () => {
  return axiosInstance;
};

export default useAxiosInstance;
