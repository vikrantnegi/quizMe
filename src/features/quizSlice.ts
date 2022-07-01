import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SubmittedItem, SubmittedItemAnswer } from '../types';

interface QuizState {
  answeredQuizzes: SubmittedItem[];
}

const initialState: QuizState = {
  answeredQuizzes: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    submitAnswer: (state, action: PayloadAction<SubmittedItemAnswer>) => {
      const answeredQuestion = action.payload;

      const subCategoryExists = state.answeredQuizzes.find(
        (quiz) => quiz.subCategory === answeredQuestion.subCategory
      );

      if (subCategoryExists) {
        subCategoryExists.questions.push(answeredQuestion);
      } else {
        state.answeredQuizzes.push({
          subCategory: answeredQuestion.subCategory,
          questions: [answeredQuestion],
        });
      }
    },
  },
});

export const { submitAnswer } = quizSlice.actions;

export default quizSlice.reducer;
