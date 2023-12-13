import axios from "axios";

const useAxios = () => {
  const baseURL = "https://event-management-backend-drab.vercel.app/api/v1/";
  const Axios = axios.create({ baseURL });

  return { Axios, baseURL };
};

export default useAxios;
