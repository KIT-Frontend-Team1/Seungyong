import { createContext, useContext, useState } from "react";

export const TodoStore = createContext();
export const useTodoStore = () => useContext(TodoStore);

export const UseContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  return (
    <TodoStore.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoStore.Provider>
  );
};
