import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { removeToWishlist } from '../../../api/wishlist';
import images from '../../../assets/images';
import NoContentFound from '../../../Component/NoContentFound';
import { FontFamily } from '../../../Theme/FontFamily';
import { ThemeColors } from '../../../Theme/ThemeColors';
export default class Bars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      hostUrl: this.props.hostUrl
    };
  }

  removeFavorite = async (id, comboId = 0, productId = 0) => {
    const index = this.state.data.indexOf(x => x.wishlistId == id);
    try {
      const data = {
        wishlistId: id
      }
      await removeToWishlist(data);
      const updatedData = this.props.data.filter(x => x.wishlistId != id);
      this.props.onClick(updatedData, 'Bars');
    } catch (error) {
      console.log("Favorites > Bars > removeFavorite > Catch", error);
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }

  render() {
    return (
      <SafeAreaView>
        <>
          {this.props.data && this.props.data.length > 0 ?
            this.props.data.map((item, index) => (
              <View key={item.vendorId}>
                <TouchableOpacity
                  key={index}
                  style={styles.productView}
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetailBars', { id: item.ecom_ae_vendor.vendorId })
                  }>
                  <View style={styles.productInnerView}>
                    <TouchableOpacity
                      key={index}
                      style={styles.favIcon}
                      onPress={() => {
                        this.removeFavorite(item.wishlistId);
                      }}
                    >
                      <View style={styles.favContainer}>
                        <Image
                          resizeMode={'cover'}
                          source={images.heartFill}
                          defaultSource={images.heartFill}
                          style={styles.flexCenter}
                        />
                      </View>
                    </TouchableOpacity>
                    <Image
                      style={styles.prodImage}
                      resizeMode={'cover'}
                      //source={images.product1}
                      source={{ uri: `${this.state.hostUrl + item.ecom_ae_vendor.images}` }}
                    />
                    {/* </ImageBackground> */}
                  </View>

                  <View style={styles.itemContainer}>
                    {/* Name */}
                    <View>
                      <Text style={styles.vendorName}>
                        {item.ecom_ae_vendor.vendorShopName}
                      </Text>
                    </View>

                    <View style={styles.address}>
                      <Text
                        style={styles.addressText}>
                        {item.ecom_ae_vendor.address}
                      </Text>
                    </View>

                    <View
                      style={styles.bottomContainer}>
                      <View
                        style={styles.statusContainer}>
                        <Icon
                          name="fiber-manual-record"
                          size={18}
                          color="#26B90E"
                        />
                        <Text
                          style={styles.statusText}>
                          Open
                        </Text>
                      </View>

                      <View style={styles.distanceContainer}>
                        <Icon name="directions-run" size={20} color="#A1172F" />
                        <Text style={styles.distanceText}>
                          {(item.ecom_ae_vendor.distance).toFixed(2)}Km
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
            ) : (
              <NoContentFound title="No Data Found" />
            )}
        </>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  productView: {
    backgroundColor: ThemeColors.CLR_WHITE,
    //width: '90%',
    margin: 15,
    shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    //marginTop: 15,
  },
  productInnerView: {
    backgroundColor: ThemeColors.CLR_WHITE,
    height: '100%',
    width: 120,
    shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    //borderWidth:1,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  favContainer: {
    width: 33,
    height: 33,
    justifyContent: 'center',
    backgroundColor: ThemeColors.CLR_WHITE,
    elevation: 4,
    borderRadius: 50,
  },
  favIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 5,
    zIndex: 1,
  },
  flexCenter: {
    alignSelf: 'center',
  },
  prodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  itemContainer: {
    margin: 5,
    marginLeft: 15,
    flexDirection: 'column',
    flex: 1
  },
  vendorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4D4F50',
    fontFamily: FontFamily.TAJAWAL_REGULAR,
  },
  address: { width: '90%', marginTop: 5 },
  addressText: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontSize: 13,
    color: ThemeColors.CLR_DARK_GREY,
    fontWeight: '400',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '92%',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  statusContainer: { flexDirection: 'row', alignItems: 'center', },
  statusText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: ThemeColors.CLR_DARK_GREY,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    color: ThemeColors.CLR_DARK_GREY,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 5,
  }
});
