import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../../../styles/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useInput from "../../../../hooks/use-input";
import { axiosInstance } from "utils/axios";
import axios from "axios";
import useTodoApi, {
  deleteTodoApi,
  toggleTodoStateApi,
  updateTodoApi,
} from "apis/Apis";
import { useTodoStore } from "usecontext/Usecontext";

const OneTodo = ({ todo, updateTodo, deleteTodo }) => {
  const { id, title, content } = todo;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, onChangeEditContent] = useInput(content);
  const { updateTodoApi, deleteTodoApi, toggleTodoStateApi } = useTodoApi();
  const [state, setState] = useState(todo.state);
  const { todoList, setTodoList } = useTodoStore();

  const handleTodoEdit = () => {
    if (!isEditMode) return setIsEditMode(true);
    updateTodoApi(id, editContent); // updateTodoApi 사용
    setIsEditMode(false);
  };

  const handleTodoDelete = () => {
    deleteTodoApi(id); // deleteTodoApi 사용
  };

  // const handleTodoCheck = async () => {
  //   const updatedState = !state;
  //   try {
  //     await toggleTodoStateApi(id, updatedState); // toggleTodoStateApi 사용
  //     updateTodo(id, editContent, updatedState);
  //     setState(updatedState);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const handleTodoEdit = () => {
  //   if (!isEditMode) return setIsEditMode(true);
  //   updateTodo(id, editContent);
  //   setIsEditMode(false);
  // };
  // const handleTodoDelete = () => {
  //   deleteTodo(id);
  // };
  // const handleTodoCheck = async () => {
  //   const updatedState = !state;
  //   try {
  //     await axiosInstance.put(`/todo/${id}`, { state: updatedState });
  //     updateTodo(id, editContent, updatedState);
  //     setState(updatedState);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <S.Wrapper state={state}>
      <S.Header>
        <S.StateBox state={state} onClick={toggleTodoStateApi}>
          <FontAwesomeIcon icon={faCheck} />
        </S.StateBox>
        <S.Title state={state}>
          {title}
          <div>
            <FontAwesomeIcon icon={faPen} onClick={handleTodoEdit} />
            <FontAwesomeIcon icon={faBan} onClick={handleTodoDelete} />
          </div>
        </S.Title>
      </S.Header>
      <S.Content state={state}>
        {isEditMode ? (
          <textarea
            value={editContent}
            onChange={onChangeEditContent}
          ></textarea>
        ) : (
          content
        )}
      </S.Content>
    </S.Wrapper>
  );
};
export default OneTodo;

const Wrapper = styled.li`
  width: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border: 1px solid #999;
  margin: 16px 0;
  list-style: none;
  border-radius: 8px;
  background-color: ${({ state, theme }) =>
    state ? theme.PALETTE.gray[100] : theme.PALETTE.white};
`;

const Header = styled.div`
  border-bottom: 1px dotted #999;
  ${flexAlignCenter};
  padding: 8px 16px;
  height: 48px;
`;

const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  & svg {
    cursor: pointer;
    margin-left: 16px;
    :hover {
      transform: scale(1.2);
    }
  }
`;

const StateBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  ${flexCenter};
  color: ${({ state }) => (state ? "#3CB371" : "#999")};
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;

const Content = styled.div`
  padding: 16px;
  text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  & textarea {
    width: 100%;
    height: 100%;
    border: 1px dotted #999;
    outline: none;
    resize: none;
  }
`;

const S = {
  Wrapper,
  Header,
  StateBox,
  Title,
  Content,
};

/**
 * @params : todo {
 *  content: string
 * }
 *
 * @TODO : refactor
 */

// const axiosdeleteTodo = async (todoId) => {
//   try {
//     await deleTodo(todoId);
//     // 삭제 성공 시 실행할 코드 추가
//   } catch (error) {
//     // 오류 처리
//     console.error(error);
//   }
// };
// const handleTodoDelete = async () => {
//   try {
//     const data = await axios.delete("http://localhost:9000");
//     // 삭제 성공 시 실행할 코드 추가
//   } catch (error) {
//     // 오류 처리
//     console.error(error);
//   }
// };

// const getTodoList = async () => {
//   try {
//     const res = await axiosInstance.get("/todo");
//     setTodoList(res.data.data);
//     console.log(res);
//   } catch (err) {
//     console.error(err);
//   }
// };
// useEffect(() => {
//   getTodoList();
// }, []);
// const handleTodoDelete = async () => {
//   try {
//     await axiosInstance.delete("/:todoId");
//     getTodoList();
//   } catch (error) {
//     console.error(error);
//   }
// };

// delete성공 하지만 새로고침해야지 delete가 됨
// const handleTodoDelete = async () => {
//   try {
//     await axiosInstance.delete(`/todo/${id}`);
//     // getTodoList();
//     setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
//   } catch (error) {
//     console.error(error);
//   }
// };
