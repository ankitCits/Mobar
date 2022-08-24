import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import images from '../../../assets/images';
import NoContentFound from '../../../Component/NoContentFound';
import { FontFamily } from '../../../Theme/FontFamily';
import { ThemeColors } from '../../../Theme/ThemeColors';
export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  removeFavorite = (id) => {
    console.log("Id", id);
  }

  handleRedirect = (item) => {
    if (item.ecom_ac_product && item.ecom_ac_product.productId) {
      this.props.navigation.navigate('ProductDetailDrinks', { id: item.ecom_ac_product.productId });
    }
  }

  render() {
    const {
      hostUrl,
      navigation,
      index
    } = this.props;
    console.log("Favorites > Drinks > Data", this.state.data);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <>
          {this.state.data && this.state.data.length > 0 ? (
            this.state.data.map(item => (
              <View>
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
                        Blended
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#4D4F50',
                          fontWeight: '400',
                          marginLeft: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        350ml
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
                          fontSize: 21,
                          color: '#424242',
                          fontWeight: '700',
                        }}>
                        $99
                      </Text>

                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 15,
                          color: '#969696',
                          textDecorationLine: 'line-through',
                        }}>
                        $100
                      </Text>

                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 11,
                          color: '#B51D36',
                        }}>
                        Save $100..
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        marginTop: 7,
                        alignItems: 'center',
                        width: 94,
                        height: 24,
                        backgroundColor: '#B51D36',
                        justifyContent: 'center',
                        borderRadius: 12,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#424242',
                          fontWeight: '500',
                          color: '#fff',
                        }}>
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.productInnerView}>
                    {item.ecom_ac_product ?
                      <Image
                        style={{ width: 85, height: 85 }}
                        resizeMode={'cover'}
                        source={{ uri: `${hostUrl + item.ecom_ac_product.images}` }}
                      //defaultSource={images.product2}
                      /> :
                      <Image
                        style={{ width: 85, height: 85 }}
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
                      <Image
                        resizeMode={'cover'}
                        source={images.heartFill}
                        defaultSource={images.heartFill}
                      />
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
  productView: {
    backgroundColor: ThemeColors.CLR_WHITE,
    height: 130,
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
    justifyContent: 'space-between',
  },
  itemContainer: {
    margin: 5,
    marginLeft: 10
  },
  header: {
    flexDirection: 'row',
    marginTop: 5,
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
  productInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 125,
  },
  favIcon: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
});
