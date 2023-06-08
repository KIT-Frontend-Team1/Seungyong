import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicButton from "../../components/Button/Button";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../styles/common";
import TodoAddModal from "./componetns/Modal/add-modal";
import TodoList from "./componetns/List/todo-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "utils/axios";

import { useTodoStore } from "usecontext/Usecontext";
import useTodoApi from "apis/Apis";

const TodoPage = () => {
  const { todoList, setTodoList } = useTodoStore();
  const { addTodoApi, getTodoApi } = useTodoApi();
  const params = useParams();
  const [isAddTodoModal, setIsAddTodoModal] = useState(false);
  useEffect(() => {
    getTodoApi();
    // console.log("aaaaa", res);
  }, []);
  const showTodoToastMessage = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    toast
      .promise(addTodoApi(title, content), {
        pending: "TODO LOADING",
        success: "TODO SUCCESS",
        error: "TODO ERROR",
      })
      .then(() => setIsAddTodoModal(false))
      .catch((err) => {
        if (err.type === "empty error") {
          alert(err.message);
        }
      });
  };

  const toastOption = {
    autoClose: 1000,
    theme: "colored",
  };

  const handAddTodoModal = () => {
    setIsAddTodoModal(true);
  };

  const handleCloseTodoModal = () => {
    setIsAddTodoModal(false);
  };

  return (
    <>
      {isAddTodoModal && (
        <TodoAddModal
          onAddToDo={showTodoToastMessage}
          onClose={handleCloseTodoModal}
        />
      )}
      <S.Wrapper>
        <S.Container>
          <S.Title>List</S.Title>
          <S.Content>
            <TodoList />
          </S.Content>
          <S.ButtonBox>
            <BasicButton
              variant={"primary"}
              size={"full"}
              onClick={handAddTodoModal}
            >
              추가
            </BasicButton>
          </S.ButtonBox>
        </S.Container>
      </S.Wrapper>
      <ToastContainer {...toastOption} />
    </>
  );
};
export default TodoPage;

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter};
`;

const Container = styled.div`
  width: 420px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  background-color: ${({ theme }) => theme.PALETTE.primary[300]};
  color: ${({ theme }) => theme.PALETTE.fontColor};
  padding-left: 32px;
  height: 32px;
  ${flexAlignCenter};
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-bottom: 64px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const S = {
  Wrapper,
  Container,
  Title,
  ButtonBox,
  Content,
};

// const getTodoList = async () => {
//   try {
//     const res = await axiosInstance.get("/todo");
//     console.log("getTodoList", res);
//     console.log(res);
//     setTodoList(res.data.data);
//   } catch (err) {
//     console.error(err);
//   }
// };
// addTodoApi를 주석해제하면 에러가 남 계속남
// 컴퓨터 터짐 무한루프에 빠진다...
// cup가 100%찍는거 처음봤다ㅋㅋㅋㅋㅋ
// addTodoApi()
//   .then(() => {
//     getTodoList();
//     setIsAddTodoModal(false);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// const addTodo = async (title, content) => {
//   try {
//     if (!title || !content) {
//       const err = new Error();
//       err.type = "empty error";
//       err.message = "빈칸을 채워주세요";
//       throw err;
//     }
//     await axiosInstance.post("/todo", {
//       title,
//       content,
//     });
//     getTodoList();
//     setIsAddTodoModal(false);
//   } catch (err) {
//     throw err;
//   }
// };
/*
데이터의 동기화 호출, 다른 사용자의 업데이트 호출, 안정성
*/

// setTodoList([res.data.data, ...todoList])
/*
    낙관적 업데이트 (optimistic update)
    데이터의 동기화나 일치보다 UX(사용자 경험)개선이 중요할 때 사용
        반드시 실패 했을 때는 에러 핸들링
        */

// const showTodoToastMessage = (e) => {
//   e.preventDefault();
//   const title = e.target.title.value;
//   const content = e.target.content.value;
//   toast
//     .promise(addTodoApi(title, content), {
//       pending: "TODO LOADING",
//       success: "TODO SUCEESS",
//       error: "TODO ERROR",
//     })
//     .catch((err) => {
//       if (err.type === "empty error") {
//         alert(err.message);
//       }
//     });
// };
// const handleAddTodo = async (title, content) => {
//   try {
//     await addTodoApi(title, content);
//     getTodoList();
//     setIsAddTodoModal(false);
//   } catch (error) {
//     console.error(error);
//   }
// };

// useEffect(() => {
//   getTodoList();
// }, []);

// const [todoList, setTodoList] = useState([]);
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
// const showTodoToastMessage = async (e) => {
//   e.preventDefault();
//   const title = e.target.title.value;
//   const content = e.target.content.value;

//   try {
//     await addTodoApi(title, content);
//     toast.success("TODO SUCCESS");
//     // const updatedTodoList = await getTodoApi();
//     // setTodoList(updatedTodoList);
//     // getTodoList();
//     // getTodoApi();
//   } catch (err) {
//     if (err.type === "empty error") {
//       alert(err.message);
//     } else {
//       toast.error("TODO ERROR");
//     }
//   }
//   setIsAddTodoModal(false);
// };
