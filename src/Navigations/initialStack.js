import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
// Components
import createAccount from '../Screens/Auth/createAccount';
import VerifyOtp from '../Screens/Auth/verifyOtp';
import SignIn from '../Screens/Auth/signIn';
import ForgetPassword from '../Screens/ForgetPassword';
import forgetPasswordOtp from '../Screens/ForgetPassword/forgetPasswordOtp';
import ForgetEnterPassword from '../Screens/ForgetPassword/forgetEnterPassword';
import PasswordSuccessFullyChanged from '../Screens/ForgetPassword/passwordSuccessFullyChanged';
import Drawer from './drawer';

const Stack = createStackNavigator();

const InitialStack = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const AuthNavigator = () => (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="createAccount" component={createAccount} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="forgetPasswordOtp" component={forgetPasswordOtp} />
      <Stack.Screen name="ForgetEnterPassword" component={ForgetEnterPassword} />
      <Stack.Screen name="PasswordSuccessFullyChanged" component={PasswordSuccessFullyChanged} />
      <Stack.Screen name="Drawer" component={Drawer} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};
export default InitialStack;
