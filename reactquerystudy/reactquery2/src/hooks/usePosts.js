import axios from "axios";
import { useQuery } from "react-query";

const getPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};

export const usePosts = () => {
  return useQuery("posts", getPosts);
};
