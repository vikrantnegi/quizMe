import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

import images from '../utils/Images';

function LottieLoader() {
  return <AnimatedLottieView autoPlay style={styles.loader} source={images.loader} />;
}

const styles = StyleSheet.create({
  loader: {
    width: 150,
    height: 150,
  },
});

export default LottieLoader;
