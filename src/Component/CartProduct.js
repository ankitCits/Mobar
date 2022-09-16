import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showAlert } from '../api/auth';
import { addToCart, removeFromCart, updateToCart } from '../api/product';
import images from '../assets/images';
import { getAccessToken } from '../localstorage';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';
export default class CartProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.item,
      qty: parseInt(this.props.item.qty)
    };
  }

  updateCart = async (type) => {
    const token = await getAccessToken();
    if (token == null) {
      showAlert();
    } else {
      const cartItem = {
        cartId: this.state.data.cartId,
        type: type,
      };
      try {
        const response = await updateToCart(cartItem);
        this.props.onChange(this.state.qty, this.state.data.cartId);
        if (type == 1) {
          const qty = this.state.qty + 1;
          this.setState({ qty: qty });
        } else {
          const qty = this.state.qty - 1;
          this.setState({ qty: qty });
        }
      } catch (error) {
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      }
    }
  }

  // onChange = (qty) => {
  //   return qty;
  // }

  render() {
    const {
      item,
      hostUrl,
      navigation,
      index
    } = this.props;
    return (
      <>
        <TouchableOpacity style={styles.container} key={index} >
          <View style={styles.subContainer} key={index}>
            {/* Image */}
            <View style={styles.productInnerView}>
              {this.state.data.ecom_aca_product_unit && this.state.data.ecom_aca_product_unit.ecom_ac_product ?
                <Image
                  style={styles.prodImage}
                  resizeMode={'cover'}
                  source={{ uri: `${hostUrl + this.state.data.ecom_aca_product_unit.ecom_ac_product.images}` }}
                /> :
                <Image
                  style={styles.prodImage}
                  resizeMode={'cover'}
                  source={images.product1}
                />
              }
            </View>
            <View style={styles.details}>
              <View style={styles.header}>
                {this.state.data.ecom_aca_product_unit && this.state.data.ecom_aca_product_unit.ecom_ac_product ?
                  <Text style={styles.title}>
                    {this.state.data.ecom_aca_product_unit.ecom_ac_product.name}
                  </Text>
                  :
                  <Text style={styles.title}>Not Available</Text>}
              </View>
              <View>
                <Text
                  style={styles.qty}>
                  {this.state.data.unitQty + ' ' + this.state.data.unitType}
                </Text>
              </View>
              <View
                style={styles.priceContainer}>
                {this.state.data.ecom_aca_product_unit ?
                  <Text
                    style={styles.priceText}>
                    ${this.state.data.ecom_aca_product_unit.unitUserPrice}
                  </Text>
                  :
                  <Text style={styles.priceText}>Not Available</Text>
                }
                {this.state.data.ecom_aca_product_unit && this.state.data.ecom_aca_product_unit.unitDiscountPrice ?
                  <Text style={styles.discountPrice}>
                    ${this.state.data.ecom_aca_product_unit.unitDiscountType}
                  </Text>
                  :
                  <Text style={styles.discountPrice}></Text>
                }
              </View>
            </View>
            <View
              style={styles.qtyContainer}>
              <TouchableOpacity
                onPress={() => { this.updateCart(2) }}
                style={styles.icon}>
                <Icon name="remove" size={18} color="#fff" />
              </TouchableOpacity>

              <Text
                style={styles.inputQty}>
                {this.state.qty}
              </Text>
              <TouchableOpacity
                onPress={() => { this.updateCart(1) }}
                style={styles.icon}>
                <Icon name="add" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 5,
    //paddingBottom:8,
    //backgroundColor:"powderblue"
  },
  subContainer: {
    backgroundColor: ThemeColors.CLR_WHITE,
    width: '100%',
    shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderRadius: 12,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 15,
    //marginBottom:15,
  },
  productInnerView: {
    width: '28%',
    height: 115,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prodImage: {
    width: 100,
    height: 100,
    marginLeft: 7,
  },
  details: {
    alignSelf: 'center',
    marginLeft: 20,
    width: 120,//140,
  },
  header: {
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: '#4D4F50',
    width: 150
  },
  qty: {
    fontSize: 14,
    color: ThemeColors.CLR_DARK_GREY,
    fontWeight: '400',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 100
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  priceText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 21,
    color: ThemeColors.CLR_DARK_GREY,
    fontWeight: '700',
  },
  discountPrice: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 15,
    color: '#969696',
    fontWeight: '400',
    marginTop: 5,
    textDecorationLine: 'line-through',
  },
  icon: {
    backgroundColor: '#A1172F',
    padding: 2,
    borderRadius: 20,
  },
  inputQty: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 19,
    fontWeight: '500',
    color: '#A1172F',
    marginLeft: 10,
    marginRight: 10,
  },
});
