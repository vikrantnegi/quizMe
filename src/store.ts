import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./features/quizSlice";

export default configureStore({
  reducer: quizReducer,
});
