import axios from "axios";

const useAxios = () => {
  const Axios = axios.create({
    baseURL: "http://localhost:5000/api/v1/",
  });

  return { Axios };
};

export default useAxios;
