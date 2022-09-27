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
import { getNotification } from '../../../api/common';
const Tab = createMaterialTopTabNavigator();

class MyTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:this.props.data
    };
    //console.log("prop name",this.state.data);
  }

  render() {
    //const data = this.state.data ?  this.state.data.all : [];
    return (
      <Tab.Navigator
        allowFontScaling={false}
        initialRouteName="All"
        tabBar={props => <MyTabBar {...props} />}
        >
          <Tab.Screen name="All" 
           children={props => <AllNotification data={this.state.data.all} {...props} /> }
           />
        <Tab.Screen name="Drinks" 
        children={props => <Drinks data={this.state.data.drink} {...props} /> }
        />
        <Tab.Screen name="Bars" 
        children={props => <Bars data={this.state.data.bar} {...props} /> }
        />
        <Tab.Screen name="Promotions" 
        children={props => <Promotions data={this.state.data.promotion} {...props} /> }
        />
      </Tab.Navigator>
    );
  }
}

export default MyTabs;
