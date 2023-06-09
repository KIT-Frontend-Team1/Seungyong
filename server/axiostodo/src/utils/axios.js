import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  withCredentials: true,
});
/*
1. axios 인스턴스 생성
2. create메소드 안의 객체 생성
3. baseURL 설정 -> .env에 숨겨야함 (REACT_APP 적어주기 필수!)
  -> REACT_APP_BACKEND_URL = http://localhost:9000
4. baseURL에 REACT_APP_BACKEND_URL 로 작성하기
5. Bearer -> jwt 토큰임을 알려주는 것 (json web token)
6. Authorization 로컬스토리지의 해당 key값으로 accessToken 조회
7. withCredentials: true -> 서버 간의 통신에서 쿠키를 서로 교환 가능하도록 하는 옵션
*/
// 삭제
// export const deleteTodo = async (todoId) => {
//   try {
//     const response = await axios.delete(`/todos/${todoId}`);
//     return response.data;
//   } catch (error) {
//     // 오류 처리
//     throw error;
//   }
// };
// 이게 아닌 것 같다 잘못 생각을 한 듯
// // 수정
// export const updateData = async (url, data, config) => {
//   try {
//     const response = await axiosInstance.put(url, data, config);
//     return response.data;
//   } catch (error) {
//     // 오류 처리
//     throw error;
//   }
// };
/*
Bearer -> jwt 토큰임을 알려주는 것 (json web token)
Authorization 로컬스토리지의 핻장 key값으로 accessToken
*/
