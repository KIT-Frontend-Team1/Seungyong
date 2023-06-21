import { combineReducers } from "redux";
import { issueSlice } from "./issue";

export const rootReducer = combineReducers({
  issue: issueSlice.reducer,
});
