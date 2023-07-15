import { MovieAPI } from "../../api/movieApiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAll = createAsyncThunk('getAll', async(payload) =>{
  const res = await MovieAPI.getAllMovie(payload)
  return res
})
export const getMovieShowSlide = createAsyncThunk('getShowSlide', async(payload) =>{
  const res = await MovieAPI.getMovieShowSlide(payload)
  return res
})
export const getMovieRate = createAsyncThunk('getRate', async(payload) =>{
  const res = await MovieAPI.getMovieRate(payload)
  return res.data.data
})
export const getMovieSearch = createAsyncThunk('getSearch', async(payload) =>{
  const res = await MovieAPI.getMovieSearch(payload)
  return res
})

const MovieSlice = createSlice({
  name: 'movie',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getAll.fulfilled]: (state, action) => {
      return state = action.payload
    },
    [getMovieShowSlide.fulfilled] : (state,action) =>{
      return state = action.payload
    },
    [getMovieRate.fulfilled] : (state,action) =>{
      return state
    },
    [getMovieSearch.fulfilled] : (state,action) =>{
      return state = action.payload
    }
  }
})

const { action, reducer } = MovieSlice;

export default reducer;
