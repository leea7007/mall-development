import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  registerUser,
  loginUser,
  authUser,
  logoutUser,
  addToCart,
  getCartItems,
} from "./thunkFunctions"; // registerUser import

const initialState = {
  isLoading: false,
  isAuth: false,
  error: null,
  value: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //test
    // 로그아웃 액션
    logoutUser: (state) => {
      state.isAuth = false;
      localStorage.removeItem("accessToken");
      toast.info("로그아웃되었습니다.", { position: "top-center" });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
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
          if (state.userData === action.payload || !state.isAuth) {
            console.log("반복되고 있음");
            state.isAuth = true;
            localStorage.setItem("accessToken", action.payload.accessToken);

            return;
          }
          state.isAuth = true;
          localStorage.setItem("accessToken", action.payload.accessToken);

          // 로그인 성공 시 userData 업데이트 여기가 포인트*************
          state.userData = action.payload;
          console.log("state.userData", state.userData);
          toast.info("로그인 성공!", { position: "bottom-right" });
        } else {
          state.isAuth = false;
          toast.error(action.payload.message || "로그인 실패", {
            position: "bottom-right",
          });
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`로그인 실패: ${action.payload}`, {
          position: "bottom-right",
        });
      })

      .addCase(authUser.pending, (state) => {
        console.log("pending");

        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        if (action.payload === null) {
          return;
        }

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
        console.log("rejected");
        localStorage.removeItem("accessToken");
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.isAuth) {
          toast.error("로그인 후 추가해주세요!", {
            position: "bottom-right",
          });
          throw new Error("장바구니 추가 실패");
        }
        state.userData = action.payload;

        toast.info("장바구니에 추가되었습니다.", {
          position: "bottom-right",
        });
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("장바구니 추가 실패!", {
          position: "bottom-right",
        });
      })

      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartDetail = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { updateValue } = userSlice.actions; // ✅ actions에서 추출
export default userSlice.reducer;
