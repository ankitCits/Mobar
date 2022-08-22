import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { A_KEY, BASE_URL } from '../../config';
import { getAccessToken } from '../../localstorage';
import { TabView, TabBar } from 'react-native-tab-view';
import { ThemeColors } from '../../Theme/ThemeColors';
import { FontFamily } from '../../Theme/FontFamily';
import Drinks from './Tabs/Drinks';
import Bars from './Tabs/Bars';
const LazyPlaceholder = ({ route }) => (
  <View style={styles.container}>
    <ThemeFullPageLoader />
  </View>
);
export default class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      data: null,
      hostUrl: null,
      index: 0,
      routes: [
        { key: '1', name: 'Drinks' },
        { key: '2', name: 'Bars' },
      ],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let token = await getAccessToken(token);
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
          this.setState({
            data: result.response.result,
            loader: false,
            hostUrl: result.response.result.hostUrl
          });
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
        console.log('error', error);
        this.setState({ loader: false });
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };

  _handleIndexChange = index => this.setState({ index });
  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;
  _renderScene = ({ route, jumpTo }) => {
    if (route.name == 'Drinks') {
      return (
        <Drinks data={this.state.data.drinks} hostUrl={this.state.hostUrl} navigation={this.props.navigation} />
      );
    } else {
      return (
        <Bars data={this.state.data.bars} hostUrl={this.state.hostUrl} navigation={this.props.navigation} />
      );
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 60,
          }}>
          <View
            style={{ margin: 12, flexDirection: 'row', alignItems: 'center' }}>
            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MyBottomTabs')}>
              <Icon name="arrow-back" size={28} color="#4D4F50" />
            </TouchableOpacity> */}

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 20, color: '#4D4F50', fontWeight: '500' }}>
                Favourites
              </Text>
            </View>
          </View>
        </View>

        <View style={{ alignSelf: 'center', marginTop: -5 }}>
          <View style={styles.sectionStyle}>
            <Icon
              name="search"
              size={28}
              color="#A39B9B"
              style={styles.imageStyle}
            />
            <TextInput
              style={{ flex: 1 }}
              placeholder="Search for Drinks..."
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity>
              <Icon
                name={'filter-list'}
                size={22}
                color="#A39B9B"
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          {!this.state.loader ?
            <View style={{ flexDirection: 'row', height: '100%' }}>
              <TabView
                lazy
                navigationState={this.state}
                renderScene={this._renderScene}
                renderLazyPlaceholder={this._renderLazyPlaceholder}
                onIndexChange={this._handleIndexChange}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: ThemeColors.CLR_WHITE }}
                    tabStyle={{ backgroundColor: ThemeColors.CLR_WHITE, }}
                    style={{ backgroundColor: ThemeColors.CLR_WHITE, }}
                    renderLabel={({ route }) => (
                      <>
                        <View style={{ flexDirection: 'row' }}>
                          {route.name == 'Drinks' &&
                            <Icon
                              name={'liquor'}
                              size={22}
                              color="#AC3449"
                              style={styles.iconStyle}
                            />
                          }
                          {route.name == 'Bars' &&
                            <Icon
                              name={'wine-bar'}
                              size={22}
                              color="#AC3449"
                              style={styles.iconStyle}
                            />
                          }
                          <Text
                            style={[styles.label,
                            route.key === props.navigationState.routes[this.state.index].key
                              ? styles.selectedTabText : styles.tabText
                            ]}>
                            {route.name}
                          </Text>
                        </View>
                        {route.key === props.navigationState.routes[this.state.index].key &&
                          <View style={styles.selectedTabBorder} />
                        }
                      </>
                    )}
                    labelStyle={styles.noLabel}
                  />
                )}
              />
            </View>
            :
            <ThemeFullPageLoader />
          }
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderWidth: 0,
    borderColor: '#000',
    height: 40,
    width: 360,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
  },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  selectedTabText: {
    color: ThemeColors.CLR_TAB,
  },
  selectedTabBorder: {
    backgroundColor: ThemeColors.CLR_TAB,
    height: 3,
    top: '30%',
  },
  tabText: {
    color: '#000000',
  },
  label: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontWeight: '400',
  },
  iconStyle: {
    alignSelf: 'center',
    marginRight: 10
  },
  noLabel: {
    display: 'none',
    height: 0,
  },
});


