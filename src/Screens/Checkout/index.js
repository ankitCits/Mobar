import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
import PaymentForm from '../../Component/PaymentForm';
import { initStripe, confirmPayment } from '@stripe/stripe-react-native';
import { fetchPaymentIntentClientSecret, placeOrder, fetchCart } from '../../api/order';

import moment from 'moment'
// pk_test_QNBEnRDDdYq1Yc7TZjVZhhwG00JySy2oJq
// sk_test_f1pXZRO62VZWj5xCJvqsOnLa00Kaq1E3nT
class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      visibility: false,
      paymentType: 'creditDebit',
      amountData: props.route.params.orderDetails,
      userData: props.redux.auth.userData
    };
    // console.log(this.props.route.params)
    // console.log(this.props.redux.auth.userData)
  }


  componentDidMount() {
    async function initialize() {
      await initStripe({
        publishableKey: 'pk_test_QNBEnRDDdYq1Yc7TZjVZhhwG00JySy2oJq',
      });
    }
    initialize().catch(console.error);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener();
  }

  placeOrder = async () => {
    // console.log('placeorder');
    if (this.state.paymentType == 'creditDebit') {
      this.setState({ loader: true });
      const billingDetails = {
        email: this.state.userData.email,
      };
      const postData = { orderAmount: this.state.amountData.totalPayable * 100 }; // get dynamic amount and pass to below api 
      const res = await fetchPaymentIntentClientSecret(postData);
      const { paymentIntent, error } = await confirmPayment(
        res.response.result.paymentIntent,
        {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
          },
        },
        { setupFutureUsage: 'OffSession', }
      );
      if (error) {
        console.log(error);
        this.setState({ loader: false });
        Alert.alert(`${error.code}`, error.localizedMessage)
      } else if (paymentIntent) {
        if (paymentIntent.status === 'Succeeded') {
          try {
            // console.log(paymentIntent)
            // console.log(this.state.orderAmount);
            const orderData = {
              orderId: this.props.route.params.orderDetails.orderId,
              transactionId: paymentIntent.id,
              paymentMethod: 'credit-debit-cart',
              transactionPayAmount: paymentIntent.amount,
              transactionDate: moment().format('YYYY-MM-DD'),
              transactionTime: moment().format('HH:mm:ss'),
              transactionStatus: 'SUCCEEDED'
            }
            // console.log(orderData)
            await placeOrder(orderData); // Call api to submit order
            this.setState({ loader: false });
            this.props.navigation.navigate('OrderHistory', { home: true }) // navigate to order history page
          } catch (e) {
            console.log(e)
            this.setState({ loader: false });
            Alert.alert('Error', 'Error while processing payment')
          }
        } else {
          this.setState({ loader: false });
        }
      }
    }
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <HeaderSide
          name={'Checkout'}
          onClick={() => this.props.navigation.pop()}

        />
        <ScrollView>
          <View style={{ margin: 15, marginBottom: 0 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '400',
                color: '#4D4F50',
              }}>
              Select Payment Method
            </Text>
            <View>
              <View style={styles.paymentSelect}>
                <TouchableOpacity
                  style={styles.paymentCardList}
                  onPress={() => this.setState({ paymentType: 'creditDebit' })}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      // style={styles.productImg}
                      resizeMode={'cover'}
                      source={images.creditCard}
                      defaultSource={images.creditCard}
                    />
                    <Text style={styles.paymentcardName}>
                      Credit / Debit Card
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({ paymentType: 'creditDebit' })}>
                    <Icon
                      name={
                        this.state.paymentType == 'creditDebit'
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={25}
                      color={
                        this.state.paymentType == 'creditDebit'
                          ? '#A1172F'
                          : '#969696'
                      }
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                <View style={styles.underLine} />

                {/* netBanking */}
                <TouchableOpacity
                  style={styles.paymentCardList}
                  onPress={() => this.setState({ paymentType: 'netBanking' })}>
                  <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                    <Image
                      // style={styles.productImg}
                      resizeMode={'cover'}
                      source={images.netBanking}
                      defaultSource={images.creditCard}
                    />
                    <Text style={styles.paymentcardName}>Net Banking</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({ paymentType: 'netBanking' })}>
                    <Icon
                      name={
                        this.state.paymentType == 'netBanking'
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={25}
                      color={
                        this.state.paymentType == 'netBanking'
                          ? '#A1172F'
                          : '#969696'
                      }
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                <View style={styles.underLine} />

                {/* payPal */}
                <TouchableOpacity
                  style={styles.paymentCardList}
                  onPress={() => this.setState({ paymentType: 'payPal' })}>
                  <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                    <Image
                      // style={styles.productImg}
                      resizeMode={'cover'}
                      source={images.payPal}
                      defaultSource={images.creditCard}
                      style={{ alignSelf: 'center' }}
                    />
                    <Text style={styles.paymentcardName}>PayPal</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({ paymentType: 'payPal' })}>
                    <Icon
                      name={
                        this.state.paymentType == 'payPal'
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={25}
                      color={
                        this.state.paymentType == 'payPal'
                          ? '#A1172F'
                          : '#969696'
                      }
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                <View style={styles.underLine} />

                {/* SavedCard */}
                <TouchableOpacity
                  style={styles.paymentCardList}
                  onPress={() => this.setState({ paymentType: 'savedCard' })}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      // style={styles.productImg}
                      resizeMode={'cover'}
                      source={images.masterCard}
                      defaultSource={images.creditCard}
                    />
                    <Text style={styles.paymentcardName}>
                      . . . . . . . . . . . . 8956
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({ paymentType: 'savedCard' })}>
                    <Icon
                      name={
                        this.state.paymentType == 'savedCard'
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={25}
                      color={
                        this.state.paymentType == 'savedCard'
                          ? '#A1172F'
                          : '#969696'
                      }
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                <View style={styles.underLine} />

                {/* AddNew */}
                <View style={styles.paymentCardList}>
                  <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                    <Icon name="add" size={28} color="#969696" />
                    <Text style={styles.paymentcardName}>Add new card</Text>
                  </View>
                </View>

                <View style={styles.underLine} />
              </View>
            </View>
          </View>

          {this.state.paymentType == 'creditDebit' ? (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  color: '#4D4F50',
                  marginLeft: 15,
                  marginTop: '10%',
                }}>
                Enter Payment Details
              </Text>
              <PaymentForm></PaymentForm>
              {/* 
              <View style={styles.paymentSelect}>
                <View style={styles.paymentDetailCardList}>
                  <View style={{ marginTop: 0 }}>
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color: '#969696',
                          fontSize: 11,
                        }}>
                        CARDHOLDER NAME
                      </Text>
                    </View>
                    <View style={styles.sectionStyle}>
                      <TextInput
                        style={{ flex: 1, paddingLeft: 15 }}
                        placeholder=""
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#000"
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.paymentDetailCardList}>
                  <View style={{ marginTop: 0 }}>
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color: '#969696',
                          fontSize: 11,
                        }}>
                        CARD NUMBER
                      </Text>
                    </View>
                    <View style={styles.sectionStyle}>
                      <TextInput
                        style={{ flex: 1, paddingLeft: 15 }}
                        placeholder=""
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#000"
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.paymentDetailCardList}>
                  <View style={{ marginTop: 0 }}>
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color: '#969696',
                          fontSize: 11,
                        }}>
                        EXPIRY DATE
                      </Text>
                    </View>
                    <View style={styles.sectionStyleNext}>
                      <TextInput
                        style={{ flex: 1, paddingLeft: 15 }}
                        placeholder="mm/yy"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#000"
                      />
                    </View>
                  </View>

                  <View style={{ marginTop: 0, right: '50%' }}>
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color: '#969696',
                          fontSize: 11,
                        }}>
                        CVV
                      </Text>
                    </View>
                    <View style={styles.sectionStyleNext}>
                      <TextInput
                        style={{ flex: 1, paddingLeft: 15 }}
                        placeholder=""
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#000"
                      />
                    </View>
                  </View>
                </View>
              </View> */}
            </View>
          ) : null}

          <View
            style={{
              marginTop: '10%',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 1,
                shadowRadius: 10,
                elevation: 5,
                backgroundColor: '#fff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  margin: 10,
                  marginLeft: 30,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#3C3C3C',
                  }}>
                  Order Summary
                </Text>
              </View>
              <View
                style={{
                  // marginTop: 20,
                  marginLeft: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#3C3C3C',
                    fontWeight: '500',
                    fontSize: 20,
                  }}>
                  Sub Total
                </Text>
                <Text
                  style={{
                    marginRight: 40,
                    color: '#3C3C3C',
                    fontWeight: '500',
                    fontSize: 20,
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
                      fontSize: 18,
                    }}>
                    Coupon Discount
                  </Text>
                  <Text
                    style={{
                      marginRight: 40,
                      color: '#F01111',
                      fontWeight: '500',
                      fontSize: 18,
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
                      fontSize: 18,
                    }}>
                    Discount
                  </Text>
                  <Text
                    style={{
                      marginRight: 40,
                      color: '#F01111',
                      fontWeight: '500',
                      fontSize: 18,
                    }}>
                    -${this.state.amountData.extraDiscount}
                  </Text>
                </View>
              }

              <View
                style={{
                  height: 1,
                  backgroundColor: '#000',
                  marginTop: 10,
                  marginBottom: 10,
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
                    fontSize: 22,
                  }}>
                  Total Payable
                </Text>
                <Text
                  style={{
                    marginRight: 40,
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 22,
                  }}>
                  ${this.state.amountData.totalPayable}
                </Text>
              </View>

              <View style={{ marginTop: '10%', marginBottom: 10 }}>
                <TouchableOpacity
                  style={styles.save}
                  disabled={this.state.loader}
                  onPress={() =>
                    this.placeOrder()
                    // this.props.navigation.navigate('OrderHistoryDetail', { home: true })
                  }>
                  {this.state.loader ?
                    (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text style={{ color: '#fff', fontSize: 18 }}>PLACE ORDER</Text>
                    )
                  }
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Cancelled!",
                      "You have requested to cancel this product.",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => this.props.navigation.navigate('MyBottomTabs') }
                      ]
                    )
                    // this.props.navigation.navigate('MyBottomTabs')

                  }}
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FF1405',
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    Cancel Order
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
function mapStateToProps(state) {
  let redux = state;
  return { redux };
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

const styles = StyleSheet.create({
  paymentSelect: {
    width: '94%',
    marginTop: '10%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    // marginBottom: '20%',
    borderRadius: 10,
  },
  paymentCardList: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentDetailCardList: {
    margin: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentcardName: {
    fontSize: 17,
    alignSelf: 'center',
    color: '#3C3C3C',
    marginLeft: 10,
  },
  underLine: {
    backgroundColor: '#DADADA',
    height: 1,
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#7B7B7B',
    height: 44,
    width: 320,
    borderRadius: 5,
    margin: 10,
    // elevation: 5,
  },
  sectionStyleNext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#7B7B7B',
    height: 44,
    width: 95,
    borderRadius: 5,
    margin: 10,
  },
});
