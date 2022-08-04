import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const width = Dimensions.get('window').width;
import AllNotification from './All';
import Drinks from './Drinks';
import Bars from './Bars';
import Promotions from './Promotions';
import MyTabBar from './TabBar';
const Tab = createMaterialTopTabNavigator();

class MyTabs extends Component {
  render() {
    return (
      <Tab.Navigator
        allowFontScaling={false}
        initialRouteName="All"
        tabBar={props => <MyTabBar {...props} />}
        >
          <Tab.Screen name="All" component={AllNotification} />
        <Tab.Screen name="Drinks" component={Drinks} />
        <Tab.Screen name="Bars" component={Bars} />
        <Tab.Screen name="Promotions" component={Promotions} />
      </Tab.Navigator>
    );
  }
}

export default MyTabs;
