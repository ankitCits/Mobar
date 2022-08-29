import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import { A_KEY, BASE_URL } from '../../config';
import { getAccessToken } from '../../localstorage';
import ThemeFullPagerLoader from '../../Component/ThemeFullPageLoader';
import { addToWishlist, removeToWishlist } from '../../api/wishlist';
import { set } from 'immer/dist/internal';
import { fetchVendorDetails } from '../../api/vendor';
import { ThemeColors } from '../../Theme/ThemeColors';
export default class ProductDetailBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      loader: false,
      data: null,
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loader: true });
    try {
      const postData = {
        vendorId: this.props.route.params && this.props.route.params.id ? this.props.route.params.id : 1,
        latitude: 1.28668,
        longitude: 103.853607,
      };
      const data = await fetchVendorDetails(postData);
      this.setState({ data: data.response.result, loader: false });
      this.setState({
        isFavorite: this.state.data.vendorDetail[0].ecom_ba_wishlist &&
          this.state.data.vendorDetail[0].ecom_ba_wishlist.wishlistId ?
          true : false
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  wishListAdd = async (id) => {
    console.log("Product Details Bar > addFav > ItemID", id);
    const data = {
      productId: 0,
      comboId: 0,
      vendorId: id
    };
    try {
      const response = await addToWishlist(data);
      this.state.data.vendorDetail[0].ecom_ba_wishlist = {
        "wishlistId": response.result.data.wishlistId,
        "wishlistFor": "Drinks"
      };
      this.setState({ isFavorite: true })
    } catch (error) {
      console.log("Product Details Bar > addFavorite > Catch", error);
    }
  };

  wishListRemove = async (id) => {
    console.log("Bar > wishlist remove", id);
    //return;
    try {
      const data = {
        wishlistId: id,
      };
      const response = await removeToWishlist(data);
      console.log("Wishlist Remove > Bar", response);
      console.log("Wishlist Remove > w object", this.state.data.vendorDetail[0].ecom_ba_wishlist);
      this.state.data.vendorDetail[0].ecom_ba_wishlist = null;
      this.setState({ isFavorite: false })
    } catch (error) {
      console.log("Product Details Bar > removeFavorite > Catch", error);
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
          backgroundColor: '#fff',
        }}>
        {this.state.data == null ? (
          <ThemeFullPagerLoader />
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
                defaultSource={images.promotions1}
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
                      this.state.isFavorite
                        ? this.wishListRemove(this.state.data.vendorDetail[0].ecom_ba_wishlist.wishlistId)
                        : this.wishListAdd(this.state.data.vendorDetail[0].vendorId);
                    }}>
                    <Image
                      resizeMode={'cover'}
                      source={this.state.isFavorite ? images.heartFill : images.heart}
                      defaultSource={this.state.isFavorite ? images.heartFill : images.heart}
                    //style={styles.flexEnd}
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
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
                elevation: 0,
                marginTop: -10,
                borderRadius: 15,
              }}>
              <View style={{ margin: 15 }}>
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="directions-run"
                      size={25}
                      color="#C11331"
                      style={{ marginRight: 7 }}
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
                <View style={{ marginTop: 10 }}>
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

            <View style={{ margin: 15, marginTop: 20 }}>
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
            <View style={{ margin: 15, marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: '#3C3C3C',
                }}>
                Redeemable Products
              </Text>

              {this.state.data && this.state.data.vendorDetail.length && this.state.data.vendorDetail[0].ecom_ac_products
                ? this.state.data.vendorDetail[0].ecom_ac_products.map((item, index) => (
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
                    <View style={{ margin: 5, marginLeft: 10, width: '60%' }}>
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
                            width: '75%',
                            color: '#4D4F50',
                            paddingHorizontal: 5,
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
                          marginTop: 1,
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
                        {/* <TouchableOpacity
                          onPress={
                            () =>
                              this.props.navigation.navigate('Redeem', {
                                item,
                                uri: this.state.data.hostUrl,
                                image: this.state.data.vendorDetail[0].images,
                                vendorId: this.props.route.params.id ? this.props.route.params.id : 1
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
                        </TouchableOpacity> */}
                      </View>
                    </View>
                    <View style={{ marginTop: 17, marginRight: 12, }}>
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: '#BABABA',
                          padding: 2,
                          borderRadius: 20,
                        }}>
                        <Icon name="add" size={18} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
                : null}
            </View>

            {/* <View
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
                <View style={{ margin: 20 }}>
                  <View>
                    <Text
                      style={{
                        color: '#ACACAC',
                        fontWeight: '500',
                      }}>
                      Item added to cart successfully
                    </Text>
                  </View>

                  <View style={{ marginTop: 20 }}>
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
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
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

                    <View style={{ marginTop: '10%', marginBottom: 10 }}>
                      <TouchableOpacity
                        style={styles.save}
                        onPress={() =>
                          this.props.navigation.navigate('MyCard')
                        }>
                        <Text style={{ color: '#fff', fontSize: 15 }}>
                          VIEW CART
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View> */}
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
    backgroundColor: ThemeColors.CLR_WHITE,
    //height: 100,
    //width: '96%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
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
