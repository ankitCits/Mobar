import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import ThemeFullPagerLoader from '../../Component/ThemeFullPageLoader';
import { addToWishlist, removeToWishlist } from '../../api/wishlist';
import { fetchVendorDetails } from '../../api/vendor';
import { ThemeColors } from '../../Theme/ThemeColors';
import { FontFamily } from '../../Theme/FontFamily';
import { addToCart } from '../../api/product';
import { getAccessToken } from '../../localstorage';
import { connect } from 'react-redux';
import StarRating from '../../Component/StarRatings';
import { isLoggedIn, showAlert, showToaster } from '../../api/func';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
class ProductDetailBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      loader: false,
      data: null,
      offersData: [],
      hostUrl: null,
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
        latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : '',
        longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : '',
      };
      const data = await fetchVendorDetails(postData);
      this.setState({ data: data.response.result, offersData: data.response.result.barOffers, hostUrl: data.response.result.hostUrl, loader: false });
      this.setState({
        isFavorite: this.state.data.vendorDetail[0].ecom_ba_wishlist &&
          this.state.data.vendorDetail[0].ecom_ba_wishlist.wishlistId ?
          true : false
      });
    } catch (error) {
      showToaster(error, 'TOP');
    }
  };

  wishListAdd = async (id) => {
    if (await isLoggedIn()) {
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
    } else {
      showAlert();
    }
  };

  wishListRemove = async (id) => {
    if (await isLoggedIn()) {
      try {
        const data = {
          wishlistId: id,
        };
        const response = await removeToWishlist(data);
        this.state.data.vendorDetail[0].ecom_ba_wishlist = null;
        this.setState({ isFavorite: false })
      } catch (error) {
        console.log("Product Details Bar > removeFavorite > Catch", error);
        showToaster(error);
      }
    } else {
      showAlert();
    }
  };

  setModalVisible = () => {
    this.setState({ modalVisible: false });
  }


  addCart = async (prodUnitId) => {
    if (await isLoggedIn()) {
      const cartItem = {
        productUnitId: prodUnitId,
        comboId: 0,
        qty: 1,
      };
      try {
        await addToCart(cartItem);
        showToaster('Item added to cart successfully', 'TOP');
      } catch (error) {
        console.log("Details Bars > addCart > catch", error);
        showToaster(error, 'TOP');
      }
    } else {
      showAlert();
    }
  }

  renderSliderImage = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 10,
        }}>
        <Image
          resizeMode="cover"
          // resizeMethod="resize"
          style={{ width: viewportWidth - 30, height: 200, alignSelf: 'flex-start' }}
          defaultSource={images.defaultImg}
          source={{ uri: `${this.state.hostUrl + item.images}` }}
        />
      </View>
    );
  };

  redirectTo = (item) => {
    console.log("selected product > ", item.ecom_aa_category);
    //return;
    const data = {
      walletId: item.ecom_aca_product_units[0].ecom_ca_wallet.walletId,
      availableQty: item.ecom_aca_product_units[0].ecom_ca_wallet.availableQty,
      unitType: item.ecom_aca_product_units[0].ecom_ca_wallet.unitType,
      vendorShopName: this.state.data.vendorDetail[0].vendorShopName,
      description: this.state.data.vendorDetail[0].description,
      images: this.state.data.vendorDetail[0].images,
      vendorId: this.state.data.vendorDetail[0].vendorId,
      hostUrl: this.state.hostUrl,
      ecom_aca_product_unit: {
        productUnitId: item.ecom_aca_product_units[0].productUnitId,
        unitType: item.ecom_aca_product_units[0].unitType,
        unitQty: item.ecom_aca_product_units[0].unitQty,
        unitUserPrice: item.ecom_aca_product_units[0].unitUserPrice,
        ecom_ac_product: {
          selectedUnitQty: 0,
          inputQty: 0,
          selectedMixerData: "",
          quantity: 0,
          productId: item.productId,
          name: item.name,
          images: item.images,
          description: item.description,
          ecom_acca_vendor_product_units: item.ecom_acca_vendor_product_units,
          ecom_aa_category: item.ecom_aa_category
        }
      }
    };
    //console.log("redeem data > ",data);
    this.props.navigation.navigate('Redeem', { items: data })
  }

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
                defaultSource={images.defaultImg}
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
                    <View style={styles.favContainer}>
                      <Image
                        resizeMode={'cover'}
                        source={this.state.isFavorite ? images.heartFill : images.heart}
                        defaultSource={this.state.isFavorite ? images.heartFill : images.heart}
                        style={styles.favIcon}
                      />
                    </View>
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
                      style={{ marginRight: 5 }}
                    />
                    <Text
                      style={{
                        color: '#3C3C3C',
                        fontSize: 14,
                        fontWeight: '400',
                      }}>
                      {this.state.data.vendorDetail[0].distance.toFixed(1)}Km
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
                {/* this.state.data.vendorDetail[0].vendorRating */}
                <View style={{
                  marginHorizontal: 2
                }}>
                  <StarRating isEdit={false} size={this.state.data.vendorDetail[0].vendorRating} />
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

            {this.state.offersData.length > 0 &&
              <View style={{ margin: 15, marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#3C3C3C',
                  }}>
                  Special Offers
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ alignItems: 'center', height: 200 }}>
                    <View style={{ marginVertical: 10 }}>
                      <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.offersData}
                        renderItem={this.renderSliderImage}
                        sliderWidth={viewportWidth}
                        sliderHeight={viewportWidth}
                        itemWidth={viewportWidth}
                        inactiveSlideOpacity={0}
                      />
                    </View>
                  </View>
                </View>
              </View>
            }

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
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.navigation.navigate('ProductDetailDrinks', { id: item.productId });
                    }}>
                    <View
                      style={[styles.productView,
                      item.ecom_aca_product_units[0].ecom_ca_wallet == null ? styles.redeem : ''
                      ]}
                    // onPress={() =>
                    //   this.props.navigation.navigate('OrderHistoryDetail')
                    // }
                    >
                      <View style={styles.productInnerView}>
                        <Image
                          key={index}
                          style={{
                            width: 75,
                            height: 75,
                          }}
                          resizeMode={'cover'}
                          source={{
                            uri: `${this.state.data.hostUrl + item.images}`,
                          }}
                          defaultSource={images.defaultImg}
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
                        <View style={{
                          fontSize: 14,
                          color: '#4D4F50',
                          fontWeight: '400',
                          marginHorizontal: 5,
                        }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#4D4F50',
                              fontWeight: '400',
                            }}>
                            {item.ecom_aca_product_units[0].unitQty + item.ecom_aca_product_units[0].unitType}
                          </Text>
                          {/* <HTMLView value={item.shortDescription} /> */}
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

                          {item.ecom_aca_product_units[0].savedPrices ? (
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 15,
                                color: '#969696',
                                textDecorationLine: 'line-through',
                              }}>
                              $
                              {item.ecom_aca_product_units[0].savedPrices}
                            </Text>
                          ) : null}
                        </View>
                      </View>
                      <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <View style={{
                          alignSelf: 'flex-end',
                          marginHorizontal: 10,
                          marginVertical: 5
                        }}>
                          <TouchableOpacity
                            onPress={() => { this.addCart(item.ecom_aca_product_units[0].productUnitId) }}
                            key={index}
                            style={{
                              backgroundColor: '#BABABA',
                              padding: 2,
                              borderRadius: 20,
                            }}>
                            <Icon name="add" size={18} color="#fff" key={index} />
                          </TouchableOpacity>
                        </View>

                        {item.ecom_aca_product_units[0].ecom_ca_wallet != null &&
                          <View
                            style={{
                              marginHorizontal: 10, marginVertical: 5,
                            }}>
                            <TouchableOpacity
                              onPress={
                                () => this.redirectTo(item)

                              }
                              style={{
                                backgroundColor: '#C11331',
                                marginTop: 10,
                                borderRadius: 20,
                                padding: 5,
                                paddingHorizontal: 10,
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
                        }
                      </View>
                      {/* <CartModal itemName={'Product'} modalVisible={this.state.modalVisible} /> */}
                    </View>
                  </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailBars);

const styles = StyleSheet.create({
  productImg: {
    // width:361,
    height: 241,
  },
  productView: {
    backgroundColor: ThemeColors.CLR_WHITE,
    //height: 100,
    //width: '96%',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderRadius: 15,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  redeem: {
    width: '100%'
  },
  productInnerView: {
    backgroundColor: '#fff',
    height: 100,
    width: '26%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  favContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    backgroundColor: ThemeColors.CLR_WHITE,
    elevation: 4,
    borderRadius: 25,
  },
  favIcon: {
    alignSelf: 'center',
  },
  msgContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  headerText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '500',
    fontSize: 14,
    color: '#ACACAC',
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
