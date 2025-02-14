import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { registerUser } from "./thunkFunctions"; // registerUser import

const initialState = {
  isLoading: false,
  isAuth: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
        console.log("토스트 응답");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`회원가입 실패: ${action.payload}`, {
          position: "top-center",
        });
      });
  },
});

export default userSlice.reducer;
