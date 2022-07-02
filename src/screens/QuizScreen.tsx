import isEmpty from 'lodash.isempty';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ActivityIndicatorModal from '../components/ActivityIndicatorModal';
import Button from '../components/Button';
import QuizCard from '../components/QuizCard';
import WrapperComp from '../components/SafeAreaWraper';
import { Text, View } from '../components/Themed';
import { quizCollectionTypes } from '../constants/Constants';
import firebaseManager from '../firebase/index';
import { useAppSelector } from '../hooks/redux';
import { HomeStackScreenProps } from '../navigation/types';
import { QuizItem } from '../types';
import { GlobalStyles } from '../utils/GlobalStyles';

type RenderItemProps = {
  item: QuizItem;
  index: number;
};

const QuizScreen = ({ route }: HomeStackScreenProps<'Quiz'>) => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const [isPrevDisabled, setPrevDisabled] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const { subCategory, category } = useAppSelector((state) => state);

  const answers =
    useAppSelector(
      (state) => state.answeredQuizzes.find((item) => item.subCategory === subCategory)?.questions
    ) ?? [];

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setLoading(true);
    const data = await firebaseManager.getDoc(quizCollectionTypes.quizzes, category);

    const quiz = {
      id: category,
      questions: isEmpty(data) ? [] : data?.[subCategory],
    };

    setQuizzes(quiz.questions);
    setLoading(false);
  };

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

  const handleNextPress = async () => {
    if (currentIndex.current === quizzes.length - 1) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex.current + 1,
    });
  };

  const handleSubmitPress = () => {
    if (firebaseManager.user?.uid) {
      firebaseManager.handleAddArrayToDoc(
        'quizzes',
        quizCollectionTypes.users,
        firebaseManager.user?.uid,
        {
          category,
          subCategory,
          answers,
        }
      );
    } else {
      console.log('not able to submit quiz');
    }
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      return (
        viewableItems.length &&
        ((currentIndex.current = viewableItems?.[0]?.index),
        setPrevDisabled(currentIndex.current === 0),
        setNextDisabled(currentIndex.current === quizzes.length - 1))
      );
    },
    [quizzes.length]
  );

  if (loading) {
    return <ActivityIndicatorModal isLoading />;
  }

  if (!quizzes.length) {
    return (
      <View style={styles.emptyContainer}>
        <View>
          <Text style={styles.text}>No Quiz Available right now</Text>
          <Button title="Try Again" onPress={fetchQuiz} viewStyle={{ alignSelf: 'center' }} />
        </View>
      </View>
    );
  }

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
          onPress={handlePreviousPress}
          viewStyle={styles.btnStyle}
          disabled={isPrevDisabled}
        />
        <Button
          title={isNextDisabled ? 'SUBMIT' : 'NEXT'}
          onPress={isNextDisabled ? handleSubmitPress : handleNextPress}
          viewStyle={styles.btnStyle}
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

export default WrapperComp(QuizScreen);
