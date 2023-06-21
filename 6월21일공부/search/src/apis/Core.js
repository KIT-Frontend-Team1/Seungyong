import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    Authorization: process.env.REACT_APP_TOKEN,
  },
});
