import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import NoContentFound from '../../../Component/NoContentFound';
export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      hostUrl:props.hostUrl
    };
  }

  render() {
    this.state.data.map(x=>{
      console.log("Images",this.state.hostUrl+x.ecom_ac_product.images); 
    })
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <>
          {this.state.data &&
            this.state.data.length > 0 ? (
            this.state.data.map(item => (
              
              <View>
                <TouchableOpacity
                  key={item.productId}
                  style={styles.productView}
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetailDrinks')
                  }>
                  <View style={{ margin: 5, marginLeft: 10 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: '#4D4F50',
                        }}>
                          {item.ecom_ac_product.name}
                        
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#4D4F50',
                          fontWeight: '400',
                        }}>
                        Blended
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#4D4F50',
                          fontWeight: '400',
                          marginLeft: 10,
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
                    <Image
                      resizeMode={'cover'}
                      source={{ uri: `${this.state.hostUrl+item.ecom_ac_product.images}`}}
                      //defaultSource={images.product2}
                    />
                    <TouchableOpacity style={styles.favIcon}>
                      {/* <Icon name="favorite" size={25} color="#FF1405" /> */}
                      <Image
                        resizeMode={'cover'}
                        source={images.heart}
                        defaultSource={images.heart}
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
    justifyContent: 'space-between',
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
