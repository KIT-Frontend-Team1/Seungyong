import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainApi } from "../apis/MainApi";

//api에서 받아온 issue 데이터를 관리하는 state
//issue
const initialState = {
  issue: [], //axios로 데이터가 담김
  getIssueState: {
    //pending, fullfilled, rejected
    loading: false, //T  F  F ==> true => 로딩 페이지를 보여줌(true)
    done: false, //F T T
    err: null, //F F 에러메세지
  },
  getIssueDetailState: {
    loading: false,
    done: false,
    err: null,
  },
};

//extraReducer를 사용해 getIssue가 실행되고, axios 상태에 따라
//getIssueState안의 loading, done, err를 바꿔줌
export const issueSlice = createSlice({
  name: "issue",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getIssue.pending, (state) => {
      state.getIssueState.loading = true;
      state.getIssueState.done = false;
      state.getIssueState.err = null;
    });
    builder.addCase(getIssue.fulfilled, (state, action) => {
      state.issue = action.payload; //데이터 담음
      state.getIssueState.loading = false;
      state.getIssueState.done = true;
      state.getIssueState.err = null;
      //성공을 했을 때 => issue데이터가 잘 들어옴 => issue데이터를 넣어줘야함 => usestate x
    });
    builder.addCase(getIssue.rejected, (state, action) => {
      state.getIssueState.loading = false;
      state.getIssueState.done = true;
      state.getIssueState.err = action.payload;
    });
    //detail페이지 id값의 데이터를 받아옴
    builder.addCase(getIssueDetail.pending, (state) => {
      state.getIssueDetailState.loading = true;
      state.getIssueDetailState.done = false;
      state.getIssueDetailState.err = null;
    });
    builder.addCase(getIssueDetail.fulfilled, (state, action) => {
      state.issueDetail = action.payload;
      console.log("issuePayload", action.payload);
      state.getIssueDetailState.loading = false;
      state.getIssueDetailState.done = true;
      state.getIssueDetailState.err = null;
    });
    builder.addCase(getIssueDetail.rejected, (state, action) => {
      state.getIssueDetailState.loading = false;
      state.getIssueDetailState.done = true;
      state.getIssueDetailState.err = action.payload;
    });
  },
});

//실행될 getIssue 함수
//createAsyncThunk : 첫번째 인자로 준 issue/getIssue에 따라 각각 pending,fulfilled,rejected
//액션 상태를 자동으로 생성한다.
//1. issue/getIssue/pending
//2.issue/getIssue/..
//3.issue/getIssue/...
export const getIssue = createAsyncThunk(
  "issue/getIssue",
  async ({ page, limit, sort }) => {
    try {
      const res = await mainApi.getApi(page, limit, sort);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const getIssueDetail = createAsyncThunk(
  "issue/getIssueDetail",
  async (number) => {
    try {
      const res = await mainApi.getDetailApi(number);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
);
