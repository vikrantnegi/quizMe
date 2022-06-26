import React from 'react';
import { StyleSheet } from 'react-native';

import Button from '../components/Button';
import { Text, View } from '../components/Themed';
import { AuthStackScreenProps } from '../navigation/types';

const WelcomeScreen = ({ navigation }: AuthStackScreenProps<'Welcome'>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome screen!</Text>
      <View>
        <Button
          title="Sign in"
          viewStyle={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        />
        <Button
          title="Sign up"
          viewStyle={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default WelcomeScreen;
