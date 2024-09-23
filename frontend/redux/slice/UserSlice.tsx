import getDataAuth from "@/services/getDataAuth";
import sendData from "@/services/sendData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

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
  async (userInfos: object, { rejectWithValue }) => {
    try {
      const response = await sendData(
        "http://localhost:4000/users/login",
        userInfos
      );

      localStorage.setItem("user", response.data.token);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "خطا در ورود";

      // نمایش پیام خطا از backend
      if (error.response?.status === 400) {
        toast.error(message); // نمایش پیام خطا
      } else {
        toast.error("خطا در ورود"); // پیام عمومی برای سایر خطاها
      }

      return rejectWithValue(message);
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  "auth/get-current",
  async (_, thunAPI) => {
    try {
      const token = (await localStorage.getItem("user")) ?? "";
      console.log("Token:", token);
      if (!token) {
        throw new Error("توکنی دریافت نشد");
      }
      const infos: Infos = await jwtDecode(token);
      const userId = infos.user._id;
      console.log(userId);

      const response = await getDataAuth(
        "http://localhost:4000/users/get-curent-user-infos",
        userId
      );
      return response.data;
    } catch (error) {
      console.error("Error decoding token:", error);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", () => {
  localStorage.removeItem("user");
});

type Infos = {
  user: UserInfosType;
};

type UserInfosType = {
  _id: string;
  email: string;
  password: string;
};

type InitialStateType = {
  loading: boolean;
  user: null | UserInfosType;
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
      })

      .addCase(loginUser.pending, (state) => {
        (state.loading = true), (state.error = null), (state.user = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.user = action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "دسترسی صادر نشد"),
          (state.user = null);
      })
      .addCase(getCurrentUser.pending, (state) => {
        (state.loading = true), (state.error = null), (state.user = null);
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log(action);

        (state.loading = false),
          (state.error = null),
          (state.user = action.payload);
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "دسترسی صادر نشد"),
          (state.user = null);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        (state.loading = false), (state.user = null);
      });
  },
  reducers: {},
});

export default userSlice.reducer;
