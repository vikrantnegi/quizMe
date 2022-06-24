import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import CategoryCard from '../components/CategoryCard';
import { View } from '../components/Themed';
import { quizCollectionTypes } from '../constants/Constants';
import firebaseManager from '../firebase';
import { HomeStackScreenProps } from '../navigation/types';

const HomeScreen = ({ navigation }: HomeStackScreenProps<'Home'>) => {
  const [quizCategories, setQuizCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const fetchQuizCategories = async () => {
    const quizCollectionSnapshot = await firebaseManager.getCollection(quizCollectionTypes.quizzes);
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
