import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, TouchableOpacity } from 'react-native';

import BackButton from '../components/BackButton';
import LottieLoader from '../components/LottieLoader';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';
import { useAuthentication } from '../hooks/useAuthentication';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
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
      return <DrawerStack />;
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

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="User"
      screenOptions={({ navigation }) => ({
        headerLeftContainerStyle: { paddingLeft: 3 },
        headerLeft: () => <BackButton navigation={navigation} />,
        headerBackVisible: true,
      })}>
      <Drawer.Screen options={{ headerShown: false }} name="User" component={UserStackScreen} />
      <Drawer.Screen name="Profile" component={TabTwoScreen} />
    </Drawer.Navigator>
  );
};

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
      <UserStack.Screen
        options={({ navigation }) => ({
          title: 'QuizMe',
          headerLeft: () => (
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu" size={24} color={Colors.secondaryColor} />
            </TouchableOpacity>
          ),
        })}
        name="Home"
        component={HomeScreen}
      />
      <UserStack.Screen name="Quiz" component={QuizScreen} />
    </UserStack.Navigator>
  );
};
