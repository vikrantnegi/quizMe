/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import LottieLoader from '../components/LottieLoader';
import { View } from '../components/Themed';
import { useAuthentication } from '../hooks/useAuthentication';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { GlobalStyles } from '../utils/GlobalStyles';
import LinkingConfiguration from './LinkingConfiguration';
import { AuthStackParamList, HomeStackParamList } from './types';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { user, isLoading } = useAuthentication();

  const handleNavigation = () => {
    if (isLoading) {
      return (
        <View style={[GlobalStyles.middle, { flex: 1 }]}>
          <LottieLoader />
        </View>
      );
    }
    if (user) {
      return <UserStackScreen />;
    } else {
      return <AuthStackScreen />;
    }
  };

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {handleNavigation()}
    </NavigationContainer>
  );
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

const UserStack = createNativeStackNavigator<HomeStackParamList>();

const UserStackScreen = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <UserStack.Screen name="Home" component={HomeScreen} />
      <UserStack.Screen name="Quiz" component={QuizScreen} />
    </UserStack.Navigator>
  );
};
