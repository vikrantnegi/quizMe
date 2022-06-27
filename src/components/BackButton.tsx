import { Feather, Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

export interface Props {
  navigation: any;
}

const BackButton = (props: Props) => {
  const { navigation } = props;

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
      {Platform.OS === 'android' ? (
        <Feather name="arrow-left" size={24} color={Colors.secondaryColor} />
      ) : (
        <Ionicons name="ios-chevron-back-sharp" size={30} color={Colors.secondaryColor} />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(BackButton);
