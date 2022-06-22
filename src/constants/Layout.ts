import { Dimensions } from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const counterCircleSize = width * 0.1;
export const isSmallDevice = width < 375;
