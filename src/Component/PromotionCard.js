import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';

export default class PromotionCard extends React.Component {
  constructor(props) {
    super(props);
    console.log("promotion card > item > ",props.item);
  }

  render() {
    const {
      item,
      hostUrl,
      navigation,
      index,
      productUnit = this.props.item.ecom_ac_product.ecom_aca_product_units,
    } = this.props;

    return (

      <>
        {/* <View style={styles.container}> */}
        {this.state}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetailDrinks', { id: item.productId })
          }>
          <View
            style={styles.subContainer}>
            <View style={styles.productInnerView}>
              <Image
                resizeMode={'cover'}
                source={{ uri: `${hostUrl + item.images}` }}
              />
            </View>
            <View style={styles.details}>
              <View
                style={styles.header}>
                <Text
                  style={styles.title}>
                  {item.ecom_ac_product.name}
                </Text>
              </View>
              <View>
                <Text
                  style={styles.qty}>
                  {productUnit[0].unitQty} {productUnit[0].unitType}
                </Text>
              </View>

              <View
                style={styles.priceContainer}>
                {productUnit[0].unitUserPrice != " " || productUnit[0].unitUserPrice != null ?
                  <Text
                    style={styles.priceText}>
                    {'$ ' + productUnit[0].unitUserPrice}
                  </Text> :
                  <Text></Text>
                }
                {productUnit[0].unitDiscountPrice != " " && productUnit[0].unitDiscountType != null ?
                  <Text
                    style={styles.discountPrice}>
                    {productUnit[0].unitDiscountPrice + ' ' + productUnit[0].unitDiscountType}
                  </Text> :
                  <Text style={styles.discountPrice}></Text>
                }
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* </View> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  // container: { margin: 10 },
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
  },
  productInnerView: {
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    margin: 5,
    alignSelf: 'center',
    marginLeft: 0
  },
  header: {
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: '#4D4F50'
  },
  qty: {
    fontSize: 14,
    color: ThemeColors.CLR_DARK_GREY,
    fontWeight: '400',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  qtyContainer: {
    marginLeft: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
    margin: 5,
    textDecorationLine: 'line-through',
  },
});
