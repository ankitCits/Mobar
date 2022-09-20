import React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dashboard from '../Screens/Dashboard';
import Collections from '../Screens/Collections';
import Favourites from '../Screens/Favourtites';
import Promotions from '../Screens/Promotions';
import images from '../assets/images';
const Tab = createMaterialBottomTabNavigator();

export default function MyBottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor="#711323"
      barStyle={{
        backgroundColor: '#fff',
        borderTopWidth: 2,
        borderColor: '#fff',
        shadowRadius: 2,
        shadowOffset: {
          width: 10,
          height: 100,
        },
        shadowColor: '#000000',
        elevation: 10,
        shadowOpacity: 2.0,
        // height:70,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={28} color={focused ? '#711323' : '#000'} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Collections"
        component={Collections}
        options={{
          tabBarLabel: 'Collections',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="local-bar"
              size={28}
              color={focused ? '#711323' : '#000'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Promotion"
        component={Promotions}
        options={{
          tabBarLabel: 'Promotion',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: !focused ? 20 : 23,
                height: !focused ? 18 : 19,
                marginTop: 5
              }}
              resizeMode={'cover'}
              source={!focused ? images.promotion : images.promotionFill}
              defaultSource={!focused ? images.promotion : images.promotionFill}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: !focused ? 21 : 23,
                height: !focused ? 19 : 19,
                marginTop: 5
              }}
              resizeMode={'cover'}
              source={!focused ? images.heart : images.heartFill}
              defaultSource={!focused ? images.heart : images.heartFill}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
