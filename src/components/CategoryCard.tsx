import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { GlobalStyles } from '../utils/GlobalStyles';
import { Text, View } from './Themed';

type Props = {
  category: string;
};

const CategoryCard = (props: Props) => {
  const { category } = props;
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('Quiz', {
      category,
    });
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={handleOnPress}>
      <Text style={styles.text}>{category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 7.5,
    marginBottom: 15,
    backgroundColor: Colors.tintColorLight,
    borderRadius: 3,
    height: 100,
    ...GlobalStyles.middle,
    ...GlobalStyles.shadow,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default React.memo(CategoryCard);
