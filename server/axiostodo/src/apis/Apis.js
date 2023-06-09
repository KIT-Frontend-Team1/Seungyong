import { useEffect, useState } from "react";
import { useTodoStore } from "usecontext/Usecontext";
import { axiosInstance } from "utils/axios";
const useTodoApi = () => {
  const { todoList, setTodoList } = useTodoStore();
  // console.log("gkgkgkgk", todoList);

  // 조회
  const getTodoApi = async () => {
    try {
      const res = await axiosInstance.get("/todo");
      // await axiosInstance를 어떻게 분리해야할까.... 정말 모르겠다....
      // console.log("getTodoList", res);
      // console.log(res);
      console.log(res.data.data);
      // return res.data.data;
      setTodoList(res.data.data);
      // console.log("gk", todoList);
      // console.log("tl", res);
      console.log("룰루");
    } catch (err) {
      console.error(err);
    }
  };

  // 추가
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

  // 수정
  const updateTodoApi = async (id, state, content) => {
    try {
      await axiosInstance.put(`/todo/${id}`, { state, content });
      getTodoApi();
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제
  const deleteTodoApi = async (id) => {
    try {
      await axiosInstance.delete(`/todo/${id}`);
      getTodoApi();
    } catch (error) {
      console.error(error);
    }
  };

  // // 체크 수정해야함.
  // const checkTodoStateApi = async (id, state, content) => {
  //   try {
  //     const newState = state === 1 ? 0 : 1; // 클릭하면 state를 1로 만들어주고 한번 더 클릭하면 0으로 만들어준다.
  //     await axiosInstance.put(`/todo/${id}`, { content, state: newState });
  //     // refresh하지 않아도 체크가 바로 보이게 만들기
  //     setTodoList((prevTodoList) =>
  //       prevTodoList.map((todo) => {
  //         if (todo.id === id) {
  //           return { ...todo, state: newState };
  //         }
  //         return todo;
  //       })
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // 이렇게 함수를 작성하면 refresh를 하지않으면 체크가 이루어지지 않는다.
  const checkTodoStateApi = async (id, content, state) => {
    try {
      // const newState = state === 1 ? 0 : 1;
      await axiosInstance.put(`/todo/${id}`, { content, state });
      getTodoApi();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    todoList,
    setTodoList,
    getTodoApi,
    addTodoApi,
    updateTodoApi,
    deleteTodoApi,
    checkTodoStateApi,
  };
};

export default useTodoApi;
// const [todoList, setTodoList] = useState([]);

// 여기에서 useEffect를 사용하고 index에서도 사용해서 todoList가 1시간동안 보이지 않았다. 코딩 너무 어렵다~~
// useEffect(() => {
//   const fetchTodoData = async () => {
//     try {
//       const data = await getTodoApi();
//       setTodoList(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchTodoData();
// }, []);

// const apis = {
//   getTodoApi,
//   addTodoApi,
//   updateTodoApi,
//   deleteTodoApi,
//   toggleTodoStateApi,
// };
