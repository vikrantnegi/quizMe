import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Button from '../components/Button';
import QuizCard from '../components/QuizCard';
import { View } from '../components/Themed';
import { quizCollectionTypes } from '../constants/Constants';
import { HomeStackScreenProps } from '../navigation/types';
import { QuizItem } from '../types';
import { GlobalStyles } from '../utils/GlobalStyles';

type RenderItemProps = {
  item: QuizItem;
  index: number;
};

const HomeScreen = ({ navigation }: HomeStackScreenProps<'Home'>) => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const [isPrevDisabled, setPrevDisabled] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const db = getFirestore();

  useEffect(() => {
    fetchDatabase();
  }, []);

  const fetchDatabase = async () => {
    const quizCollectionSnapshot = await getDocs(collection(db, quizCollectionTypes.quizzes));
    quizCollectionSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      setQuizzes(doc.data()?.questions);
    });
  };

  // const handleAddQuiz = async () => {
  //   const docRef = doc(db, quizCollectionTypes.quizzes, quizTypes.basic);
  //   await updateDoc(docRef, {
  //     questions: arrayUnion({}),
  //   });
  // };

  const renderItem = ({ item, index }: RenderItemProps) => {
    return <QuizCard item={item} index={index} quizzes={quizzes} />;
  };

  const handlePreviousPress = () => {
    if (currentIndex.current === 0) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex.current - 1,
    });
  };

  const handleNextPress = () => {
    if (currentIndex.current === quizzes.length - 1) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex.current + 1,
    });
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    return (
      viewableItems.length &&
      ((currentIndex.current = viewableItems?.[0]?.index),
      setPrevDisabled(currentIndex.current === 0),
      setNextDisabled(currentIndex.current === quizzes.length - 1))
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        renderItem={renderItem}
        data={quizzes}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
      />
      <View style={GlobalStyles.rowSpaceBetween}>
        <Button
          title="PREVIOUS"
          onButtonPress={handlePreviousPress}
          viewStyle={styles.btnStyle}
          disabled={isPrevDisabled}
        />
        <Button
          title="NEXT"
          onButtonPress={handleNextPress}
          viewStyle={styles.btnStyle}
          disabled={isNextDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    marginHorizontal: 15,
    flex: 1,
  },
});

export default HomeScreen;
