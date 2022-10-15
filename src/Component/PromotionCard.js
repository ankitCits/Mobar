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
  }

  handleRedirect = (item) => {
    if (item.type == 1) {
      this.props.navigation.navigate('ProductDetailBars', { id: item.vendorId });
    } else {
      this.props.navigation.navigate('ProductDetailDrinks', { id: item.productId })
    }

  }

  render() {
    const {
      item,
      hostUrl,
      navigation,
      index,
      //productUnit = this.props.item.ecom_ac_product.ecom_aca_product_units,
    } = this.props;

    return (

      <>
        {/* <View style={styles.container}> */}
        {this.state}
        <TouchableOpacity
          onPress={() => { this.handleRedirect(item) }

          }>
          <View
            style={styles.subContainer}>
            <View style={styles.productInnerView}>
              <Image
                resizeMode={'cover'}
                style={{
                  borderRadius: 10,
                  width:'100%',
                  height: 200
                }}
                source={{ uri: `${this.props.hostUrl + item.image}` }}
              />
            </View>
            <View style={styles.details}>
              <View
                style={styles.header}>
                <Text
                  style={styles.title}>
                  {item.title}
                </Text>
              </View>
              <View>
                <Text
                  style={styles.qty}>
                  {/* {productUnit[0].unitQty} {productUnit[0].unitType} */}
                </Text>
              </View>

              <View
                style={styles.priceContainer}>
                {/* {productUnit[0].unitUserPrice != " " || productUnit[0].unitUserPrice != null ?
                  <Text
                    style={styles.priceText}>
                    {'$ ' + productUnit[0].unitUserPrice}
                  </Text> :
                  <Text></Text>
                } */}
                {/* {productUnit[0].unitDiscountPrice != " " && productUnit[0].unitDiscountType != null ?
                  <Text
                    style={styles.discountPrice}>
                    {productUnit[0].unitDiscountPrice + ' ' + productUnit[0].unitDiscountType}
                  </Text> :
                  <Text style={styles.discountPrice}></Text>
                } */}
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
    flexDirection: 'column',
    marginVertical: 15,
  },
  productInnerView: {
    //width: '28%',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  details: {
    margin: 5,
    alignSelf: 'flex-start',
    marginHorizontal: 10
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
