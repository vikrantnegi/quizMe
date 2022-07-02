import { configureStore } from '@reduxjs/toolkit';

import QuizReducer from './features/quizSlice';
import UserReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    quizzes: QuizReducer,
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
