import * as React from "react";
import {
  Pressable,
  StyleSheet,
  TextStyle,
  Touchable,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import { counterCircleSize, height, width } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import { GlobalStyles } from "../utils/GlobalStyles";
import { Text, View } from "./Themed";
import data from "../assets/data.json";
import { Option, QuizItem } from "../types";

type Props = {
  title: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  onButtonPress: () => void;
};

const Button = (props: Props) => {
  const {
    title,
    viewStyle = {},
    textStyle = {},
    onButtonPress = () => {},
  } = props;

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[styles.container, viewStyle]}
      onPress={onButtonPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
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
    textAlign: "center",
    fontSize: 16,
  },
});

export default React.memo(Button);
