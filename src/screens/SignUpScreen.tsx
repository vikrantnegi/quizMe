import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import Button from '../components/Button';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { AuthStackScreenProps } from '../navigation/types';

const auth = getAuth();

const SignUpScreen = ({ navigation }: AuthStackScreenProps<'SignUp'>) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('SignIn');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up screen!</Text>
      <View style={styles.controls}>
        <TextInput
          placeholder="Email"
          style={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
        />
        {Boolean(value.error) && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{value.error}</Text>
          </View>
        )}
        <Button title="Sign up" onButtonPress={signUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  controls: {
    flex: 1,
  },
  control: {
    marginBottom: 15,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.red,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  errorText: {
    color: '#fff',
  },
});

export default SignUpScreen;
