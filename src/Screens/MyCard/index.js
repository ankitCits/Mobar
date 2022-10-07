import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { applyCoupon, cartCheckout, fetchCart, removeFromCart } from '../../api/product';
import { SwipeListView } from 'react-native-swipe-list-view';
import CartProduct from '../../Component/CartProduct';
import FullPageLoader from '../../Component/FullPageLoader';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
import HeaderSide from '../Component/HeaderSide';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

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
      cartLoader: false,
      couponText: '',
      couponLoader: false,
      checkoutLoader: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.fetchData();
    this.setState({ isLoading: false });

  }

  cartLoader = (isLoader) => {
    this.setState({ cartLoader: isLoader });
  }

  fetchData = async () => {
    try {
      const resp = await fetchCart();
      if (resp.response.result && resp.response.result.data.length > 0) {
        resp.response.result.data.map((item, index) => {
          item.key = index + 1
        });
      }
      console.log("fetch cart data > ",resp.response.result.data);
      this.setState({
        cart: resp.response.result.data,
        hostUrl: resp.response.result.hostUrl,
        amountData: resp.response.result.amountData,
        totalQty: 0,
        cartLoader: false,
        isLoading: false,
      });
      if (this.state.cart.length > 0) {
        this.setState({ totalQty: this.state.cart.length });
      }
    } catch (error) {
      this.setState({ isLoading: false, cartLoader: false });
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
      const filterData = this.state.cart.filter(x => x.qty != 0);
      const length = filterData.length;
      this.setState({ cart: filterData, totalQty: length });
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

  deleteFromCart = async (data, rowMap) => {
    try {
      rowMap[data.item.key].closeRow();
      this.setState({ cartLoader: true });
      await removeFromCart(data.item.cartId);
      this.fetchData();
    } catch (error) {
      this.setState({ cartLoader: false });
      console.log("my card > deleteFromCart > catch > ", error);
    }
  }

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  renderHiddenItem = (data, rowMap) => {
    return (
      <TouchableOpacity
        onPress={() => this.deleteFromCart(data, rowMap)}
        style={styles.hiddenItem}>
        <Icon name='delete' size={35} color={'#fff'} />
      </TouchableOpacity>
    )
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
          <><ThemeFullPageLoader /></>
          :
          (<>
            {this.state.cartLoader &&
              <><FullPageLoader />
              </>
            }
            <View style={styles.cartCount}>
              <Text
                style={styles.itemCountText}>
                {this.state.totalQty} items in your cart
              </Text>
            </View>

            {/* <View style={{ height: '54%',marginBottom:1, }}> */}
              
              <SwipeListView
                data={this.state.cart}
                disableRightSwipe={true}
                stopRightSwipe={-80}
                
                closeOnRowOpen={true}
                renderItem={(data, rowMap) => (
                  <CartProduct navigation={this.props.navigation} onCart={(item) => { this.cartLoader(item) }} item={data.item} hostUrl={this.state.hostUrl} onChange={(item, qty) => { this.onChange(item) }} />
                )}
                renderHiddenItem={(data, rowMap) => (
                  this.renderHiddenItem(data, rowMap)
                )}
                rightOpenValue={-80}
              />
            {/* </View> */}
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
                        width:110,
                        height: 44,
                        borderRadius: 25,
                        marginRight:15,
                        flexDirection:'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        //alignSelf: 'flex-end',
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
                  }}>
                  <Icon
                    name="redeem"
                    size={22}
                    color="#A39B9B"
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily:FontFamily.TAJAWAL_REGULAR,
                      fontSize:15,
                      fontWeight:'400',
                      color:'#A39B9B'
                    }}>
                    Do you have any promocode?
                  </Text>
                </View>
                <View
                  style={styles.bottomDetails}>
                  <Text
                    style={{
                      fontFamily:FontFamily.TAJAWAL_REGULAR,
                      color: '#3C3C3C',
                      fontWeight: '500',
                      fontSize: 17,
                    }}>
                    Sub Total
                  </Text>
                  <Text
                    style={{
                      fontFamily:FontFamily.TAJAWAL_REGULAR,
                      color: '#3C3C3C',
                      fontWeight: '500',
                      fontSize: 17,
                    }}>
                    ${this.state.amountData.subTotalAmount}
                  </Text>
                </View>

                {this.state.amountData.couponDiscount > 0 &&
                  <View
                    style={styles.bottomDetails}>
                    <Text
                    style={{
                      fontFamily: FontFamily.TAJAWAL_REGULAR,
                      color: '#3C3C3C',
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                      Coupon Discount
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontFamily.TAJAWAL_REGULAR,
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
                    style={styles.bottomDetails}>
                    <Text
                      style={{
                        fontFamily: FontFamily.TAJAWAL_REGULAR,
                        color: '#3C3C3C',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      Discount
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontFamily.TAJAWAL_REGULAR,
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
                    marginHorizontal: 37,
                    marginVertical:10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily:FontFamily.TAJAWAL_REGULAR,
                      color: '#050505',
                      fontWeight: '700',
                      fontSize: 18,
                    }}>
                    Total Payable
                  </Text>
                  <Text
                    style={{
                      fontFamily:FontFamily.TAJAWAL_REGULAR,
                      color: '#030303',
                      fontWeight: '700',
                      fontSize: 18
                    }}>
                    ${this.state.amountData.totalPayable}
                  </Text>
                </View>

                <View style={{  }}>
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
                        <Text style={{ 
                          fontFamily:FontFamily.TAJAWAL_REGULAR,
                      color: ThemeColors.CLR_WHITE,
                      fontWeight: '700',
                      fontSize: 18
                      }}>CHECKOUT</Text>
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
    zIndex: 0,
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
    justifyContent: 'flex-end',
    alignContent:'flex-end',
    marginVertical:1,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
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
  },
  hiddenItem:{
    flexDirection: 'column',
    flex: 1,
    height: 133,
    marginTop: 16,
    width: 100,
    alignSelf: 'flex-end',
    marginRight: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#A1172F'
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
    borderRadius: 25,
  },
  promoText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 20,
    fontWeight: '400',
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    textAlignVertical: 'center',
    paddingVertical:0,
    alignContent: 'center',
    paddingLeft: 20,
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
  bottomDetails:{
    marginHorizontal:37,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productInnerView: {
    height: 100,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    marginVertical:3,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  swipedRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#818181',
    margin: 20,
    //minHeight: 90,
  },
  swipedConfirmationContainer: {
    flex: 1,
    height: 200
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});
