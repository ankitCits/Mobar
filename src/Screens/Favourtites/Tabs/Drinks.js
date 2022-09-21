import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { showAlert } from '../../../api/auth';
import { addToCart } from '../../../api/product';
import { removeToWishlist } from '../../../api/wishlist';
import images from '../../../assets/images';
import NoContentFound from '../../../Component/NoContentFound';
import { getAccessToken } from '../../../localstorage';
import { FontFamily } from '../../../Theme/FontFamily';
import { ThemeColors } from '../../../Theme/ThemeColors';
export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  removeFavorite = async (id) => {
    try {
      const data = {
        wishlistId: id
      }
      await removeToWishlist(data);
      const updatedData = this.props.data.filter(x => x.wishlistId != id);
      this.props.onClick(updatedData, 'Drinks');
    } catch (error) {
      console.log("favorites > Drinks > removeFavorite > Catch", error);
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }

  handleRedirect = (item) => {
    if (item.ecom_ac_product && item.ecom_ac_product.productId) {
      this.props.navigation.navigate('ProductDetailDrinks', { id: item.ecom_ac_product.productId });
    }
  }

  addCart = async (item, index) => {
    const token = await getAccessToken();
    if (token == null) {
      showAlert();
    } else {
      try {
        const sendData = {
          productUnitId: item.productId,
          comboId: 0,
          qty: 1,
        };
        await addToCart(sendData);
        ToastAndroid.showWithGravity(
          'Product Added to Cart',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      } catch (error) {
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      }
    }
  }

  render() {
    const {
      hostUrl,
      navigation,
      index
    } = this.props;
    return (
      <SafeAreaView
        style={styles.container}>
        <>
          {this.props.data && this.props.data.length > 0 ? (
            this.props.data.map(item => (
              <View key={item.vendorId}>
                <TouchableOpacity
                  key={index}
                  style={styles.productView}
                  onPress={() => {
                    this.handleRedirect(item);
                  }}>
                  <View style={styles.itemContainer}>
                    <View
                      style={styles.header}>
                      {item.ecom_ac_product ?
                        <Text
                          style={styles.title}>
                          {item.ecom_ac_product.name}
                        </Text> :
                        <Text></Text>
                      }
                    </View>

                    <View style={styles.qtyContainer}>
                      <Text
                        style={styles.detailText}>
                        {/* Blended */}
                      </Text>
                      <Text
                        style={styles.qtyText}>
                        {/* 350ml */}
                      </Text>
                    </View>

                    <View
                      style={styles.priceContainer}>
                      <Text
                        style={styles.priceText}>
                        {/* $99 */}
                      </Text>
                      <Text
                        style={styles.discountPrice}>
                        {/* $100 */}
                      </Text>
                      <Text
                        style={styles.savePrice}>
                        {/* Save $100.. */}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => this.addCart(item, index)}
                      style={styles.cartButton}>
                      <Text
                        style={styles.cartText}>
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.productInnerView}>
                    {item.ecom_ac_product ?
                      <Image
                        style={styles.prodImage}
                        resizeMode={'cover'}
                        source={{ uri: `${hostUrl + item.ecom_ac_product.images}` }}
                      //defaultSource={images.product2}
                      /> :
                      <View
                        style={styles.prodImage}
                        resizeMode={'cover'}
                        source={images.product2}
                        defaultSource={images.product2}
                      />
                    }
                    <TouchableOpacity
                      style={styles.favIcon}
                      onPress={() => {
                        this.removeFavorite(item.wishlistId);
                      }}
                    >
                      {/* <Icon name="favorite" size={25} color="#FF1405" /> */}
                      <View style={styles.favContainer}>
                        <Image
                          resizeMode={'cover'}
                          source={images.heartFill}
                          defaultSource={images.heartFill}
                          style={styles.flexEnd}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <NoContentFound title="No Data Found" />
          )}
        </>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productView: {
    backgroundColor: ThemeColors.CLR_WHITE,
    height: 140,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  itemContainer: {
    margin: 5,
    marginLeft: 10,
    width: '60%'
  },
  header: {
    flexDirection: 'row',
    //marginTop: 5,
    //width:'80%'
  },
  title: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 15,
    fontWeight: '700',
    color: '#4D4F50',
  },
  qtyContainer: {
    flexDirection: 'row'
  },
  detailText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 14,
    color: ThemeColors.CLR_DARK_GREY,
    fontWeight: '400',
  },
  qtyText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 14,
    color: ThemeColors.CLR_DARK_GREY,
    fontWeight: '400',
    marginLeft: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    marginLeft: 5,
    fontSize: 21,
    color: ThemeColors.CLR_DARK_GREY,
    fontWeight: '700',
  },
  discountPrice: {
    marginLeft: 10,
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 13,
    alignSelf: 'center',
    fontWeight: '400',
    color: '#969696',
    textDecorationLine: 'line-through',
  },
  savePrice: {
    marginLeft: 10,
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontSize: 11,
    fontWeight: '400',
    // fontStyle: 'italic',
    color: '#B51D36',
  },
  cartButton: {
    alignItems: 'center',
    width: 100,
    height: 25,
    backgroundColor: '#B51D36',
    borderRadius: 12,
  },
  cartText: {
    fontSize: 12,
    fontFamily: FontFamily.CLR_WHITE,
    fontWeight: '500',
    color: ThemeColors.CLR_WHITE,
    textAlignVertical: 'center',
    flex: 1
  },
  productInnerView: {
    flexDirection: 'row',
    backgroundColor: ThemeColors.CLR_WHITE,
    alignItems: 'center',
    alignContent: 'flex-start',
    width: 125,
    shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 5,
  },
  prodImage: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
  },
  favContainer: {
    width: 33,
    height: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: ThemeColors.CLR_WHITE,
    elevation: 4,
    borderRadius: 50,
  },
  flexEnd: {
    alignSelf: 'center',
  },
  favIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
    zIndex: 1,
  },
});
