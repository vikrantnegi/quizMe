import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ActivityIndicatorModal from '../components/ActivityIndicatorModal';
import Button from '../components/Button';
import CategoryCard from '../components/CategoryCard';
import { Text, View } from '../components/Themed';
import { quizCollectionTypes } from '../constants/Constants';
import firebaseManager from '../firebase';

const HomeScreen = () => {
  const [quizCategories, setQuizCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const fetchQuizCategories = async () => {
    setLoading(true);
    const quizCollectionSnapshot = await firebaseManager.getAllDocFromCollection(
      quizCollectionTypes.quizzes
    );
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

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Hi {firebaseManager.user?.email?.split('@').shift()}</Text>
      </View>
    );
  };

  const handleSignOut = () => {
    firebaseManager.signOut();
  };

  if (loading) {
    return <ActivityIndicatorModal isLoading />;
  }

  return (
    <View style={styles.container}>
      {firebaseManager.user && renderHeader()}
      <FlatList
        data={quizCategories}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ marginHorizontal: 7.5 }}
      />
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
  headerContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  heading: {
    fontSize: 24,
  },
});

export default HomeScreen;
