import { axiosInstance } from "./Core";

export const MainApi = {
  getApi() {
    return axiosInstance.get(`/movie/popular?`);
  },
};
