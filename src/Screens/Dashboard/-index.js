import React, { Component, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ToastAndroid,
} from 'react-native';
import { SceneMap, TabBar } from 'react-native-tab-view';
import { HPageViewHoc, HScrollView } from 'react-native-head-tab-view';
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header';
import Whiskey from './Tabs/Whiskey';
import Wine from './Tabs/Wine';
import Beer from './Tabs/Beer';
import Cocktail from './Tabs/Cocktails';
import DashboardHead from './Tabs';
import MyTabBar from './Tabs/TabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getAccessToken } from '../../localstorage';
import { A_KEY, BASE_URL, MY_HEADER } from '../../config';
import { connect } from 'react-redux';
import { setUserDetail } from '../../Redux/actions/auth';
import Header from '../Component/Header';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import images from '../../assets/images';
import { colors } from '../../Theme/colors';
import { FontFamily } from '../../Theme/FontFamily';

const initialLayout = { width: Dimensions.get('window').width };

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      loader: true,
      data: null,
      drinkCategory: null,
      routes: [
        { key: 'first', title: 'Whiskey' },
        { key: 'second', title: 'Wine' },
        { key: 'third', title: 'Beer' },
        { key: 'fourth', title: 'Cocktail' },
      ]
    };
  }

  // const [index, setIndex] = useState(0);
  // const [loader, setLoader] = useState(true);
  // const [data, setData] = useState(null);
  // const[routes] = useState([
  //   { key: 'first', title: 'Whiskey' },
  //   { key: 'second', title: 'Wine' },
  //   { key: 'third', title: 'Beer' },
  //   { key: 'fourth', title: 'Cocktail' },
  // ]);

  // const [drinkCategory, setdrinkCategory] = useState(null)


  // useEffect(() => {
  //   getDetail();
  //   getTabDetail();
  // }, [getDetail, getTabDetail]);
  // Fetch Detail on the Basic of Token
  componentDidMount() {
    this.getDetail();
    this.getTabDetail();
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  FirstRoute = () => (
    <HScrollView index={0}>
      <Whiskey data={drinkCategory} {...props} />
    </HScrollView>
  );

  SecondRoute = () => (
    <HScrollView index={1}>
      <Wine data={drinkCategory} {...props} />
    </HScrollView>
  );

  ThirdRoute = () => (
    <HScrollView index={2}>
      <Beer data={drinkCategory} {...props} />
    </HScrollView>
  );

  FourthRoute = () => (
    <HScrollView index={3}>
      <Cocktail data={drinkCategory} {...props} />
    </HScrollView>
  );

  renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
    third: this.ThirdRoute,
    fourth: this.FourthRoute,
  });

  // useEffect(() => {
  //   getDetail();
  //   getTabDetail();
  // }, [getDetail, getTabDetail]);

  getDetail = async () => {
    let token = await getAccessToken(token);
    if (!token) {
      return this.setState({ loader: false });
    }
    fetch(`${BASE_URL}/users/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        Token: token,
        A_Key: A_KEY,
      },
      redirect: 'follow',
    })
      .then(result => result.json())
      .then(responseDetail => {
        if (responseDetail.response) {
          this.state.setState({ data: responseDetail });
          props.dispatch(setUserDetail(responseDetail.response.result.profile));
          // return responseDetail;
        }

        if (responseDetail.errors) {
          this.setState({ loader: false });
          ToastAndroid.showWithGravity(
            responseDetail.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        this.setState({ loader: false });
        ToastAndroid.showWithGravity(
          'Error on SignIn',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        console.log('Error_On_Data_Fetch', error);
      });
  };

  getTabDetail = () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);

    let raw = JSON.stringify({
      vendorId: 4,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/home/homelists`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.response) {
          console.log("GET_TAB", result.response.result.drinkCategory)
          setdrinkCategory(result.response.result)
          this.setState({ loader: false });
        }
        if (result.errors) {
          this.setState({ loader: false });
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        this.setState({ loader: false });
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        console.log('Error_On_Data_Fetch', error);
      });
  };

  indexChange = (index) => {
    console.log(index)
    // (index) => this.setState({ index: index })
  }


  render() {



    return (
      <>
        {this.state.loader ? (
          <ThemeFullPageLoader />
        ) : (
          <>
            <View>
              <Header
                onClick={() => props.navigation.openDrawer()}
                onCard={() => props.navigation.navigate('MyCard')}
                onNotification={() => props.navigation.navigate('Notification')}
                IconName="account-circle"
                IconColor="#711323"
                Address={'Duxten Road, 338750'}
              />
            </View>

            <CollapsibleHeaderTabView
              makeHeaderHeight={() => 200}
              renderScrollHeader={() => <DashboardHead {...props} />}
              navigationState={[this.state.index, this.state.routes]}
              renderScene={this.renderScene}
              onIndexChange={this.indexChange(index)}
              initialLayout={initialLayout}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: colors.CLR_WHITE }}
                  style={{

                  }}
                  tabStyle={{ backgroundColor: colors.CLR_WHITE, }}
                  renderLabel={({ route }) => (
                    <>
                      <Text
                        style={[styles.label,
                        route.key === props.navigationState.routes[index].key
                          ? styles.selectedTabText
                          : styles.tabText
                        ]}>
                        {route.title}
                      </Text>
                      {route.key === props.navigationState.routes[index].key ? (
                        <View
                          style={styles.selectedTabBorder}
                        />
                      ) : null}
                    </>
                  )}
                  labelStyle={styles.noLabel}
                />
              )}
            />

          </>
        )}
      </>
    );
  }
}

// dispatcher functions
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

//getting props from redux
function mapStateToProps(state) {
  let redux = state;
  return { redux };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  // tabStyle:{
  //   // backgroundColor: 'yellow',
  //   //               shadowColor: 'red',
  //   //               shadowOffset: {
  //   //                 width: 0,
  //   //                 height: 0,
  //   //               },
  //   //               elevation: 1,
  //                 //backgroundColor: 'red',
  //                 // // borderBottomLeftRadius: 20,
  //                 // // borderBottomRightRadius: 20,
  //                 // overflow: 'hidden',
  //                 // bottom: 1,
  // },
  noLabel: {
    display: 'none',
    height: 0,
  },
  selectedTabText: {
    color: colors.CLR_TAB,
  },
  selectedTabBorder: {
    backgroundColor: colors.CLR_TAB,
    height: 3,
    top: '30%',
  },
  tabText: {
    color: '#000000',
  },
  label: {
    fontSize: 15,
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontWeight: '400',
  },
});
