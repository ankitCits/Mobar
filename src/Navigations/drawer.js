import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen'
import ScreenStack from './stack'
import SideDrawer from '../SideDrawer'
const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  useEffect(()=>{
    SplashScreen.hide();
  })
  return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#fff',
            width: '85%',
            },
        }}
        
        drawerContent={props => <SideDrawer {...props} />}
        >
        <Drawer.Screen name="ScreenStack" component={ScreenStack} />
      </Drawer.Navigator>
  );
};
export default DrawerScreen;
