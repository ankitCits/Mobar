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
  ScrollView,
  RefreshControl
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
import { wishlist } from '../../api/wishlist';
const LazyPlaceholder = ({ route }) => (
  <View>
    <ThemeFullPageLoader />
  </View>
);
export default class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      data: [],
      hostUrl: null,
      index: 0,
      refreshing: false,
      routes: [
        { key: '1', name: 'Drinks' },
        { key: '2', name: 'Bars' },
      ],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    console.log("Favorites > onRefresh >", this.state.refreshing);
    this.setState({ refreshing: false });
    await this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await wishlist();
      console.log("Wishlist > Pull refresh > fetchData > response", response);
      this.setState({
        data: response.result,
        loader: false,
        hostUrl: response.result.hostUrl
      });
    } catch (error) {
      this.setState({ loader: false });
      console.log("Wishlist > fetchData > Catch", error);
      ToastAndroid.showWithGravity(
        'Unauthorized user',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  _handleIndexChange = index => this.setState({ index });
  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;
  _renderScene = ({ route, jumpTo }) => {
    console.log("Favorite > PullRefresh > Drinks render", this.state.data.drinks);
    if (route.name == 'Drinks') {
      return (
        <ScrollView refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }>
          <Drinks data={this.state.data.drinks} hostUrl={this.state.hostUrl} navigation={this.props.navigation} />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }>
          <Bars data={this.state.data.bars} hostUrl={this.state.hostUrl} navigation={this.props.navigation} />
        </ScrollView>
      );
    }
  };

  render() {
    return (
      <>
        <SafeAreaView
          style={styles.container}
        >
          {/* <ScrollView refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }> */}
          <View>
            <View
              style={styles.headerContainer}>

              <View style={styles.header}>
                <Text style={styles.titleText}>
                  Favourites
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.sectionStyle}>
              <Icon
                name="search"
                size={28}
                color="#A39B9B"
                style={styles.imageStyle}
              />
              <TextInput
                style={styles.searchInput}
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
          {/* 
          <ScrollView refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }> */}
          <View style={styles.tabContainer}>

            {!this.state.loader ?

              <View style={styles.tabView}>

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

                          <View style={styles.tabRow}>
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
          {/* </ScrollView> */}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: { marginLeft: 10 },
  titleText: { fontStyle: FontFamily.ROBOTO_REGULAR, fontSize: 20, color: '#4D4F50', fontWeight: '500' },
  searchContainer: { alignSelf: 'center', marginTop: -5 },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderWidth: 0,
    borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    height: 40,
    width: 360,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
  },
  searchInput: { flex: 1 },
  tabContainer: { flex: 1, marginTop: 10 },
  tabView: { flexDirection: 'row', height: '100%' },
  tabRow: { flexDirection: 'row' },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  selectedTabText: {
    color: ThemeColors.CLR_TAB,
  },
  selectedTabBorder: {
    backgroundColor: '#C11331',
    height: 3,
    width: 100,
    top: '30%',
  },
  tabText: {
    color: '#000000',
  },
  label: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontSize: 18,
    fontWeight: '400',
    color: '#4D4F50'
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


