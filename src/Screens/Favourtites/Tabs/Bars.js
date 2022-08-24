import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import NoContentFound from '../../../Component/NoContentFound';
export default class Bars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      hostUrl: props.hostUrl
    };
  }

  render() {
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
                  key={item.vendorId}
                  style={styles.productView}
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetailBars', { id: item.ecom_ae_vendor.vendorId })
                  }>

                  <View style={styles.productInnerView}>
                    <Image
                      style={{
                        width: 75,
                        height: 75,
                      }}
                      resizeMode={'cover'}
                      source={{ uri: `${this.state.hostUrl + item.ecom_ae_vendor.images}` }}
                    />
                  </View>

                  <View style={{ margin: 5, marginLeft: 15, flexDirection: 'column', flex: 1 }}>
                    {/* Name */}
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.vendorName}>
                        {item.ecom_ae_vendor.vendorShopName}
                      </Text>
                    </View>

                    <View style={{ width: '80%', marginTop: 5, flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#4D4F50',
                          fontWeight: '400',
                        }}>
                        {item.ecom_ae_vendor.address}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'flex-end'
                      }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Icon
                          name="fiber-manual-record"
                          size={18}
                          color="#26B90E"
                        />
                        <Text
                          style={{
                            color: '#424242',
                            fontSize: 15,
                            fontWeight: '500',
                            marginLeft: 5,
                          }}>
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
            ))
          ) : (
            <NoContentFound title="No Data Found" />
          )}
        </>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  vendorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#424242',
    fontFamily: 'Roboto-Regular',
  },
  productView: {
    backgroundColor: '#fff',
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
    // justifyContent: 'space-between',
  },
  productInnerView: {
    backgroundColor: '#fff',
    height: 120,
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  favIcon: {
    alignSelf: 'flex-start',
    marginLeft: '20%',
    marginTop: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    color: '#424242',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  }
});
