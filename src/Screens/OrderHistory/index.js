import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { orderHistory } from '../../api/order';
import images from '../../assets/images';
import NoContentFound from '../../Component/NoContentFound';
import HeaderSide from '../Component/HeaderSide';
export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      loader: true,
      data: null,
      url: null,
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      this.setState({ loader: true })
      const res = await orderHistory();
      this.setState({ url: res.response.result.hostUrl, data: res.response.result.data, loader: false })
    } catch (error) {
      this.setState({ loader: false });
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      console.log('fetchOrders Error', error);
    }
  };

  formatDDMMM = s => {
    var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var b = s.split(/\D/);
    return b[2] + ' ' + months[b[1] - 1];
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={'dark-content'}
        />
        <HeaderSide
          name={'Order History'}
          onClick={() => this.props.navigation.openDrawer()}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.filterView}>
            <View
              style={{
                margin: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity style={styles.filterInnerView}>
                <Icon name="swap-vert" size={28} color="#4D4F50" />
                <Text style={styles.filterInnerText}>Sort</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filterView}>
            <View
              style={{
                margin: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity style={styles.filterInnerView}>
                <Icon name="filter-list-alt" size={24} color="#4D4F50" />
                <Text style={styles.filterInnerText}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state.loader ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size="small" color="#B51D36" />
          </View>
        ) : (
          <View style={{ backgroundColor: '#fff', flex: 1 }}>
            {/* <View style={{margin: 15}}>
              <Text style={styles.productList}>Today</Text>
            </View> */}

            <>
              {this.state.data && this.state.data.length > 0 ? (
                this.state.data.map(item => {
                  return (
                    <>
                      <TouchableOpacity
                        style={styles.productView}
                        onPress={() =>
                          this.props.navigation.navigate('OrderHistoryDetail', { orderData: item, hostUrl: this.state.url })
                        }>
                        <View style={styles.productInnerView}>
                          <Image
                            style={{
                              height: 90,
                              width: 100,
                            }}
                            resizeMode={'cover'}
                            source={{
                              uri: `${this.state.url +
                                item.ecom_bc_order_details[0].productImage
                                }`,
                            }}
                          />
                        </View>

                        <View style={{ margin: 5, marginLeft: 10 }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '700',
                                color: '#4D4F50',
                              }}>
                              Purchase Id :{item.orderNumber}
                            </Text>
                          </View>

                          <View>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#4D4F50',
                                fontWeight: '400',
                              }}>
                              Purchased On : {this.formatDDMMM(item.orderDate)}
                            </Text>
                          </View>

                          <View style={{ marginTop: 10, flexDirection: 'row' }}>
                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: '#B51D36',
                                height: 20,
                                width: 90,
                                borderRadius: 5,
                                flexDirection: 'row',
                              }}>
                              <Image
                                style={styles.orderPercentageImg}
                                resizeMode={'cover'}
                                source={images.orderPercentage}
                                defaultSource={images.orderPercentage}
                              />
                              <Text style={{ marginLeft: 5, fontSize: 12 }}>
                                {item.couponCode}
                              </Text>
                            </View>

                            <Text style={{ marginLeft: 10, fontSize: 13 }}>
                              Applied
                            </Text>
                          </View>
                        </View>
                        <View style={{ marginTop: 5 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              marginLeft: 20,
                              color: '#4D4F50',
                              fontWeight: '400',
                            }}>
                            {item.ecom_bc_order_details[0].productUnitType}
                          </Text>

                          <Text
                            style={{
                              fontSize: 20,
                              marginLeft: 20,
                              color: '#4D4F50',
                              fontWeight: '500',
                              marginTop: 5,
                            }}>
                            ${item.subTotalAmount}
                          </Text>

                          <View
                            style={{
                              backgroundColor: '#26B90E',
                              // height:30,
                              // width:90,
                              // right:15,
                              padding: 5,
                              marginTop: 10,
                              marginLeft: 5,
                              borderRadius: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#fff',
                                fontWeight: '500',
                              }}>
                              Purchased
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </>
                  );
                })
              ) : (
                <NoContentFound title="No Data Found" />
              )}
            </>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  filterView: {
    backgroundColor: '#fff',
    height: 50,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  filterInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterInnerText: {
    marginLeft: 5,
    fontSize: 18,
    color: '#4D4F50',
  },
  productList: {
    color: '#ACACAC',
  },
  productView: {
    backgroundColor: '#fff',
    height: 96,
    width: '97%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  productInnerView: {
    backgroundColor: '#fff',
    height: 96,
    width: '28%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderPercentageImg: {
    width: 16.97,
    height: 17.79,
  },
});
