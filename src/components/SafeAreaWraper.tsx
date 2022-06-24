import React, { ComponentType } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { View } from './Themed';

function WrapperComp(ScreenComp) {
  return (props) => {
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View style={[styles.container, insets && { paddingBottom: insets.bottom }]}>
            <ScreenComp {...props} insets={insets} />
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WrapperComp;
