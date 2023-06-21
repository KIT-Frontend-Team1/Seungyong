import { axiosInstance } from "./Core";

export const MainApi = {
  getApi(id) {
    return axiosInstance.get(`/movie/popular?${id}`);
  },
};
