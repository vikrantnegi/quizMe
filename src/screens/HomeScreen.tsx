import { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../components/Themed";
import { HomeStackScreenProps } from "../navigation/types";
import data from "../assets/data.json";
import QuizCard from "../components/QuizCard";
import Button from "../components/Button";
import { GlobalStyles } from "../utils/GlobalStyles";
import { QuizItem } from "../types";

type RenderItemProps = {
  item: QuizItem;
  index: number;
};

export default function HomeScreen({
  navigation,
}: HomeStackScreenProps<"Home">) {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const [isPrevDisabled, setPrevDisabled] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(false);

  const renderItem = ({ item, index }: RenderItemProps) => {
    return <QuizCard item={item} index={index} />;
  };

  const handlePreviousPress = () => {
    if (currentIndex.current === 0) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex.current - 1,
    });
  };

  const handleNextPress = () => {
    if (currentIndex.current === data.length - 1) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex.current + 1,
    });
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    viewableItems.length &&
      ((currentIndex.current = viewableItems?.[0]?.index),
      setPrevDisabled(currentIndex.current === 0),
      setNextDisabled(currentIndex.current === data.length - 1));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        renderItem={renderItem}
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
      />
      <View style={GlobalStyles.rowSpaceBetween}>
        <Button
          title={"PREVIOUS"}
          onButtonPress={handlePreviousPress}
          viewStyle={styles.btnStyle}
          disabled={isPrevDisabled}
        />
        <Button
          title={"NEXT"}
          onButtonPress={handleNextPress}
          viewStyle={styles.btnStyle}
          disabled={isNextDisabled}
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
