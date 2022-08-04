import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import {A_KEY, BASE_URL} from '../../config';
import {getAccessToken} from '../../localstorage';
import HeaderSide from '../Component/HeaderSide';

export default class ProductDetailBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      loader: false,
      data: null,
      fav: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({loader: true});
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);

    let raw = JSON.stringify({
      vendorId: this.props.route.params.id ? this.props.route.params.id : 1,
      latitude: 1.28668,
      longitude: 103.853607,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/vendor/details`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.response) {
          this.setState({data: result.response.result, loader: false});
        }
        if (result.errors) {
          this.setState({loader: false});
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        console.log('error', error);
        this.setState({loader: false});
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };

  whisListAdd = async id => {
    console.log(id);
    let token = await getAccessToken(token);
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    let raw = JSON.stringify({
      productId: 0,
      comboId: 0,
      vendorId: id,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/wishlist/addToWishlist`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('ADD_IN_WHISLIST', result);
      })
      .catch(error => console.log('error', error));
  };

  whisListRemove = () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${BASE_URL}`);

    let raw = JSON.stringify({
      wishlistId: 11,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/wishlist/removeToWishlist`, requestOptions)
      .then(response => response.jsom())
      .then(result => {
        console.log('REMOVE_IN_WHISLIST', result);
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}>
        {this.state.data == null ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#741728" />
          </View>
        ) : (
          <ScrollView>
            <View
              style={{
                // backgroundColor: '#fff',
                height: 240,
              }}>
              <ImageBackground
                style={styles.productImg}
                resizeMode={'cover'}
                source={{
                  uri:
                    this.state.data.hostUrl +
                    this.state.data.vendorDetail[0].images,
                }}
                // defaultSource={images.promotions1}
              >
                <View
                  style={{
                    margin: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                    <Icon name="arrow-back" size={28} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      // this.whisList(this.state.data.vendorDetail[0].vendorId);
                    }}>
                    <Image
                      resizeMode={'cover'}
                      source={images.heart}
                      defaultSource={images.promotions1}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: 86,
                      height: 24,
                      backgroundColor: '#4FEA36',
                      marginBottom: 20,
                      alignItems: 'center',
                      marginRight: 20,
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '500',
                        textAlign: 'center',
                        marginTop: 2,
                      }}>
                      OPEN
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                // height: 275,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 0,
                marginTop: -10,
                borderRadius: 20,
              }}>
              <View style={{margin: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      color: '#3C3C3C',
                    }}>
                    {this.state.data.vendorDetail[0].vendorShopName}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="directions-run"
                      size={25}
                      color="#C11331"
                      style={{marginRight: 7}}
                    />
                    <Text
                      style={{
                        color: '#3C3C3C',
                        fontSize: 14,
                        fontWeight: '400',
                      }}>
                      {this.state.data.vendorDetail[0].distance.toFixed(2)}Km
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode={'cover'}
                    source={images.location}
                    defaultSource={images.location}
                    // style={{width:14,height:17}}
                  />
                  <Text
                    style={{
                      fontWeight: '400',
                      color: '#424242',
                      marginLeft: 10,
                      fontSize: 13,
                    }}>
                    {this.state.data.vendorDetail[0].address}
                  </Text>
                </View>

                {/* <View style={{marginTop: 10}}>
                  <Text>Star</Text>
                </View> */}
                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      color: '#424242',
                      fontWeight: '400',
                    }}>
                    {this.state.data.vendorDetail[0].description}
                  </Text>
                </View>

                <View
                  style={{
                    //   flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    marginTop: 10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      resizeMode={'cover'}
                      source={images.call}
                      defaultSource={images.call}
                      // style={{width:14,height:17}}
                    />
                    <Text
                      style={{
                        color: '#424242',
                        fontSize: 14,
                        fontWeight: '500',
                        marginLeft: 7,
                      }}>
                      {this.state.data.vendorDetail[0].contact
                        .toString()
                        .replace(/\B(?=(?:\d{3})+(?!\d))/g, '-')}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 95,
                      height: 28,
                      borderWidth: 1.5,
                      borderColor: '#C11331',
                      alignSelf: 'center',
                      borderRadius: 15,
                      paddingLeft: 10,
                    }}>
                    <Image
                      resizeMode={'cover'}
                      source={images.menu}
                      defaultSource={images.menu}
                    />
                    <Text
                      style={{
                        color: '#424242',
                        fontSize: 14,
                        fontWeight: '500',
                        marginLeft: 7,
                      }}>
                      Menu
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{margin: 15, marginTop: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#3C3C3C',
                }}>
                Special Offers
              </Text>

              <View
                style={{
                  marginTop: 15,
                }}>
                <Image
                  // style={styles.productImg}
                  resizeMode={'cover'}
                  source={images.promotionBanner}
                  defaultSource={images.promotionBanner}
                />
              </View>
            </View>
            <View style={{margin: 15, marginTop: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: '#3C3C3C',
                }}>
                Redeemable Products
              </Text>

              {this.state.data.vendorDetail[0].ecom_ac_products 
                ? this.state.data.vendorDetail[0].ecom_ac_products.map(item => (
                    <View
                      style={styles.productView}
                      onPress={() =>
                        this.props.navigation.navigate('OrderHistoryDetail')
                      }>
                      <View style={styles.productInnerView}>
                        <Image
                          style={{
                            width: 75,
                            height: 75,
                          }}
                          resizeMode={'cover'}
                          source={{
                            uri: `${this.state.data.hostUrl + item.images}`,
                          }}
                          defaultSource={images.product2}
                        />
                      </View>

                      <View style={{margin: 5, marginLeft: 10}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '500',
                              color: '#4D4F50',
                            }}>
                            {item.name}
                          </Text>
                        </View>

                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#4D4F50',
                              fontWeight: '400',
                            }}>
                            {item.shortDescription}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginTop: 7,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              marginLeft: 5,
                              fontSize: 18,
                              color: '#424242',
                              fontWeight: '700',
                            }}>
                            ${item.ecom_aca_product_units[0].unitUserPrice}
                          </Text>

                          {item.ecom_aca_product_units[0].unitDiscountPrice ? (
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 15,
                                color: '#969696',
                                textDecorationLine: 'line-through',
                              }}>
                              $
                              {item.ecom_aca_product_units[0].unitDiscountPrice}
                            </Text>
                          ) : null}
                        </View>
                        <View
                          style={{
                            // top: '15%',
                            marginLeft: '60%',
                            flex: 1,
                            justifyContent: 'flex-end',
                          }}>
                          <TouchableOpacity
                            onPress={
                              () =>
                                this.props.navigation.navigate('Redeem', {
                                  item,
                                  uri: this.state.data.hostUrl,
                                  image: this.state.data.vendorDetail[0].images,
                                  vendorId:this.props.route.params.id ? this.props.route.params.id : 1
                                })
                              // console.log('--->xxxxxxx', item.images)
                            }
                            style={{
                              backgroundColor: '#C11331',
                              marginTop: 10,
                              borderRadius: 10,
                              height: 25,
                              width: 70,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#fff',
                                fontWeight: '500',
                              }}>
                              Redeem
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                : null}
            </View>

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
                <View style={{margin: 20}}>
                  <View>
                    <Text
                      style={{
                        color: '#ACACAC',
                        fontWeight: '500',
                      }}>
                      Item added to cart successfully
                    </Text>
                  </View>

                  <View style={{marginTop: 20}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: '#000',
                        }}>
                        Chivas Regal 12
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity>
                          <Icon name="remove" size={20} color="#4D4F50" />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '500',
                            color: '#000',
                          }}>
                          {' '}
                          1{' '}
                        </Text>
                        <TouchableOpacity>
                          <Icon name="add" size={20} color="#4D4F50" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{marginTop: '10%', marginBottom: 10}}>
                      <TouchableOpacity
                        style={styles.save}
                        onPress={() =>
                          this.props.navigation.navigate('MyCard')
                        }>
                        <Text style={{color: '#fff', fontSize: 15}}>
                          VIEW CART
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  productImg: {
    // width:361,
    height: 241,
  },
  productView: {
    backgroundColor: '#fff',
    height: 100,
    width: '96%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderRadius: 12,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  productInnerView: {
    backgroundColor: '#fff',
    height: 100,
    width: '26%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
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
