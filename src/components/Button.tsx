import * as React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import Colors from '../constants/Colors';
import { NetWorkStatusConsumer } from '../context/NetworkContext';
import { Text } from './Themed';

export interface Props extends TouchableOpacityProps {
  title: string;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  type?: 'solid' | 'outlined';
  loading?: boolean;
  loadingProps?: ActivityIndicatorProps;
}

const defaultLoadingProps = (type: 'solid' | 'outlined'): ActivityIndicatorProps => ({
  color: type === 'solid' ? 'white' : Colors.secondaryColor,
  size: 'small',
});

const Button = (props: Props) => {
  const {
    title,
    viewStyle = {},
    textStyle = {},
    onPress = () => {},
    disabled = false,
    type = 'solid',
    loading = false,
    loadingProps: passedLoadingProps,
  } = props;

  const handleOnPress = React.useCallback(
    (evt, isConnectionAvailable) => {
      if (!isConnectionAvailable) {
        return showMessage({
          message: 'No Internet Available',
          description: 'Make sure Wi-Fi mobile data is turned on',
        });
      }
      if (!loading && !disabled && isConnectionAvailable) {
        onPress(evt);
      }
    },
    [disabled, loading, onPress]
  );

  const loadingProps: ActivityIndicatorProps = React.useMemo(
    () => ({
      ...defaultLoadingProps(type),
      ...passedLoadingProps,
    }),
    [passedLoadingProps, type]
  );

  return (
    <NetWorkStatusConsumer>
      {(value) => (
        <TouchableOpacity
          {...props}
          activeOpacity={0.8}
          style={StyleSheet.flatten([
            styles.container,
            {
              backgroundColor: type === 'solid' ? Colors.secondaryColor : 'transparent',
              borderWidth: type === 'outlined' ? 1 : 0,
              borderColor: Colors.secondaryColor,
            },
            disabled &&
              type === 'solid' && {
                backgroundColor: Colors.disabledStyle,
              },
            viewStyle,
            disabled && styles.disabled,
          ])}
          onPress={(evt) => handleOnPress(evt, value)}
          disabled={disabled}>
          {!loading && (
            <Text
              style={StyleSheet.flatten([
                styles.text,
                { color: type === 'solid' ? '#fff' : Colors.secondaryColor },
                textStyle,
                disabled && styles.textDisabled,
              ])}>
              {title}
            </Text>
          )}
          {loading && (
            <ActivityIndicator
              color={loadingProps.color}
              size={loadingProps.size}
              {...loadingProps}
            />
          )}
        </TouchableOpacity>
      )}
    </NetWorkStatusConsumer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 4,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: Colors.disabledStyle,
    opacity: 0.4,
  },
  textDisabled: {
    color: '#fff',
  },
});

export default React.memo(Button);
