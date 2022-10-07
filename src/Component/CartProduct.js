import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showAlert } from '../api/auth';
import { addToCart, updateToCart } from '../api/product';
import images from '../assets/images';
import { getAccessToken } from '../localstorage';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';
import ThemeFullPageLoader from './ThemeFullPageLoader';
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
      this.setState({ loader: true });
      const cartItem = {
        cartId: this.state.data.cartId,
        type: type,
      };
      try {
        this.props.onCart(true)
        const res = await updateToCart(cartItem);
        let amount = res.response.amountData;
        const cartQty = this.state.qty;
        if (type == 1) {
          this.state.qty = cartQty + 1;
        } else {
          this.state.qty = cartQty - 1;
        }
        this.setState({ qty: this.state.qty, loader: false });
        const data = {
          qty: this.state.qty,
          data: amount,
          id: this.props.item.cartId
        }
        ToastAndroid.showWithGravity(
          type == 1 ? 'Item added to cart successfully' : 'Item remove to cart successfully',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        this.props.onChange(data);
        this.props.onCart(false)
      } catch (error) {
        console.log(error)
        ToastAndroid.showWithGravity(
          error ?? 'Error while performing action',
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
        {

          <View style={styles.container} key={index} >
            <View style={styles.subContainer}>
              {/* Image */}
              <View style={styles.productInnerView}>
                {this.props.item.ecom_aca_product_unit && this.props.item.ecom_aca_product_unit.ecom_ac_product ?
                  <Image
                    style={styles.prodImage}
                    resizeMode={'cover'}
                    source={{ uri: `${hostUrl + this.props.item.ecom_aca_product_unit.ecom_ac_product.images}` }}
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
                  {this.props.item.ecom_aca_product_unit && this.props.item.ecom_aca_product_unit.ecom_ac_product ?
                    <Text style={styles.title}>
                      {this.props.item.ecom_aca_product_unit.ecom_ac_product.name}
                    </Text>
                    :
                    <Text style={styles.title}>{this.props.item.ecom_ea_combo.name}</Text>}
                </View>
                <View>
                  <Text
                    style={styles.qty}>
                    {this.props.item.unitQty + ' ' + this.props.item.unitType}
                  </Text>
                </View>
                <View
                  style={styles.priceContainer}>
                  {this.props.item.ecom_aca_product_unit && this.props.item.ecom_aca_product_unit.unitUserPrice != '' ?
                    <Text
                      style={styles.priceText}>
                      ${this.props.item.ecom_aca_product_unit.unitUserPrice}
                    </Text>
                    :
                    <Text style={styles.priceText}>{this.props.item.productAmount != 0 ? '$'+this.props.item.productAmount : ''}</Text>
                  }
                  {this.props.item.ecom_aca_product_unit && this.props.item.ecom_aca_product_unit.unitDiscountPrice ?
                    <Text style={styles.discountPrice}>
                      {this.props.item.ecom_aca_product_unit.unitDiscountPrice != '' ? this.props.item.ecom_aca_product_unit.unitDiscountType:""}
                    </Text>
                    :
                    <Text style={styles.discountPrice}>{this.props.item.productDiscountAmount != "" ? '$'+this.props.item.productDiscountAmount : '' }</Text>
                  }
                </View>
              </View>

              <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              >





                <TouchableOpacity
                  onPress={() => { this.updateCart(2) }}
                  style={styles.icon}>
                  <Icon name="remove" size={20} color="#fff" />
                </TouchableOpacity>

                <Text
                  style={styles.inputQty}>
                  {this.state.qty}
                </Text>
                {/* {this.state.loader ? <ThemeFullPageLoader /> : */}
                <TouchableOpacity
                  onPress={() => { this.updateCart(1) }}
                  style={styles.icon}>
                  <Icon name="add" size={20} color="#fff" />
                </TouchableOpacity>

              </View>

            </View>
          </View>
        }
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 0,
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
    marginTop: 5,
    // marginBottom:15,
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
    marginHorizontal:5,
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
