import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import images from '../utils/Images';

type Props = {
  style?: StyleProp<ViewStyle>;
};

function LottieLoader(props: Props) {
  const { style } = props;
  return <AnimatedLottieView autoPlay style={[styles.loader, style]} source={images.loader} />;
}

const styles = StyleSheet.create({
  loader: {
    width: 150,
    height: 150,
  },
});

export default LottieLoader;
