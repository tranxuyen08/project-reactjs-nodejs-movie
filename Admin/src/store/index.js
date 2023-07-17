import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../redux/reducer/index";

const store = configureStore({
  reducer: rootReducer,
})

export default store;