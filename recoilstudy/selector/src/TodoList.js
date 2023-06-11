import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { atom, selector } from "recoil";

// Atom
const todoListState = atom({
  key: "todoListState",
  default: [],
});

const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

// Selector
const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

// Components
function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </>
  );
}

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

function TodoListStats() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const toggleItemCompletion = () => {
    const newList = [...todoList];
    const itemIndex = newList.findIndex((todoItem) => todoItem.id === item.id);
    newList[itemIndex] = {
      ...newList[itemIndex],
      isComplete: !newList[itemIndex].isComplete,
    };
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = todoList.filter((todoItem) => todoItem.id !== item.id);
    setTodoList(newList);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <span>{item.text}</span>
      <button onClick={deleteItem}>Delete</button>
    </div>
  );
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState(""); // Updated: Added useState

  // Updated: Destructuring the setTodoList function from useRecoilState
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const addItem = () => {
    if (inputValue.trim() !== "") {
      const newItem = {
        id: todoList.length + 1,
        text: inputValue,
        isComplete: false,
      };

      const updatedTodoList = [...todoList, newItem];
      setTodoList(updatedTodoList);
      setInputValue("");
    }
  };

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default TodoList;
