import sendData from "@/services/sendData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfos: object) => {
    const response = await sendData(
      "http://localhost:4000/users/register",
      userInfos
    );

    localStorage.setItem("user", response.data.token);

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userInfos: object) => {
    const response = await sendData(
      "http://localhost:4000/users/login",
      userInfos
    );

    localStorage.setItem("user", response.data.token);

    return response.data;
  }
);

type InitialStateType = {
  loading: boolean;
  user: null | object;
  error: null | string;
};
const initialState: InitialStateType = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        (state.loading = true), (state.error = null), (state.user = null);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.user = action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "دسترسی صادر نشد"),
          (state.user = null);
      });
  },
  reducers: {},
});

export default userSlice.reducer;
