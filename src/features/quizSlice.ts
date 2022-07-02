import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { quizCollectionTypes } from '../constants/Constants';
import firebaseManager from '../firebase';
import { SubmittedItem, SubmittedItemAnswer } from '../types';

type SetCategory = {
  category: string;
  subCategory: string;
};

interface QuizState {
  answeredQuizzes: SubmittedItem[];
  category: string;
  subCategory: string;
}

const initialState: QuizState = {
  answeredQuizzes: [],
  category: '',
  subCategory: '',
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuiz: (state, action: PayloadAction<SubmittedItem[]>) => {
      state.answeredQuizzes.push(...action.payload);
    },
    setCategories: (state, action: PayloadAction<SetCategory>) => {
      state.category = action.payload.category;
      state.subCategory = action.payload.subCategory;
    },
    submitAnswer: (state, action: PayloadAction<SubmittedItemAnswer>) => {
      const answeredQuestion = action.payload;

      const subCategoryExists = state.answeredQuizzes.find(
        (quiz) => quiz.subCategory === state.subCategory
      );

      if (subCategoryExists) {
        subCategoryExists.questions.push(answeredQuestion);
      } else {
        state.answeredQuizzes.push({
          category: state.category,
          subCategory: state.subCategory,
          questions: [answeredQuestion],
        });
      }
      if (firebaseManager.user?.uid) {
        firebaseManager.handleUpdateDoc(
          'quizzes',
          quizCollectionTypes.users,
          firebaseManager.user?.uid,
          state.answeredQuizzes
        );
      }
    },
  },
});

export const { setQuiz, setCategories, submitAnswer } = quizSlice.actions;

export default quizSlice.reducer;
