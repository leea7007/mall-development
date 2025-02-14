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
