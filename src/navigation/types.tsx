/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<DrawerParamList>;
  Auth: NavigatorScreenParams<HomeStackParamList>;
};

export type HomeStackParamList = {
  Home: undefined;
  Quiz: { category: string };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  DrawerScreenProps<DrawerParamList>
>;

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  DrawerNavigationProp<DrawerParamList>
>;

export type DrawerParamList = {
  User: NavigatorScreenParams<HomeStackParamList>;
  Profile: undefined;
};
