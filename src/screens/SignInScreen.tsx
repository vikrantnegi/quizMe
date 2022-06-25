import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import Button from '../components/Button';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In screen!</Text>
      <View style={styles.controls}>
        <TextInput
          placeholder="Email"
          value={value.email}
          style={styles.control}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <TextInput
          autoCorrect={false}
          placeholder="Password"
          style={styles.control}
          value={value.password}
          autoCapitalize="none"
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry
        />
        {!!value.error && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{value.error}</Text>
          </View>
        )}
        <Button title="Sign in" onButtonPress={signIn} />
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
    padding: 10,
    backgroundColor: Colors.red,
    marginBottom: 10,
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

export default SignInScreen;
