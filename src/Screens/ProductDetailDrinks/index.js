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
  FlatList,
  Alert,
} from 'react-native';
import { ThemeColors } from '../../Theme/ThemeColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addToCart, fetchProductDetails } from '../../api/product';
import images from '../../assets/images';
import { FontFamily } from '../../Theme/FontFamily';
import HTMLView from 'react-native-htmlview';
import { addToWishlist, removeToWishlist } from '../../api/wishlist';
import { showAlert } from '../../api/auth';
import { getAccessToken } from '../../localstorage';

export default class ProductDetailDrinks extends Component {
  constructor(props) {
    super(props);
    console.log(props.route.params.id);
    this.state = {
      visibilityQuantity: 30,
      details: [],
      hostUrl: '',
      id: props.route.params.id,
      vendors: [],
      isFavorite: false
    };
  }

  componentDidMount() {
    this.productDetails();
  }

  addCart = async () => {
    const token = await getAccessToken();
    if (token == null) {
      showAlert();
      return;
    } else {
      //console.log("DetailsBars > addCart >details",this.state.details.ecom_aca_product_units[0].productUnitId);
      const cartItem = {
        productUnitId: this.state.details.ecom_aca_product_units[0].productUnitId,
        comboId: 0,
        qty: 1,
      };
      try {
        const cartResponse = await addToCart(cartItem);
        ToastAndroid.showWithGravity(
          'Item added to cart successfully',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } catch (error) {
        console.log("Details Bars > addCart > catch", error);
        ToastAndroid.showWithGravity(
          'Try Again',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    }
  }

  productDetails = async () => {
    try {
      const data = {
        productId: this.state.id,
        latitude: 1.28668,
        longitude: 103.853607,
      }
      const resp = await fetchProductDetails(data);
      if (resp.response.result && resp.response.result.data) {
        this.setState({ details: resp.response.result.data });
        this.setState({ vendors: resp.response.result.data.ecom_ae_vendors });
        this.setState({ hostUrl: resp.response.result.hostUrl });
        this.setState({ isFavorite: (resp.response.result.data.ecom_ba_wishlist && resp.response.result.data.ecom_ba_wishlist.wishlistId) ? true : false });
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }

  removeFavorite = async (id) => {
    const token = await getAccessToken();
    if (token == null) {
      showAlert();
      return;
    } else {
      try {
        const data = {
          wishlistId: id
        }
        const response = await removeToWishlist(data);
        this.state.details.ecom_ba_wishlist = null;
        this.setState({ isFavorite: false });
      } catch (error) {
        console.log("CategoryCard > removeFavorite > Catch", error);
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      }
    }
  }

  addFavorite = async (id) => {
    const token = await getAccessToken();
    if (token == null) {
      showAlert();
      return;
    } else {
      try {
        const data = {
          productId: id,
          comboId: 0,
          vendorId: 0
        };
        const response = await addToWishlist(data);
        this.state.details.ecom_ba_wishlist = {
          "wishlistId": response.result.data.wishlistId,
          "wishlistFor": "Drinks"
        }
        this.setState({ isFavorite: true })
      } catch (error) {
        console.log("CategoryCard > addFavorite > Catch", error);
        console.log("CategoryCard > removeFavorite > Catch", error);
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      }
    }
  }


  renderItem = (item) => {
    console.log("VendorId",item.vendorId);
    return (
      <View style={styles.vendorContainer}>
        <TouchableOpacity
          style={styles.vendorItem}
          onPress={() =>
            this.props.navigation.navigate('ProductDetailBars',{ 'id': item.vendorId })
            ///console.log('go to bar details')
          }>
          <View style={styles.vendorImgContainer}>
            <Image
              style={styles.vendorImage}
              resizeMode={'cover'}
              source={{ uri: this.state.hostUrl + item.images }}
              defaultSource={images.barProduct}
            />
          </View>

          <View style={styles.vendorDetails}>
            <View
              style={styles.vendorRow}>
              <Icon name="wine-bar" size={20} color={ThemeColors.CLR_TAB} />
              <Text
                style={styles.vendorTitle}>
                {item.name}
              </Text>
            </View>

            <View
              style={styles.vendorRow}>
              <Icon name="place" size={20} color={ThemeColors.CLR_TAB} />
              <Text
                style={styles.vendorText}>
                {item.address}
              </Text>
            </View>

            <View
              style={styles.vendorRow}>
              <Icon name="directions-run" size={20} color={ThemeColors.CLR_TAB} />
              <Text
                style={styles.vendorText}>
                {item.distance}
              </Text>
            </View>
          </View>
          <View
            style={styles.vendorProductStatus}>
            <View
              style={styles.vendorRow}>
              <Icon
                name="fiber-manual-record"
                size={18}
                color="#38C720"
              />
              {item.ecom_acc_vendor_product && item.ecom_acc_vendor_product.vendorProductStatus == 'Available' ? <Text style={[styles.productStatusText, styles.open]}>Open</Text> : <Text style={[styles.productStatusText, styles.close]}>Close</Text>}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderQuantity = (item) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ visibilityQuantity: item.unitQty })}
        style={
          item.unitQty == item.unitQty
            ? styles.itemQuantitySelected
            : styles.itemQuantity
        }
      >
        <View
          style={styles.qtyText}>
          <Text
            style={styles.qtyColor}>
            {item.unitQty + ' ' + item.unitType}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.productDetailsContainer}>
              <View
                style={styles.backArrowContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                  <Icon name="arrow-back" size={28} color={ThemeColors.CLR_DARK_GREY} />
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() => {
                    this.state.details.ecom_ba_wishlist && this.state.details.ecom_ba_wishlist.wishlistId
                      ? this.removeFavorite(this.state.details.ecom_ba_wishlist.wishlistId)
                      : this.addFavorite(this.state.details.productId);
                  }}>
                  <Image
                    resizeMode={'cover'}
                    // source={this.state.details.ecom_ba_wishlist && this.state.details.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                    // defaultSource={this.state.details.ecom_ba_wishlist && this.state.details.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                    source={this.state.isFavorite ? images.heartFill : images.heart}
                    defaultSource={this.state.isFavorite ? images.heartFill : images.heart}
                    style={styles.favIcon}
                  />
                </TouchableOpacity> */}
              </View>

              <View
                style={styles.productDetails}>
                <View
                  style={styles.headerContainer}>
                  <Text
                    style={styles.headerText}>
                    {this.state.details.name}
                  </Text>
                  {this.state.details.ecom_aca_product_units ?
                    <Text
                      style={styles.priceText}>
                      {'$ ' + this.state.details.ecom_aca_product_units[0].unitUserPrice}
                    </Text>
                    :
                    <Text></Text>
                  }

                  <Text
                    style={styles.detailsText}>
                    {this.state.details.ecom_aca_product_units ? this.state.details.ecom_aca_product_units[0].unitDescription : ''}
                  </Text>
                  {this.state.details.ecom_aca_product_units && this.state.details.ecom_aca_product_units[0].savedPrices != null ?
                    <ImageBackground
                      style={styles.discountContainer}
                      resizeMode={'cover'}
                      source={images.savedTag}
                      defaultSource={images.savedTag}>
                      <View
                        style={styles.discountContent}>
                        <Text
                          style={styles.discountText}>
                          You Save:
                        </Text>
                        <Text
                          style={styles.discountText}>
                          {' '}
                          {this.state.details.ecom_aca_product_units[0].savedPrices}
                        </Text>
                      </View>
                    </ImageBackground>
                    : null}

                  <View
                    style={styles.quantity}>
                    <Text
                      style={styles.qtyText}>
                      Quantity:
                    </Text>
                    <View
                      style={styles.unitTabContainer}>
                      <FlatList
                        data={this.state.details.ecom_aca_product_units ? this.state.details.ecom_aca_product_units : []}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => this.renderQuantity(item)}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={styles.prodImage}>
                  <Image
                    style={styles.mainProductImg}
                    resizeMode={'cover'}
                    source={{ uri: this.state.hostUrl + this.state.details.images }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.cart}>
              <View style={styles.cartMargin}>
                <View style={styles.cartBtnContainer}>
                  <View />
                  <View>
                    <View
                      style={styles.cartContainer}>
                      <Text
                        style={styles.cartText}>
                        ADD TO CART
                      </Text>
                      <TouchableOpacity
                      onPress={()=>{this.addCart()}}
                        style={styles.cartIcon}>
                        <Image
                          resizeMode={'cover'}
                          source={images.cart}
                          defaultSource={images.cart}
                          style={styles.cartImage}
                        />
                        {/* <Icon
                          name="add-cart"
                          size={25}
                          color={ThemeColors.CLR_WHITE}
                          style={styles.addCartIcon}
                        /> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* <TouchableOpacity>
                    <Icon
                      name="favorite"
                      size={30}
                      color="#FF1405"
                      style={styles.favorite}
                    />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.heartContainer}
                    onPress={() => {
                      this.state.details.ecom_ba_wishlist && this.state.details.ecom_ba_wishlist.wishlistId
                        ? this.removeFavorite(this.state.details.ecom_ba_wishlist.wishlistId)
                        : this.addFavorite(this.state.details.productId);
                    }}>
                    <Image
                      resizeMode={'cover'}
                      source={this.state.isFavorite ? images.heartFill : images.heart}
                      defaultSource={this.state.isFavorite ? images.heartFill : images.heart}
                      style={styles.favIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.descriptionContainer}>
                  <HTMLView
                    value={this.state.details.description}
                    stylesheet={styles.descriptionText}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.redeem}>
            <View style={styles.redeemContainer}>
              <Text
                style={styles.redeemHeader}>
                Redeemable in Bars
              </Text>

              <Text
                style={styles.redeemText}>
                Select your nearest bar and redeem your drink
              </Text>
            </View>

            {this.state.vendors && this.state.vendors.length > 0 &&
              <View
                style={styles.vendor}>
                <FlatList
                  data={this.state.vendors}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryFlatList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => this.renderItem(item, index)}
                />
              </View>
            }
          </View>
          {/* <View
            style={styles.bottomContainer}>
            <View
              style={styles.bottomSubContainer}>
              <View style={styles.textMsg}>
                <View>
                  <Text
                    style={styles.textDetails}>
                    Item added to cart successfully
                  </Text>
                </View>
                <View style={styles.textMsg}>
                  <View
                    style={styles.header}>
                    <Text
                      style={styles.productText}>
                      {this.state.details.name}
                    </Text>
                    <View style={styles.cartQuantity}>
                      <TouchableOpacity>
                        <Icon name="remove" size={20} color="#4D4F50" />
                      </TouchableOpacity>
                      <Text
                        style={styles.qty}>
                        {' '}
                        1{' '}
                      </Text>
                      <TouchableOpacity>
                        <Icon name="add" size={20} color="#4D4F50" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.cartButton}>
                    <TouchableOpacity
                      style={styles.save}
                      onPress={() => this.props.navigation.navigate('MyCard')}>
                      <Text style={styles.cartBtnText}>
                        VIEW CART
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View> */}
        </ScrollView>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  productDetailsContainer: {
    backgroundColor: ThemeColors.CLR_WHITE,
    shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1

  },
  backArrowContainer: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: '70%',
  },
  headerText: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontSize: 25,
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    fontWeight: '700',
  },
  productDetails: {
    flexDirection: 'row',
    margin: 15,
  },
  priceText: {
    fontSize: 25,
    color: '#741929',
    fontWeight: '700',
    fontFamily: FontFamily.ROBOTO_REGULAR,
    marginTop: 20,
  },
  detailsText: {
    fontSize: 15,
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    fontWeight: '400',
    marginTop: 10,

  },
  discountContainer: {
    width: 180,
    height: 30,
    marginTop: 20,
    right: 15,
  },
  discountContent: {
    marginLeft: 15,
    marginTop: 2,
    flexDirection: 'row',
  },
  discountText: {
    fontSize: 15,
    fontWeight: '700',
    color: ThemeColors.CLR_WHITE,
    fontStyle: 'italic',
  },
  quantity: {
    marginTop: '40%',

  },
  qtyText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    fontWeight: "500",
    fontSize: 15
  },
  qtyColor: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: '#99182E',
    fontWeight: "500",
    fontSize: 15
  },
  unitTabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prodImage: {
    width: '30%',
    alignItems: 'center',
    marginTop: '5%',
  },
  cart: {
    backgroundColor: '#fff',
    height: 200,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    marginTop: -20,
    zIndex: 0,
    // backgroundColor: "powderblue",

  },
  cartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#AD1832',
    width: 192,
    borderRadius: 20,
  },
  cartMargin: { margin: 40 },
  cartBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cartText: {
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    paddingLeft: 10,
    color: ThemeColors.CLR_WHITE,
    fontWeight: '700',
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center'

  },
  cartIcon: {
    backgroundColor: '#D46679',
    width: 61,
    height: 44,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: ThemeColors.CLR_WHITE
  },
  addCartIcon: {
    marginRight: 7,
    alignSelf: 'center'
  },
  cartImage: {
    tintColor: ThemeColors.CLR_WHITE,
  },
  redeem: {
    margin: 0,
    marginTop: 20
  },
  redeemContainer: {
    margin: 15
  },
  redeemHeader: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontSize: 15,
    fontWeight: '500',
    color: '#4D4F50',
  },
  redeemText: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontSize: 12,
    fontWeight: '400',
    color: '#ACACAC',
    marginTop: 5,
  },
  vendor: {
    backgroundColor: ThemeColors.CLR_WHITE,
    marginTop: 15,
    marginBottom:10
  },
  vendorContainer: {
    margin: 14,
    flexDirection: 'row',
  },
  vendorImgContainer: { alignSelf: "center" },
  vendorImage: {
    width: 65,
    height: 50,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: "center"
  },
  vendorDetails:
  {
    margin: 0,
    width: '50%',
    marginLeft: 5,
    paddingHorizontal:5,

  },
  vendorRow: {
    flexDirection: 'row',
  },
  vendorTitle: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 16,
    fontWeight: '700',
    color: '#030303',
  },
  vendorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4D4F50',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  vendorProductStatus: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
  },
  productStatusText: {
    fontSize: 14,
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontWeight: '500',
    marginLeft: 5,
  },
  open: {
    color: '#38C720',
  },
  close: {
    color: '#FF2121',
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  mainProductImg: {
    width: 102,
    height: 197,
  },
  itemQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    margin: 5,
    padding: 10,
  },
  itemQuantitySelected: {
    flexDirection: 'row',
    marginTop: 15,
    margin: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#A1172F',
    width: 87,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  vendorItem: {
    flex: 1,
    flexDirection: 'row',

  },
  // bottomContainer: {
  //   marginTop: '10%',
  // },
  // bottomSubContainer: {
  //   shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
  //   shadowOffset: {
  //     width: 0,
  //     height: 5,
  //   },
  //   shadowOpacity: 1,
  //   shadowRadius: 10,
  //   elevation: 4,
  //   backgroundColor: ThemeColors.CLR_WHITE,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   overflow: 'hidden',
  // },
  // textMsg: {
  //   margin: 20
  // },
  // textDetails: {
  //   color: '#ACACAC',
  //   fontWeight: '500',
  //   fontSize: 14,
  //   fontFamily: FontFamily.TAJAWAL_REGULAR,
  // },
  // productText: {
  //   fontFamily: FontFamily.TAJAWAL_REGULAR,
  //   fontSize: 15,
  //   fontWeight: '500',
  //   color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
  // },
  // cartQuantity: {
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // },
  // qty: {
  //   fontFamily: FontFamily.TAJAWAL_REGULAR,
  //   fontSize: 15,
  //   fontWeight: '500',
  //   color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
  // },
  // cartButton: {
  //   marginTop: 30,
  //   marginBottom: 10
  // },
  descriptionContainer: { marginTop: 30 },
  // cartBtnText: {
  //   color: ThemeColors.CLR_WHITE,
  //   fontFamily: FontFamily.TAJAWAL_REGULAR,
  //   fontWeight: '700',
  //   fontSize: 18
  // },
  // productUnderline: {
  //   height: 0.7,
  //   backgroundColor: '#ACACAC',
  // },
});
