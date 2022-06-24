import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { useAppSelector } from '../hooks/redux';
import { Option, QuizItem } from '../types';
import { Text } from './Themed';

type Props = {
  option: Option;
  item: QuizItem;
  handleSubmitAnswer: (option: Option) => void;
};

const OptionCell = (props: Props) => {
  const { option, item, handleSubmitAnswer } = props;
  const answers = useAppSelector((state) => state.questions);
  const optionSelectedId = answers
    .filter((answer) => answer.question.id === item.id)
    .find((answer) => answer.question.id === item.id)?.selectedOptionId;

  const optionSelected = optionSelectedId === option.id;
  const correctOptionSelected = optionSelectedId === option.id && option.id === item.answer.id;

  return (
    <Pressable
      key={option.id}
      style={({ pressed }) => [
        styles.option,
        pressed && styles.pressedStyle,
        optionSelected && styles.incorrectStyle,
        correctOptionSelected && styles.selectedStyle,
      ]}
      onPress={() => handleSubmitAnswer(option)}>
      {({ pressed }) => (
        <Text
          style={[
            styles.textSmall,
            (pressed || optionSelected || correctOptionSelected) && styles.selectedTextStyle,
          ]}>
          {option.value}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#444',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  selectedStyle: {
    backgroundColor: Colors.selectedColor,
    borderColor: Colors.selectedColor,
  },
  incorrectStyle: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
  },
  textSmall: {
    fontSize: 16,
  },
  selectedTextStyle: {
    color: '#fff',
  },
  pressedStyle: {
    backgroundColor: Colors.tintColorLight,
    borderColor: Colors.tintColorLight,
  },
});

export default React.memo(OptionCell);
