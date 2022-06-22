import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SubmittedItem } from '../types';

interface QuizState {
  questions: SubmittedItem[];
}
const initialState: QuizState = {
  questions: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    submitAnswer: (state, action: PayloadAction<SubmittedItem>) => {
      const answeredQuestion = action.payload;
      state.questions.push(answeredQuestion);
      const ids = state.questions.map((o) => o.question.id);
      const newState = state.questions.filter(
        (question, index) => !ids.includes(question.question.id, index + 1)
      );
      state.questions = newState;
    },
  },
});

export const { submitAnswer } = quizSlice.actions;

export default quizSlice.reducer;
