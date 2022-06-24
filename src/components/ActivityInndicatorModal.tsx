/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import { height, width } from '../constants/Layout';

function ActivityIndicatorModal({ isLoading = false, viewStyle = {} }) {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={[styles.modalBackground, viewStyle]}>
      <ActivityIndicator size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 99999,
  },
});

export default ActivityIndicatorModal;
