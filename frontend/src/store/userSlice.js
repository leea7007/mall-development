import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  registerUser,
  loginUser,
  authUser,
  logoutUser,
} from "./thunkFunctions"; // registerUser import

const initialState = {
  isLoading: false,
  isAuth: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그아웃 액션
    logoutUser: (state) => {
      state.isAuth = false;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("회원가입 완료");
        toast.info("회원가입이 완료되었습니다. 로그인해주세요.", {
          position: "top-center",
        });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`회원가입 실패: ${action.payload}`, {
          position: "top-center",
        });
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (!action.payload) {
          console.error("❌ 로그인 응답이 없습니다.");
          return;
        }

        if (action.payload.loginSuccess) {
          state.isAuth = true;
          localStorage.setItem("accessToken", action.payload.accessToken);
          toast.info("로그인 성공!", { position: "top-center" });
        } else {
          state.isAuth = false;
          toast.error(action.payload.message || "로그인 실패", {
            position: "top-center",
          });
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`로그인 실패: ${action.payload}`, {
          position: "top-center",
        });
      })

      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        if (action.payload === null) {
          return;
        }
        console.log("🟢 로그인 응답 payload:", action.payload);

        state.isLoading = false;
        if (action.payload.loginSuccess) {
          state.isAuth = true;
        } else {
          // 로그인 실패 처리
          state.isAuth = false;
        }
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
      });
  },
});

export default userSlice.reducer;
