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
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchCart } from '../../api/product';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
export default class MyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      hostUrl: '',
      totalQty: 0,
      // subTotal: 0,
      payableTotal: 0
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const resp = await fetchCart();
      this.setState({
        cart: resp.response.result.data,
        hostUrl: resp.response.result.hostUrl,
      });
      if (this.state.cart.length > 0) {
        this.setState({ totalQty: this.state.cart.reduce((x, c) => x + parseInt(c.qty), 0) });
        this.setState({ payableTotal: this.state.cart.reduce((x, c) => x + parseInt(c.productAmount), 0) });
        // this.setState({ payableTotal: this.state.cart.reduce((x, c) => x + parseInt(c.productAmount), 0) });
      }
      console.log(this.state);
    } catch (error) {
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}>
        <HeaderSide
          name={'My Cart'}
          onClick={() => this.props.navigation.pop()}
        />
        <>
          <View style={{ margin: 15 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
              }}>
              3 items in your cart
            </Text>

            <View
              style={styles.productView}
              onPress={() =>
                this.props.navigation.navigate('OrderHistoryDetail')
              }>
              <View style={styles.productInnerView}>
                <Image
                  resizeMode={'cover'}
                  source={images.product2}
                  defaultSource={images.product2}
                />
              </View>

              <View style={{ margin: 5, marginLeft: 0 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#4D4F50' }}>
                    Chivas Regal 12
                  </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{ fontSize: 14, color: '#4D4F50', fontWeight: '400' }}>
                    Blended
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#4D4F50',
                      fontWeight: '400',
                      marginLeft: 10,
                    }}>
                    350ml
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 21,
                      color: '#4D4F50',
                      fontWeight: '700',
                      alignItems: 'center',
                    }}>
                    $99
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#969696',
                      fontWeight: '400',
                      marginLeft: 10,
                      textDecorationLine: 'line-through',
                    }}>
                    $100
                  </Text>
                </View>
              </View>
              <View
                style={{
                  margin: 10,
                  marginLeft: 20,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({ modalVisible: true })}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#A1172F',
                    padding: 2,
                    borderRadius: 20,
                  }}>
                  <Icon name="remove" size={18} color="#fff" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: '500',
                    color: '#A1172F',
                    marginLeft: 10,
                    marginRight: 10,
                  }}>
                  3
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ modalVisible: true })}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#A1172F',
                    padding: 2,
                    borderRadius: 20,
                  }}>
                  <Icon name="add" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>

        <View style={{ marginTop: '10%', flex: 1, justifyContent: 'flex-end' }}>
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
                marginTop: 20,
                // marginLeft: 20
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#DADADA',
                  width: 306,
                  height: 44,
                  borderRadius: 20,
                }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 20,
                    alignSelf: 'center',
                    paddingLeft: 15,
                  }}
                  placeholder="Promocode"
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#751A2A',
                    width: 128,
                    height: 44,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#fff',
                    }}>
                    Apply
                  </Text>
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
                marginTop: 20,
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
                $397
              </Text>
            </View>

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
                -$99
              </Text>
            </View>

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
                $262
              </Text>
            </View>

            <View style={{ marginTop: '10%', marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.save}
                onPress={() => this.props.navigation.navigate('Checkout')}>
                <Text style={{ color: '#fff', fontSize: 18 }}>CHECKOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
