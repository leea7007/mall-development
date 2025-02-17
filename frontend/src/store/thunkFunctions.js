import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "superagent"; // superagent 임포트

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    // 비동기 요청
    try {
      const res = await request
        .post("http://localhost:8080/user/register") // 백엔드 API 경로 수정 (서버의 주소에 맞게 변경)
        .send(userData) // 전달할 데이터
        .set("Content-Type", "application/json"); // 헤더 설정

      return res.body; // 응답 데이터 반환
    } catch (error) {
      // 에러가 발생한 경우
      return thunkAPI.rejectWithValue(
        error.response?.body || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const res = await request
        .post("http://localhost:8080/user/login")
        .send(userData)
        .set("Content-Type", "application/json");

      // 로그인 성공 여부 확인 후 success/failed로 처리
      if (res.body.loginSuccess === false) {
        return thunkAPI.rejectWithValue(res.body.message);
      }

      return res.body; // 성공하면 그대로 반환
    } catch (error) {
      return thunkAPI.rejectWithValue("로그인 실패");
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async (userData, thunkAPI) => {
    try {
      const res = await request.get("http://localhost:8080/user/authUser");
      return res.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.body || "Auth failed");
    }
  }
);
