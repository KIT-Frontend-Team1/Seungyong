import { axiosInstance } from "utils/axios";
// import { useEffect, useState } from "react";

// const [todoList, setTodoList] = useState([]);

export const getTodoApi = async () => {
  try {
    const res = await axiosInstance.get("/todo");
    console.log(res);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};

// useEffect(() => {
//   getTodoList();
// }, []);
export const addTodoApi = async (title, content) => {
  try {
    if (!title || !content) {
      const err = new Error();
      err.type = "empty error";
      err.message = "빈칸을 채워주세요";
      throw err;
    }
    await axiosInstance.post("/todo", { title, content });
  } catch (error) {
    console.error(error);
  }
};
