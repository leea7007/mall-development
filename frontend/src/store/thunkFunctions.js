import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "superagent"; // superagent 임포트
import axiosInstance from "../utils/axios";

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
      // console.log("resbody", res.body);
      // await thunkAPI.dispatch(
      //   getCartItems({
      //     cartItemIds: res.body.cartItemIds, // 장바구니 아이템 ID 배열
      //     userCart: res.body.cart, // 사용자 장바구니 정보
      //   })
      // );

      return res.body; // 성공하면 그대로 반환
    } catch (error) {
      return thunkAPI.rejectWithValue("로그인 실패", +error.response?.body);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async (userData, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
      if (!token) {
        return thunkAPI.rejectWithValue("토큰이 존재하지 않습니다.");
      }

      // 요청에 Authorization 헤더 추가
      const res = await request
        .get("http://localhost:8080/user/authUser")
        .set("Authorization", `Bearer ${token}`); // Bearer 토큰을 헤더에 포함시킴

      return res.body; // 응답 본문 반환
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.body || "Auth failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    // 로컬 스토리지에서 accessToken 삭제
    localStorage.removeItem("accessToken");

    // 로그아웃 성공 메시지 리턴
    return { message: "로그아웃 성공" };
  }
);

export const addToCart = createAsyncThunk(
  "user/cart",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/cart`, body);
      if (response.status !== 200 || response.data.error) {
        throw new Error(response.data.error || "장바구니 추가 실패");
      }
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response ? err.response.data : err.message
      );
    }
  }
);

export const getCartItems = createAsyncThunk(
  "user/getCartItems",
  async ({ cartItemIds, userCart }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/product/${cartItemIds}?type=array`
      );
      const productArray = Array.isArray(response.data)
        ? response.data
        : [response.data];
      userCart.forEach((cartItem) => {
        response.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data[index].quantity = cartItem.quantity;
          }
        });
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response ? err.response.data : err.message
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "user/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/users/cart?productId=${productId}`
      );
    } catch {}
  }
);
