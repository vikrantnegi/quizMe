import isEmpty from 'lodash.isempty';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ActivityIndicatorModal from '../components/ActivityIndicatorModal';
import Button from '../components/Button';
import QuizListingItem from '../components/QuizListingItem';
import { Text, View } from '../components/Themed';
import { quizCollectionTypes } from '../constants/Constants';
import firebaseManager from '../firebase';
import { useAppSelector } from '../hooks/redux';
import { HomeStackScreenProps } from '../navigation/types';
import { GlobalStyles } from '../utils/GlobalStyles';

const QuizListing = ({ route }: HomeStackScreenProps<'QuizListing'>) => {
  const [quizCategories, setQuizCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const category = useAppSelector((state) => state.quizzes.category);

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const fetchQuizCategories = async () => {
    setLoading(true);
    const data = await firebaseManager.getDoc(quizCollectionTypes.quizzes, category);
    const quizCategories: string[] = isEmpty(data) ? [] : Object.keys(data ? data : {});
    setQuizCategories(quizCategories.sort());
    setLoading(false);
  };

  const renderItem = ({ item }: { item: string }) => {
    return <QuizListingItem item={item} />;
  };

  if (loading) {
    return <ActivityIndicatorModal isLoading />;
  }

  if (!quizCategories.length) {
    return (
      <View style={styles.emptyContainer}>
        <View>
          <Text style={styles.text}>No Quiz Available right now</Text>
          <Button
            title="Try Again"
            onPress={fetchQuizCategories}
            viewStyle={{ alignSelf: 'center' }}
          />
        </View>
      </View>
    );
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
  emptyContainer: {
    flex: 1,
    ...GlobalStyles.middle,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default QuizListing;
