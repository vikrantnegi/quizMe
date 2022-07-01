import isEmpty from 'lodash.isempty';
import React from 'react';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { counterCircleSize, height, width } from '../constants/Layout';
import { submitAnswer } from '../features/quizSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Option, QuizItem, SubmittedItemAnswer } from '../types';
import { GlobalStyles } from '../utils/GlobalStyles';
import OptionCell from './OptionCell';
import { Text, View } from './Themed';

type Props = {
  item: QuizItem;
  index: number;
  quizzes: QuizItem[];
  subCategory: string;
};

const QuizCard = (props: Props) => {
  const { item, index, quizzes, subCategory } = props;
  const dispatch = useAppDispatch();
  const answers =
    useAppSelector(
      (state) => state.answeredQuizzes.find((item) => item.subCategory === subCategory)?.questions
    ) ?? [];

  const isQuestionAnswered = answers.some(
    (answer: SubmittedItemAnswer) => answer.question.id === item.id && answer.isQuestionAnswered
  );

  const handleSubmitAnswer = (option: Option) => {
    const answeredQuestion = {
      subCategory,
      selectedOptionId: option.id,
      isQuestionAnswered: true,
      question: item,
    };
    !isQuestionAnswered && dispatch(submitAnswer(answeredQuestion));
  };

  const renderNote = () => {
    const showNote = !isEmpty(item?.knowMore) && isQuestionAnswered;
    const showLink = Boolean(item?.knowMore?.link);
    const showDescription = Boolean(item?.knowMore?.description);

    if (showNote) {
      return (
        <View style={styles.footer}>
          {showLink && (
            <TouchableOpacity onPress={onLinkPress}>
              <Text style={styles.textNote}>
                Know More:
                <Text style={GlobalStyles.linkStyle}> {item.knowMore.link}</Text>
              </Text>
            </TouchableOpacity>
          )}
          {showDescription && <Text style={styles.textNote}>{item.knowMore.description}</Text>}
        </View>
      );
    } else {
      return null;
    }
  };

  const onLinkPress = () => {
    Linking.openURL(item.knowMore.link);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.questionContainer, { backgroundColor: Colors.tintColorLight }]}>
        <View style={styles.countWrapper}>
          <Text>
            {index + 1}/{quizzes.length}
          </Text>
        </View>
        <Text style={styles.text}>{item.question}</Text>
      </View>
      {item.options.map((option: Option) => {
        return (
          <OptionCell
            key={option.id}
            option={option}
            item={item}
            handleSubmitAnswer={handleSubmitAnswer}
            subCategory={subCategory}
          />
        );
      })}
      {renderNote()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: height / 2,
    padding: 15,
    marginTop: counterCircleSize / 2,
  },
  questionContainer: {
    paddingHorizontal: 20,
    paddingTop: counterCircleSize,
    marginBottom: 20,
    borderRadius: 2,
    minHeight: 180,
  },
  countWrapper: {
    aspectRatio: 1,
    width: counterCircleSize,
    borderRadius: 99999,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    top: -counterCircleSize / 2,
    left: width / 2 - counterCircleSize / 2 - 20,
    backgroundColor: '#f4c144',
    ...GlobalStyles.shadow,
  },
  text: {
    fontSize: 20,
  },
  textNote: {
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
  },
});

export default React.memo(QuizCard);
