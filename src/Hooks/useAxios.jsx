import axios from "axios";

const useAxios = () => {
  const baseURL = import.meta.env.VITE_SERVER_LINK;
  const Axios = axios.create({ baseURL });

  return { Axios, baseURL };
};

export default useAxios;
