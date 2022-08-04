import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const width = Dimensions.get('window').width;
import Drinks from './Drinks';
import Bars from './Bars';
import MyTabBar from './TabBar';
import {A_KEY, BASE_URL} from '../../../config';
import {getAccessToken} from '../../../localstorage';
const Tab = createMaterialTopTabNavigator();

class MyTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      data: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let token = await getAccessToken(token);
    console.log("TOKEN=====>",token)
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    var raw = JSON.stringify({
      latitude: 1.28668,
      longitude: 103.853607,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/wishlist/viewWishlist`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.response);
        if (result.response) {
          this.setState({data: result.response.result,loader:false});
        }
        if (result.errors) {
          this.setState({loader: false});
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        console.log('error', error);
        this.setState({loader: false});
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };
  render() {
    return (
      <>
        {this.state.loader && this.state.data == null ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#741728" />
          </View>
        ) : (
          <Tab.Navigator
            allowFontScaling={false}
            initialRouteName="All"
            tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen
              name="Drinks"
              component={Drinks}
              initialParams={this.state.data}
            />
            <Tab.Screen
              name="Bars"
              component={Bars}
              initialParams={this.state.data}
            />
          </Tab.Navigator>
        )}
      </>
    );
  }
}

export default MyTabs;

