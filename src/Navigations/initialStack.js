import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  ActivityIndicator,
  View,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import createAccount from '../Screens/Auth/createAccount';
import VerifyOtp from '../Screens/Auth/verifyOtp';
import SignIn from '../Screens/Auth/signIn';
import Drawer from './drawer';
import Dashboard from '../Screens/Dashboard';
import ForgetPassword from '../Screens/ForgetPassword';
import forgetPasswordOtp from '../Screens/ForgetPassword/forgetPasswordOtp';
import ForgetEnterPassword from '../Screens/ForgetPassword/forgetEnterPassword';
import passwordSuccessFullyChanged from '../Screens/ForgetPassword/passwordSuccessFullyChanged';
import { getAccessToken } from '../localstorage';
const Stack = createStackNavigator();

const InitialStack = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}>
          
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="createAccount" component={createAccount} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="forgetPasswordOtp" component={forgetPasswordOtp} />
        <Stack.Screen
          name="ForgetEnterPassword"
          component={ForgetEnterPassword}
        />
        <Stack.Screen
          name="passwordSuccessFullyChanged"
          component={passwordSuccessFullyChanged}
        />
        <Stack.Screen name="Drawer" component={Drawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default InitialStack;
