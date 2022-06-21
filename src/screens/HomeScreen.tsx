import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { HomeStackScreenProps } from "../navigation/types";
import data from "../assets/data.json";
import QuizCard from "../components/QuizCard";
import Button from "../components/Button";
import { GlobalStyles } from "../utils/GlobalStyles";

export default function HomeScreen({
  navigation,
}: HomeStackScreenProps<"Home">) {
  const renderItem = ({ item, index }) => {
    return <QuizCard item={item} index={index} />;
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
      <View style={GlobalStyles.rowSpaceBetween}>
        <Button
          title={"PREVIOUS"}
          onButtonPress={() => {}}
          viewStyle={styles.btnStyle}
        />
        <Button
          title={"NEXT"}
          onButtonPress={() => {}}
          viewStyle={styles.btnStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    marginHorizontal: 15,
    flex: 1,
  },
});
