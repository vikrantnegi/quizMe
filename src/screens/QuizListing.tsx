import isEmpty from 'lodash.isempty';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ActivityIndicatorModal from '../components/ActivityIndicatorModal';
import QuizListingItem from '../components/QuizListingItem';
import { View } from '../components/Themed';
import { quizCollectionTypes } from '../constants/Constants';
import firebaseManager from '../firebase';
import { HomeStackScreenProps } from '../navigation/types';

const QuizListing = ({ route }: HomeStackScreenProps<'QuizListing'>) => {
  const [quizCategories, setQuizCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const fetchQuizCategories = async () => {
    setLoading(true);
    const data = await firebaseManager.getDoc(quizCollectionTypes.quizzes, route.params.category);
    const quizCategories: string[] = isEmpty(data) ? [] : Object.keys(data ? data : {});
    setQuizCategories(quizCategories.sort());
    setLoading(false);
  };

  const renderItem = ({ item }: { item: string }) => {
    return <QuizListingItem item={item} category={route?.params?.category} />;
  };

  if (loading) {
    return <ActivityIndicatorModal isLoading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={quizCategories}
        renderItem={renderItem}
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

export default QuizListing;
