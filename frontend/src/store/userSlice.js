import { createSlice } from "@reduxjs/toolkit"; // createSlice import 추가

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: "0", //1이면 admin
    image: "",
  },

  isAuth: "false",
  isLoading: "false",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
