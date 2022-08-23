import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';

export default class PromotionCard extends React.Component {
  constructor(props) {
    super(props);
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
        <View style={styles.container}>
          <View
            style={styles.subContainer}
            onPress={() =>
              this.props.navigation.navigate('OrderHistoryDetail')
            }>
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
                    {productUnit[0].unitUserPrice}
                  </Text> :
                  <Text></Text>
                }
                {productUnit[0].unitDiscountPrice != " " && productUnit[0].unitDiscountType != null ?
                  <Text
                    style={styles.discountPrice}>
                    {productUnit[0].unitDiscountPrice + ' ' + productUnit[0].unitDiscountType}
                  </Text> :
                  <Text></Text>
                }
              </View>
            </View>
            {/* <View
                style={styles.qtyContainer}>
                <TouchableOpacity
                  //onPress={() => this.setState({ modalVisible: true })}
                  style={styles.icon}>
                  <Icon name="remove" size={18} color="#fff" />
                </TouchableOpacity>

                <Text
                  style={styles.inputQty}>
                  3
                </Text>
                <TouchableOpacity
                  //onPress={() => this.setState({ modalVisible: true })}
                  style={styles.icon}>
                  <Icon name="add" size={18} color="#fff" />
                </TouchableOpacity>
              </View> */}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { margin: 10 },
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
