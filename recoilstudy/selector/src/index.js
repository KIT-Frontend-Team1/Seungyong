import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import TodoList from "./TodoList";

ReactDOM.render(
  <RecoilRoot>
    <TodoList />
  </RecoilRoot>,
  document.getElementById("root")
);
