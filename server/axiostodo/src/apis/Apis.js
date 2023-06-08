import { useEffect, useState } from "react";
import { useTodoStore } from "usecontext/Usecontext";
import { axiosInstance } from "utils/axios";
const useTodoApi = () => {
  const { todoList, setTodoList } = useTodoStore();
  console.log("gkgkgkgk", todoList);
  const getTodoApi = async () => {
    try {
      const res = await axiosInstance.get("/todo");
      // await axiosInstance를 어떻게 분리해야할까.... 정말 모르겠다....
      // console.log("getTodoList", res);
      // console.log(res);
      console.log(res.data.data);
      // return res.data.data;
      setTodoList(res.data.data);
      console.log("gk", todoList);
      console.log("tl", res);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodoApi = async (title, content) => {
    try {
      // if (!title || !content) {
      //   const err = new Error();
      //   err.type = "empty error";
      //   err.message = "빈칸을 채워주세요";
      //   throw err;
      // }
      await axiosInstance.post("/todo", { title, content });
      getTodoApi();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodoApi = async (id, content, state, editedContent) => {
    try {
      await axiosInstance.put(`todo/${id}`, { content, state });
      getTodoApi();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodoApi = async (id) => {
    try {
      await axiosInstance.delete(`/todo/${id}`);
      getTodoApi();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodoStateApi = async (id, updatedState) => {
    try {
      await axiosInstance.put(`/todo/${id}`, { state: updatedState });
      getTodoApi();
    } catch (error) {
      console.error(error);
    }
  };

  // const [todoList, setTodoList] = useState([]);

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

  // const apis = {
  //   getTodoApi,
  //   addTodoApi,
  //   updateTodoApi,
  //   deleteTodoApi,
  //   toggleTodoStateApi,
  // };

  return {
    todoList,
    setTodoList,
    getTodoApi,
    addTodoApi,
    updateTodoApi,
    deleteTodoApi,
    toggleTodoStateApi,
  };
};

export default useTodoApi;
