import axios from "axios";
import { useQuery } from "react-query";

const getPostById = async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

export const usePost = (postId) => {
  return useQuery(["post", postId], () => getPostById(postId), {
    enabled: !!postId,
  });
};
