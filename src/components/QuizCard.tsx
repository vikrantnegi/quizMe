import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import data from '../assets/data.json';
import Colors from '../constants/Colors';
import { counterCircleSize, height, width } from '../constants/Layout';
import { submitAnswer } from '../features/quizSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useColorScheme from '../hooks/useColorScheme';
import { Option, QuizItem } from '../types';
import { GlobalStyles } from '../utils/GlobalStyles';
import OptionCell from './OptionCell';
import { Text, View } from './Themed';

type Props = {
  item: QuizItem;
  index: number;
};

const QuizCard = (props: Props) => {
  const { item, index } = props;
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const answers = useAppSelector((state) => state.questions);

  const isQuestionAnswered = answers.some(
    (answer) => answer.question.id === item.id && answer.isQuestionAnswered
  );

  const handleSubmitAnswer = (option: Option) => {
    const answeredQuestion = {
      selectedOptionId: option.id,
      isQuestionAnswered: true,
      question: item,
    };
    !isQuestionAnswered && dispatch(submitAnswer(answeredQuestion));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.questionContainer, { backgroundColor: Colors[colorScheme].tint }]}>
        <View style={styles.countWrapper}>
          <Text>
            {index + 1}/{data.length}
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
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: height / 2,
    padding: 15,
    marginTop: 50,
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
});

export default React.memo(QuizCard);
