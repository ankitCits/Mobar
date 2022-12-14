import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { orderHistory, redeemOrderHistory } from '../../api/order';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { ThemeColors } from '../../Theme/ThemeColors';
import HeaderSide from '../Component/HeaderSide';
import Order from './Tabs/order';
import Redeems from './Tabs/redeem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showToaster } from '../../api/func';

const LazyPlaceholder = ({ route }) => (
  <ThemeFullPageLoader />
);
export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      loader: true,
      data: [],
      redeemOrders: [],
      url: null,
      index: 0,
      routes: [
        { key: '1', name: 'Order' },
        { key: '2', name: 'Redeem' },
      ],
    };
  }

  componentDidMount() {
    this.fetchOrders();
    this.fetchRedeemOrders();
  }

  fetchOrders = async () => {
    try {
      this.setState({ loader: true })
      const res = await orderHistory();
      this.setState({ url: res.response.result.hostUrl, data: res.response.result.data, loader: false })
    } catch (error) {
      this.setState({ loader: false });
      showToaster(error, 'TOP');
      console.log('fetchOrders Error', error);
    }
  };

  fetchRedeemOrders = async () => {
    try {
      this.setState({ loader: true })
      const res = await redeemOrderHistory();
      if (res.response && res.response.result.data && res.response.result.data.length > 0) {
        res.response.result.data.map(item => {
          item.redeemDate = item.date + ' ' + item.time
        });
      }
      this.setState({ url: res.response.result.hostUrl, redeemOrders: res.response.result.data, loader: false })
    } catch (error) {
      this.setState({ loader: false });
      showToaster(error, 'TOP');
      console.log('fetchRedeemOrders Error', error);
    }
  };

  _handleIndexChange = index => this.setState({ index });

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

  _renderScene = ({ route, jumpTo }) => {
    if (route.name == 'Order') {
      return (
        <View style={styles.redeemContainer}>
          <ScrollView>
            <>
              {
                this.state.data &&
                this.state.data.length > 0 &&
                this.state.data.map((item, oIndex) => {
                  return (<Order items={item} hostUrl={this.state.url} index={oIndex} navigation={this.props.navigation} />)
                })
              }
            </>
          </ScrollView>
        </View>

      )
    } else {
      return (
        <View style={styles.redeemContainer}>
          <ScrollView>
            <>
              {
                this.state.redeemOrders &&
                this.state.redeemOrders.length > 0 &&
                this.state.redeemOrders.map((item, index) => {
                  return (<Redeems items={item} index={index} hostUrl={this.state.url} />)
                })
              }
            </>
          </ScrollView>
        </View>
      )
    };
  };

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: ThemeColors.CLR_WHITE }}>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={'dark-content'}
        />
        <HeaderSide
          name={'Order History'}
          onClick={() => this.props.navigation.openDrawer()}
        />


        {this.state.loader ?
          (
            <ThemeFullPageLoader />
          ) :
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
                indicatorStyle={{ backgroundColor: ThemeColors.CLR_WHITE, margin: 0 }}
                tabStyle={{ backgroundColor: ThemeColors.CLR_WHITE, padding: 0, margin: 0 }}
                style={{ backgroundColor: ThemeColors.CLR_BG }}
                renderLabel={({ route }) => (
                  <>
                    <View style={styles.tabRow}>
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
        }

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabRow: { marginHorizontal: 20 },
  selectedTabText: {
    color: ThemeColors.CLR_TAB,
  },
  selectedTabBorder: {
    backgroundColor: '#C11331',
    height: 3,
    top: '30%',
  },
  tabText: {
    color: '#000000',
  },
  redeemContainer: {
    backgroundColor: ThemeColors.CLR_WHITE,
    flex: 1,
    marginBottom: 0
  },
});
