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
import { TabView, TabBar } from 'react-native-tab-view';
import { ThemeColors } from '../../Theme/ThemeColors';
import { FontFamily } from '../../Theme/FontFamily';
import Drinks from './Tabs/Drinks';
import Bars from './Tabs/Bars';
import { wishlist } from '../../api/wishlist';
import { connect } from 'react-redux';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';

const LazyPlaceholder = ({ route }) => (
  <View>
    <ThemeFullPageLoader />
  </View>
);
class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribe: null,
      loader: false,
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
    this.state._unsubscribe = this.props.navigation.addListener('focus', async () => {
      // do something
      await this.fetchData();
    });

  }

  componentWillUnmount() {
    this.state._unsubscribe();
  }

  componentDidUpdate() {

  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.fetchData();
    this.setState({ refreshing: false });
  }

  fetchData = async () => {
    try {
      const postData = {
        latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : 1.28668,
        longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : 103.853607,
      }
      const response = await wishlist(postData);
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
    if (route.name == 'Drinks') {
      return (
        <ScrollView refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }>
          {!this.state.refreshing &&
            <Drinks data={this.state.data.drinks} hostUrl={this.state.hostUrl} navigation={this.props.navigation} />
          }
        </ScrollView>
      );
    } else {
      return (
        <ScrollView refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }>
          {!this.state.refreshing &&
            <Bars data={this.state.data.bars} hostUrl={this.state.hostUrl} navigation={this.props.navigation} />
          }
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
        </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);

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
  titleText: { fontFamily: FontFamily.ROBOTO_REGULAR, fontSize: 20, color: '#4D4F50', fontWeight: '500' },
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


