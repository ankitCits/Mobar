import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyBottomTabs from './bottom';
import SplashScreen from 'react-native-splash-screen';
import Dashboard from '../Screens/Dashboard'
import MyProfile from '../Screens/Profile'
import ChangePassword from '../Screens/ChangePassword'
import HelpSupport from '../Screens/HelpSupport';
import About from '../Screens/About';
import OrderHistory from '../Screens/OrderHistory';
import OrderHistoryDetail from '../Screens/OrderHistory/orderHistoryDetail';
import MyCard from '../Screens/MyCard';
import InviteFriends from '../Screens/InviteFriends';
import Checkout from '../Screens/Checkout';
import ProductDetailBars from '../Screens/ProductDetailBars';
import ProductDetailDrinks from '../Screens/ProductDetailDrinks';
import Redeem from '../Screens/Redeem';
import AllBars from '../Screens/AllBars';
import BarList from '../Screens/BarList';
import Notification from '../Screens/Notification';
import SelectBars from '../Screens/SelectBars';
import Product from '../Screens/Product';
const Stack = createStackNavigator();


const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};


const DrawerScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        ...horizontalAnimation
      }}
      options={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        ...horizontalAnimation
      }}
      initialRouteName="MyBottomTabs">
      <Stack.Screen name="MyBottomTabs" component={MyBottomTabs} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="OrderHistoryDetail" component={OrderHistoryDetail} />
      <Stack.Screen name="MyCard" component={MyCard} />
      <Stack.Screen name="InviteFriends" component={InviteFriends} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ProductDetailBars" component={ProductDetailBars} />
      <Stack.Screen name="ProductDetailDrinks" component={ProductDetailDrinks} />
      <Stack.Screen name="Redeem" component={Redeem} />
      <Stack.Screen name="AllBars" component={AllBars} />
      <Stack.Screen name="BarList" component={BarList} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="SelectBars" component={SelectBars} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
};
export default DrawerScreen;
