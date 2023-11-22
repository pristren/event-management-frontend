import axios from "axios";

const useAxios = () => {
  const baseURL = "http://localhost:5000/api/v1/";
  const Axios = axios.create({ baseURL });

  return { Axios, baseURL };
};

export default useAxios;
