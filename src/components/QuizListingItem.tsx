import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { setSubCategory } from '../features/quizSlice';
import { useAppDispatch } from '../hooks/redux';
import { HomeStackScreenProps } from '../navigation/types';
import { GlobalStyles } from '../utils/GlobalStyles';
import { Text } from './Themed';

type Props = {
  item: string;
};

const QuizListingItem = (props: Props) => {
  const { item } = props;
  const navigation = useNavigation<HomeStackScreenProps<'QuizListing'>['navigation']>();
  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    navigation.navigate('Quiz');
    dispatch(setSubCategory(item));
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={handleOnPress}>
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: Colors.tintColorLight,
    borderRadius: 3,
    paddingVertical: 15,
    ...GlobalStyles.middle,
    ...GlobalStyles.shadow,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default React.memo(QuizListingItem);
