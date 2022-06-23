import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';

import { quizCollectionTypes, quizTypes } from '../constants/Constants';

const db = getFirestore();

const handleAddDoc = async () => {
  const docRef = doc(db, quizCollectionTypes.quizzes, quizTypes.basicGk);
  await updateDoc(docRef, {
    questions: [],
  });
};

const handleAddQuiz = async () => {
  const docRef = doc(db, quizCollectionTypes.quizzes, quizTypes.basic);
  await updateDoc(docRef, {
    questions: arrayUnion({}),
  });
};
