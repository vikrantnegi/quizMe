import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  TextStyle,
  Touchable,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Colors from '../constants/Colors';
import { Text } from './Themed';

type Props = {
  title: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  onButtonPress: () => void;
  disabled?: boolean;
};

const Button = (props: Props) => {
  const {
    title,
    viewStyle = {},
    textStyle = {},
    onButtonPress = () => {},
    disabled = false,
  } = props;

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[styles.container, viewStyle, disabled && styles.disabled]}
      onPress={onButtonPress}
      disabled={disabled}>
      <Text style={[styles.text, textStyle, disabled && styles.textDisabled]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 4,
  },
  text: {
    color: Colors.tintColorLight,
    textAlign: 'center',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: Colors.disabledStyle,
    opacity: 0.4,
  },
  textDisabled: {
    color: '#fff',
  },
});

export default React.memo(Button);
