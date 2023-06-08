import { useEffect, useState } from "react";
import { axiosInstance } from "utils/axios";
// import { useEffect, useState } from "react";

export const getTodoApi = async () => {
  try {
    const res = await axiosInstance.get("/todo");
    // console.log("getTodoList", res);
    // console.log(res);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const addTodoApi = async (title, content) => {
  try {
    if (!title || !content) {
      const err = new Error();
      err.type = "empty error";
      err.message = "빈칸을 채워주세요";
      throw err;
    }
    await axiosInstance.post("/todo", { title, content });
    getTodoApi();
  } catch (error) {
    console.error(error);
  }
};

const useTodoApi = () => {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const fetchTodoData = async () => {
      try {
        const data = await getTodoApi();
        setTodoList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodoData();
  }, []);
  const apis = {
    getTodoApi,
    addTodoApi,
  };
  return { todoList, ...apis };
};
export default useTodoApi;
