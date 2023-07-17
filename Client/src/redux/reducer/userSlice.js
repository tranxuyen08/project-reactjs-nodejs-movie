
import { UserAPI } from "../../api/userApiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk('login', async (payload) => {
  const res = await UserAPI.login(payload);
  const roleActive = res.data.data.role_active;

  if (roleActive == 1) {
    localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
    localStorage.setItem('userLogin', JSON.stringify(res.data.data));
    return res
  } else {
    return res
  }

  // Trả về kết quả nếu cần thiết
  return res;
});
export const register = createAsyncThunk('register', async (payload) => {
  const res = await UserAPI.register(payload)
  return res
})
export const updateUser = createAsyncThunk('update', async (payload) => {
  const res = await UserAPI.update(payload)
  return res
})
export const favorite = createAsyncThunk('favorite', async (payload) => {
  const res = await UserAPI.favorite(payload)
  return res
})

const UserSlice = createSlice({
  name: 'users',
  initialState: JSON.parse(localStorage.getItem('userLogin')) || {},
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return state = action.payload
    },
    [register.fulfilled]: (state, action) => {
      return state = action.payload
    },
    [favorite.fulfilled]: (state, action) => {
      return state = action.payload
    }
  }
})

const { action, reducer } = UserSlice;

export default reducer;
