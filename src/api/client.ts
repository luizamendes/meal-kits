import axios from "axios";

const getHttpClient = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_COOKIT_API,
    headers: { "Content-Type": "application/json" },
  });
};

const httpClient = getHttpClient();

export { httpClient };
