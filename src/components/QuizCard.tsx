import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { counterCircleSize, height, width } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import { GlobalStyles } from "../utils/GlobalStyles";
import { Text, View } from "./Themed";
import data from "../assets/data.json";
import { Option, QuizItem } from "../types";
import Button from "./Button";

type Props = {
  item: QuizItem;
  index: number;
};

const QuizCard = (props: Props) => {
  const { item, index } = props;
  const colorScheme = useColorScheme();

  const renderQuizOption = (option: Option) => {
    return (
      <Pressable
        key={option.id}
        style={({ pressed }) => [
          styles.option,
          {
            backgroundColor: pressed ? Colors.selectedColor : "white",
            borderColor: pressed ? Colors.selectedColor : "#444",
          },
        ]}
        onPress={() => {}}
      >
        {({ pressed }) => (
          <Text style={[styles.textSmall, pressed && { color: "#fff" }]}>
            {option.value}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.questionContainer,
          { backgroundColor: Colors[colorScheme].tint },
        ]}
      >
        <View style={styles.countWrapper}>
          <Text>
            {index + 1}/{data.length}
          </Text>
        </View>
        <Text style={styles.text}>{item.question}</Text>
      </View>
      {item.options.map((option: Option) => {
        return renderQuizOption(option);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
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
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    position: "absolute",
    top: -counterCircleSize / 2,
    left: width / 2 - counterCircleSize / 2 - 20,
    backgroundColor: "#f4c144",
    ...GlobalStyles.shadow,
  },
  text: {
    fontSize: 20,
  },

  textSmall: {
    fontSize: 16,
  },
  option: {
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#444",
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
});

export default React.memo(QuizCard);
