import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ActivityIndicatorModal from '../components/ActivityInndicatorModal';
import CategoryCard from '../components/CategoryCard';
import { View } from '../components/Themed';
import { quizCollectionTypes } from '../constants/Constants';
import firebaseManager from '../firebase';
import { HomeStackScreenProps } from '../navigation/types';

const HomeScreen = ({ navigation }: HomeStackScreenProps<'Home'>) => {
  const [quizCategories, setQuizCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const fetchQuizCategories = async () => {
    setLoading(true);
    const quizCollectionSnapshot = await firebaseManager.getCollection(quizCollectionTypes.quizzes);
    const quizCategories: string[] = [];
    quizCollectionSnapshot.forEach((doc) => {
      return quizCategories.push(doc.id);
    });
    setLoading(false);
    setQuizCategories(quizCategories);
  };

  const renderItem = ({ item }: { item: string }) => {
    return <CategoryCard category={item} />;
  };

  if (loading) {
    return <ActivityIndicatorModal isLoading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={quizCategories}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ marginHorizontal: 7.5 }}
      />
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
