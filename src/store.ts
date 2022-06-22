import { configureStore } from '@reduxjs/toolkit';

import QuizReducer from './features/quizSlice';

const store = configureStore({
  reducer: QuizReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
