import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducer";
import logger from "redux-logger";

export const store = configureStore({
  reducer: rootReducer, //상위의 리듀서 => 작은 slice를 만들어서 집어넣음
  devtools: process.env.NODE_ENV === "development",
  middleware: (defaultMiddleware) => {
    if (process.env.NODE_ENV === "development") {
      return [...defaultMiddleware(), logger]; //redux-logger
    }
    return defaultMiddleware();
  },
});
