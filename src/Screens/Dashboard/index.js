import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  ToastAndroid,
  ActivityIndicator,
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
// const HScrollView = HPageViewHoc(ScrollView)
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getAccessToken } from '../../localstorage';
import { A_KEY, BASE_URL, MY_HEADER } from '../../config';
import { connect } from 'react-redux';
import { setUserDetail } from '../../Redux/actions/auth';
import Header from '../Component/Header';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';

const initialLayout = { width: Dimensions.get('window').width };

function Dashboard(props) {
  const [index, setIndex] = useState(0);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState(null);
  const [routes] = useState([
    { key: 'first', title: 'Whiskey' },
    { key: 'second', title: 'Wine' },
    { key: 'third', title: 'Beer' },
    { key: 'fourth', title: 'Cocktail' },
  ]);

  const [drinkCategory, setdrinkCategory] = useState(null)

  const FirstRoute = () => (
    <HScrollView index={0}>
      <Whiskey data={drinkCategory} {...props} />
    </HScrollView>
  );

  const SecondRoute = () => (
    <HScrollView index={1}>
      <Wine data={drinkCategory} {...props} />
    </HScrollView>
  );

  const ThirdRoute = () => (
    <HScrollView index={2}>
      <Beer data={drinkCategory} {...props} />
    </HScrollView>
  );

  const FourthRoute = () => (
    <HScrollView index={3}>
      <Cocktail data={drinkCategory} {...props} />
    </HScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  useEffect(() => {
    getDetail();
    getTabDetail();
  }, [getDetail, getTabDetail]);
  // Fetch Detail on the Basic of Token
  const getDetail = async () => {
    let token = await getAccessToken(token);
    if (!token) {
      return setLoader(false);
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
          setData(responseDetail);
          props.dispatch(setUserDetail(responseDetail.response.result.profile));
          // return responseDetail;
        }

        if (responseDetail.errors) {
          setLoader(false);
          ToastAndroid.showWithGravity(
            responseDetail.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        setLoader(false);
        ToastAndroid.showWithGravity(
          'Error on SignIn',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        console.log('Error_On_Data_Fetch', error);
      });
  };

  const getTabDetail = () => {
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
          setLoader(false);
        }
        if (result.errors) {
          setLoader(false);
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        setLoader(false);
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        console.log('Error_On_Data_Fetch', error);
      });
  };
  return (
    <>
      {loader ? (
        <ThemeFullPageLoader />
      ) : (
        <>
          <View
            style={{
              height: 70,
              backgroundColor: '#fff',
            }}>

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
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: '#711323' }}
                style={{
                  backgroundColor: '#711323',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  // shadowOpacity: 1,
                  // shadowRadius: 10,
                  elevation: 1,
                  backgroundColor: '#fff',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  overflow: 'hidden',
                  bottom: 1,
                }}
                tabStyle={{ backgroundColor: '#fff' }}
                renderLabel={({ route }) => (
                  <>
                    <Text
                      style={
                        route.key === props.navigationState.routes[index].key
                          ? styles.selectedTabTextStyle
                          : styles.label
                      }>
                      {route.title}
                    </Text>
                    {route.key === props.navigationState.routes[index].key ? (
                      <View
                        style={{
                          backgroundColor: '#711323',
                          height: 3,
                          top: '30%',
                        }}
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
  noLabel: {
    display: 'none',
    height: 0,
  },
  selectedTabTextStyle: {
    color: '#711323',
    fontSize: 15,
    fontWeight: '700',
  },
  label: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
});
