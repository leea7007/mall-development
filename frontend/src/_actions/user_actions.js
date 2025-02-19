import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types.js";
import { useSelector } from "react-redux";

export function loginUser(dataToSubmit) {
  axios.defaults.baseURL = "http://localhost:8080"; // 전역으로 설정

  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/user/login",
        dataToSubmit,
        { withCredentials: true } // 쿠키를 포함시켜 보냄
      );
      console.log("response", response);
      // 로그인 성공 시 응답이 있을 경우에만 dispatch
      if (response.data.userData) {
        dispatch({
          type: LOGIN_USER,
          payload: {
            loginSuccess: true,
            userData: response.data.userData, // response.data.userData로 수정
          },
        });
      } else {
        console.error("로그인 실패: 응답 데이터 없음");
        dispatch({
          type: LOGIN_USER,
          payload: { error: "로그인 실패: 응답 데이터 없음" },
        });
        return { loginSuccess: false };
      }
    } catch (error) {
      console.error("로그인 오류", error);
      dispatch({
        type: LOGIN_USER,
        payload: { error: "로그인에 실패했습니다." },
      });
      return { loginSuccess: false }; // 실패시 반환
    }
  };
}

export function registerUser(dataToSubmit) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        dataToSubmit,
        {
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 보낸다고 명시
          },
          withCredentials: true, // 쿠키 사용
        }
      );

      // 회원가입 성공 시, 응답이 있는 경우만 dispatch
      if (response.data && response.status === 201) {
        dispatch({
          type: REGISTER_USER,
          payload: response.data,
        });
      } else {
        // 회원가입 실패 시 처리 (optional)
        console.error("회원가입 실패: 응답 데이터 없음");
      }
      return response; // 서버 응답을 반환
    } catch (error) {
      console.error("회원가입 실패", error);
      // 회원가입 실패 시 에러 메시지를 액션으로 전달
      dispatch({
        type: REGISTER_USER,
        payload: { error: "회원가입에 실패했습니다." },
      });
      return { payload: { registerSuccess: false, message: error.message } };
    }
  };
}
