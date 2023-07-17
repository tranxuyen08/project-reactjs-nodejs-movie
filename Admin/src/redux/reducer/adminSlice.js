import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Admin } from '../../api/adminApiClient'
export const managerUsers = createAsyncThunk('managerUsers', async () => {
  const res = await Admin.getUser()
  return res
})
export const managerMovie = createAsyncThunk('managerMovie', async () => {
  const res = await Admin.getMovie()
  return res
})
export const deleteMovie = createAsyncThunk('deleteMovie', async () => {
  const res = await Admin.deleteMovie()
  return res
})
export const loginAdmin = createAsyncThunk('login', async (payload) => {
  const res = await Admin.login(payload)
  const roleAdmin = res.data.data.role_admin;
  if (roleAdmin == 2) {
    localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
    localStorage.setItem('userLogin', JSON.stringify(res.data.data));
    return res
  } else {
    return res
  }
})
const AdminSlice = createSlice({
  name: 'managerUsers',
  initialState: JSON.parse(localStorage.getItem('adminLogin')) || {},
  reducers: {},
  extraReducers: {
    [managerUsers.fulfilled]: (state, action) => {
      return state = action.payload
    },
    [managerMovie.fulfilled]: (state, action) => {
      return state = action.payload
    },
    [deleteMovie.fulfilled]: (state, action) => {
      return state = action.payload
    },
    [loginAdmin.fulfilled]: (state, action) => {
      return state = action.payload
    }
  }
})

const { action, reducer } = AdminSlice;

export default reducer;