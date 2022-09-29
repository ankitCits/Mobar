import { LongFloatNumberCSSPropertyValidator } from '@native-html/css-processor/lib/typescript/validators/LongFloatNumberCSSPropertyValidator';
import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { applyCoupon, cartCheckout, fetchCart } from '../../api/product';
import CartProduct from '../../Component/CartProduct';
import FullPageLoader from '../../Component/FullPageLoader';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
import HeaderSide from '../Component/HeaderSide';
export default class MyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      hostUrl: '',
      amountData: {},
      totalQty: 0,
      payableTotal: 0,
      isLoading: false,
      cartLoader:false,
      couponText: '',
      couponLoader: false,
      checkoutLoader: false,
      isFetching: false
    };

  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.fetchData();
    this.setState({ isLoading: false });

  }

  cartLoader=(isLoader)=>{
    // this.setState({cartLoader:isLoader});
    console.log("My card > cartLoader > Item > ",isLoader);
  }


  fetchData = async () => {
    try {
      const resp = await fetchCart();
      this.setState({
        cart: resp.response.result.data,
        hostUrl: resp.response.result.hostUrl,
        amountData: resp.response.result.amountData,
        totalQty: 0,
        isFetching: false
      });
      if (this.state.cart.length > 0) {
        this.setState({ totalQty: this.state.cart.length });
      }
    } catch (error) {
      this.setState({ isLoading: false, isFetching: false });
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  onChange = (item) => {
    if (item.qty == 0) {
      this.state.cart.filter(x => {
        if (x.cartId == item.id) {
          x.qty = parseInt(item.qty)
        }
      });
      const length = this.state.cart.filter(x => x.qty != 0).length;
      this.setState({ cart: this.state.cart, totalQty: length });
    }
    this.setState({ amountData: item.data });
  }

  applyCoupon = async () => {
    this.setState({ couponLoader: true });
    if (this.state.couponText != '') {
      const payload = {
        coupon: this.state.couponText,
      }
      try {
        const respCoupon = await applyCoupon(payload);
        console.log(respCoupon.response.result);
        this.setState({ amountData: respCoupon.response.result.data, couponLoader: false })
      } catch (e) {
        Alert.alert('Error', e);
      }
    } else {
      Alert.alert('Error', 'Promocode cannot be empty');
      this.setState({ couponLoader: false })
    }
  }

  cartCheckout = async () => {
    this.setState({ checkoutLoader: true })
    const payload = {
      couponCode: this.state.couponText,
      subTotalAmount: this.state.amountData.subTotalAmount,
      couponDiscountAmount: this.state.amountData.couponDiscount,
      discountAmount: this.state.amountData.extraDiscount,
      totalPayable: this.state.amountData.totalPayable,
    }
    try {
      const respCheckout = await cartCheckout(payload);
      const result = respCheckout.response.result.data;
      this.props.navigation.navigate('Checkout', { orderDetails: result, checkoutLoader: false })
      this.setState({ checkoutLoader: false })
    } catch (e) {
      Alert.alert('Error', e);
      this.setState({ checkoutLoader: false })
    }
  }

  render() {
    return (
      <SafeAreaView
        style={styles.container}>
        <HeaderSide
          name={'My Cart'}
          onClick={() => this.props.navigation.pop()}
        />
      
        {this.state.isLoading ?
          <>
            <ThemeFullPageLoader />
          </>
          :
          (<>
            <View style={styles.cartCount}>
              <Text
                style={styles.itemCountText}>
                {this.state.totalQty} items in your cart
              </Text>
            </View>

            <View style={{ height: '54%' }}>
            {/* {this.state.cartLoader &&
          <>
          
            <FullPageLoader />
          
          </>
          
          
          } */}
              <ScrollView>
                {
                  this.state.cart && this.state.cart.length > 0 && this.state.cart.map((cartItem, index) => (
                    cartItem.qty != 0 ?
                      <CartProduct navigation={this.props.navigation} onCart={(item)=>{this.cartLoader(item)}} index={index} item={cartItem} hostUrl={this.state.hostUrl} onChange={(item, qty) => { this.onChange(item) }} /> :
                      null
                  ))
                }
              </ScrollView>
            </View>


            <View style={styles.bottomContainer}>
              <View
                style={styles.subContainer}>
                <View
                  style={styles.containerAlign}>
                  <View
                    style={styles.promoContainer}>
                    <TextInput
                      style={styles.promoText}
                      placeholder="Promocode"
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => this.setState({ couponText: text })}
                    />

                    <TouchableOpacity
                      style={{
                        backgroundColor: '#751A2A',
                        width: 120,
                        height: 36,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() => this.applyCoupon()}
                      disabled={this.state.couponLoader}
                    >
                      {this.state.couponLoader ?
                        (
                          <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                          <Text
                            style={{
                              fontFamily: FontFamily.TAJAWAL_REGULAR,
                              fontWeight: '700',
                              fontSize: 20,
                              color: ThemeColors.CLR_WHITE,
                            }}>
                            Apply
                          </Text>
                        )
                      }
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 10,
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="redeem"
                    size={22}
                    color="#A39B9B"
                    style={styles.imageStyle}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                    }}>
                    Do you have any promocode?
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#3C3C3C',
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    Sub Total
                  </Text>
                  <Text
                    style={{
                      marginRight: 40,
                      color: '#3C3C3C',
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    ${this.state.amountData.subTotalAmount}
                  </Text>
                </View>

                {this.state.amountData.couponDiscount > 0 &&
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginLeft: 30,
                        color: '#3C3C3C',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      Coupon Discount
                    </Text>
                    <Text
                      style={{
                        marginRight: 40,
                        color: '#F01111',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      -${this.state.amountData.couponDiscount}
                    </Text>
                  </View>
                }
                {this.state.amountData.extraDiscount > 0 &&
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginLeft: 30,
                        color: '#3C3C3C',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      Discount
                    </Text>
                    <Text
                      style={{
                        marginRight: 40,
                        color: '#F01111',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      -${this.state.amountData.extraDiscount}
                    </Text>
                  </View>
                }

                <View
                  style={{
                    height: 1,
                    backgroundColor: '#000',
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                />

                <View
                  style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginLeft: 30,
                      color: '#000',
                      fontWeight: '700',
                      fontSize: 18,
                    }}>
                    Total Payable
                  </Text>
                  <Text
                    style={{
                      marginRight: 40,
                      color: '#000',
                      fontWeight: '700',
                      fontSize: 18,
                    }}>
                    ${this.state.amountData.totalPayable}
                  </Text>
                </View>

                <View style={{ marginTop: '1%', marginBottom: 10 }}>
                  {/* {this.state.totalQty > 0 &&  */}
                  <TouchableOpacity
                    style={styles.save}
                    onPress={() => this.cartCheckout()}
                    disabled={!this.state.totalQty}
                  >
                    {this.state.checkoutLoader ?
                      (
                        <ActivityIndicator size="small" color="#ffffff" />
                      ) : (
                        <Text style={{ color: '#fff', fontSize: 18 }}>CHECKOUT</Text>
                      )
                    }
                  </TouchableOpacity>
                  {/* } */}
                </View>
              </View>
            </View>
          </>
          )
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.CLR_BG,
  },
  cartCount: {
    zIndex:0,
    marginHorizontal: 14,
    marginVertical: 8,
    marginBottom: 0,
  },
  itemCountText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 16,
    fontWeight: '400',
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
  },
  bottomContainer: {
    // marginTop: 10,
    flex:1,
    justifyContent: 'flex-end',
    // backgroundColor:"red"
    //height:90,
  },
  subContainer: {
    shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: ThemeColors.CLR_WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  containerAlign: {
    marginTop: 20,
    alignSelf: 'center',
  },
  promoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DADADA',
    width: 306,
    height: 44,
    borderRadius: 20,
  },
  promoText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 20,
    fontWeight: '400',
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: '13%',
    width: 200
  },
  productView: {
    backgroundColor: '#fff',
    height: 100,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderRadius: 12,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  productInnerView: {
    // backgroundColor: '#fff',
    height: 100,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
});
