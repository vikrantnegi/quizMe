import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { HomeStackScreenProps } from "../navigation/types";
import data from "../assets/data.json";
import layout from "../constants/Layout";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { GlobalStyles } from "../utils/GlobalStyles";

export default function HomeScreen({
  navigation,
}: HomeStackScreenProps<"Home">) {
  const colorScheme = useColorScheme();

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
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

        <View>
          {item.options.map((option, index) => {
            return (
              <TouchableOpacity key={index} style={styles.option}>
                <Text style={styles.textSmall}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countWrapper: {
    aspectRatio: 1,
    width: 50,
    borderRadius: 99999,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    position: "absolute",
    top: -25,
    left: layout.window.width / 2 - 45,
    backgroundColor: "#f4c144",
    ...GlobalStyles.shadow,
  },
  questionContainer: {
    padding: 10,
    paddingBottom: 100,
    paddingTop: 50,
    marginBottom: 20,
    borderRadius: 2,
  },
  item: {
    width: layout.window.width,
    height: layout.window.height / 2,
    padding: 15,
    marginTop: 50,
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
