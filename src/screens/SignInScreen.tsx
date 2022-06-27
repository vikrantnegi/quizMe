import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import Button from '../components/Button';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import firebaseManager, { AuthEventError } from '../firebase';

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const signInError = (error: AuthEventError) => {
    setValue({
      ...value,
      error: error.message,
    });
    setLoading(false);
  };

  const onSignInSuccess = () => {
    isMounted.current && setLoading(false);
  };

  function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }
    setLoading(true);
    firebaseManager.signInUsingEmail(value.email, value.password, onSignInSuccess, signInError);
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
        <Button title="Sign in" onPress={signIn} loading={loading} />
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
