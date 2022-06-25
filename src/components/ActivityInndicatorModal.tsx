/* eslint-disable react-hooks/exhaustive-deps */
import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { StyleSheet } from 'react-native';

import { height, width } from '../constants/Layout';
import LottieLoader from './LottieLoader';
import { View } from './Themed';

function ActivityIndicatorModal({ isLoading = false, viewStyle = {} }) {
  const headerHeight = useHeaderHeight();

  if (!isLoading) {
    return null;
  }

  return (
    <View style={[styles.modalBackground, { height: height - headerHeight }, viewStyle]}>
      <LottieLoader />
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 99999,
  },
});

export default ActivityIndicatorModal;
