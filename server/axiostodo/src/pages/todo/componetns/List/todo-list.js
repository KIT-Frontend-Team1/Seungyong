import { useEffect, useState } from "react";
import OneTodo from "./one-todo";
import { axiosInstance } from "utils/axios";
import axios from "axios";

const TodoList = ({ todoList, setTodoList }) => {
  const updateTodo = async (id, editedContent) => {
    try {
      await axiosInstance.put(`todo/${id}`, { content: editedContent });
      const updatedTodoList = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, content: editedContent };
        }
        return todo;
      });
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까")) {
      try {
        await axiosInstance.delete(`/todo/${id}`);
        const _todoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(_todoList);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {todoList.map((todo) => (
        <OneTodo
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </>
  );
};
export default TodoList;

// const deleteTodo = async () => {
//   try {
//     await handleTodoDelete();
//     // Code to run after successful deletion
//   } catch (error) {
//     // Error handling
//     console.error(error);
//   }
// };

// // Usage
// deleteTodo();
// 새로고침..왜...안돼....하....
// 모르겠다... 뭐가 문제야...
// const deleteTodo = (id) => {
//   if (window.confirm("Are you sure you want to delete it?")) {
//     try {
//       deleteTodoSync(id);
//       const updatedTodoList = todoList.filter((todo) => todo.id !== id);
//       setTodoList(updatedTodoList);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };

// const deleteTodoSync = (id) => {
//     // Perform the synchronous deletion logic here
//     // You can use axiosInstance.delete() or any other synchronous deletion method
//   };

//   // Usage
//   deleteTodo();

// 밑에 방법은 setTodoList를 사용할 수가 없다. 그래서 비동기라서 새로고침을 누르지 않으면 삭제는 가능하지만
// 랜더링이 되지 않아서 바로 보이지 않는다.
// console.log(res)도 콘솔로 나오지않는다.
// try {
//   await axiosInstance.delete(`/todo/${id}`);
//   // const res = await axiosInstance.delete(`/todo/${id}`);
//   // console.log(res);
//   // setTodoList(...TodoList);
//   // await deleteTodo(id);
//   // const updateTodoList = todoList.filter((todo) => todo.id !== id);
//   // setTodoList(updateTodoList);
//   // setTodoList = todoList.filter((todo) => todo.id !== id);
// } catch (error) {
//   console.error(error);
// }
// window.location.reload();
