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
    console.log('=========>>>', this.state.data);

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
                    // console.log("++++",`${this.props.route.params.hostUrl+item.ecom_ae_vendor.images}`)
                    // this.props.navigation.navigate('ProductDetailBars',{id:item.ecom_ae_vendor.vendorId})
                    // this.props.navigation.navigate('ProductDetailBars')
                    console.log('go to bar details')
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
                  <View style={{ margin: 5, marginLeft: 15 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // marginTop: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#424242',
                          fontFamily: 'Roboto-Regular',
                        }}>
                        {item.ecom_ae_vendor.vendorShopName}
                      </Text>
                    </View>

                    <View style={{ width: '80%', marginTop: 5 }}>
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
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                      }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                          open
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          left: '50%',
                        }}>
                        <Icon name="directions-run" size={20} color="#A1172F" />
                        <Text
                          style={{
                            color: '#424242',
                            fontSize: 14,
                            fontWeight: '500',
                            marginLeft: 5,
                          }}>
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
  productView: {
    backgroundColor: '#fff',
    height: 115,
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
    height: 115,
    width: 121,
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
});
