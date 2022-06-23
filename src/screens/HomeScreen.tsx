import { update } from 'firebase/database';
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Button from '../components/Button';
import CategoryCard from '../components/CategoryCard';
import QuizCard from '../components/QuizCard';
import { Text, View } from '../components/Themed';
import { quizCollectionTypes } from '../constants/Constants';
import { HomeStackScreenProps } from '../navigation/types';
import { QuizItem } from '../types';
import { GlobalStyles } from '../utils/GlobalStyles';

const HomeScreen = ({ navigation }: HomeStackScreenProps<'Home'>) => {
  const [quizCategories, setQuizCategories] = useState<string[]>([]);
  const db = getFirestore();

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const fetchQuizCategories = async () => {
    const quizCollectionSnapshot = await getDocs(collection(db, quizCollectionTypes.quizzes));
    const quizCategories: string[] = [];
    quizCollectionSnapshot.forEach((doc) => {
      return quizCategories.push(doc.id);
    });
    setQuizCategories(quizCategories);
  };

  const renderItem = ({ item }: { item: string }) => {
    return <CategoryCard category={item} />;
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={quizCategories}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{ marginHorizontal: 7.5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
});

export default HomeScreen;
