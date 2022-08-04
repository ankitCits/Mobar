import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';

export default class ProductDetailDrinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      visibilityQuantity: 30,
    };
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}>
        <ScrollView>
          <View style={{backgroundColor: '#fff'}}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 390,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <View
                style={{
                  margin: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                  <Icon name="arrow-back" size={28} color="#424242" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                  <Icon name="favorite" size={28} color="#FF1405" />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  margin: 15,
                }}>
                <View
                  style={{
                    width: '70%',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#000',
                      fontWeight: '700',
                    }}>
                    Chivas Regal 12
                  </Text>

                  <Text
                    style={{
                      fontSize: 25,
                      color: '#741929',
                      fontWeight: '700',
                      marginTop: 20,
                    }}>
                    $122
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                      fontWeight: '400',
                      marginTop: 10,
                    }}>
                    100 glass of 30 ml
                  </Text>

                  <ImageBackground
                    style={{
                      width: 161,
                      height: 26,
                      marginTop: 20,
                      right: 15,
                    }}
                    resizeMode={'cover'}
                    source={images.savedTag}
                    defaultSource={images.savedTag}>
                    <View
                      style={{
                        marginLeft: 15,
                        marginTop: 2,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#fff',
                          fontStyle: 'italic',
                        }}>
                        You Save:
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#fff',
                          fontStyle: 'italic',
                        }}>
                        {' '}
                        $100.00
                      </Text>
                    </View>
                  </ImageBackground>

                  <View
                    style={{
                      marginTop: '30%',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 15,
                        fontWeight: '500',
                      }}>
                      Quantity:
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setState({visibilityQuantity: 30})}
                        style={
                          this.state.visibilityQuantity == 30
                            ? styles.itemQuantitySelected
                            : styles.itemQuantity
                        }>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#99182E',
                              fontWeight: '500',
                            }}>
                            30ml
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => this.setState({visibilityQuantity: 60})}
                        style={
                          this.state.visibilityQuantity == 60
                            ? styles.itemQuantitySelected
                            : styles.itemQuantity
                        }>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#99182E',
                              fontWeight: '500',
                            }}>
                            60ml
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => this.setState({visibilityQuantity: 90})}
                        style={
                          this.state.visibilityQuantity == 90
                            ? styles.itemQuantitySelected
                            : styles.itemQuantity
                        }>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#99182E',
                              fontWeight: '500',
                            }}>
                            90ml
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '30%',
                    alignItems: 'center',
                    marginTop: '5%',
                  }}>
                  <Image
                    style={styles.mainProductImg}
                    resizeMode={'cover'}
                    source={images.product2}
                    defaultSource={images.product2}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                height: 200,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
                marginTop: 1,
                //   borderRadius: 20,
              }}>
              <View style={{margin: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <View />
                  <View
                    style={{
                      // marginTop: 20,
                      // marginLeft: 20
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#AD1832',
                        width: 192,
                        height: 44,
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 15,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          paddingLeft: 15,
                          color: '#fff',
                          fontWeight: '700',
                        }}>
                        ADD TO CART
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#D46679',
                          width: 61,
                          height: 44,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        <Icon
                          name="card"
                          size={25}
                          color="#fff"
                          // style={{marginRight: 7}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity style={{}}>
                    <Icon
                      name="favorite"
                      size={30}
                      color="#FF1405"
                      style={{marginRight: 7}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 30}}>
                  <Text
                    style={{
                      color: '#424242',
                      fontWeight: '400',
                      fontSize: 15,
                    }}>
                    Chivas Regal 12 years is a full-flavoured, rich and
                    sophisticated Cuban rum with a high degree of class.
                    deservedly popular rum.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{margin: 0, marginTop: 20}}>
            <View style={{margin: 15}}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#4D4F50',
                }}>
                Redeemable in Bars
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#ACACAC',
                  marginTop: 5,
                }}>
                Select your nearest bar and redeem your drink
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                marginTop: 15,
              }}>
              <View style={{margin: 15}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetailBars')
                  }>
                  <View>
                    <Image
                      style={{
                        width: 96,
                        height: 65,
                      }}
                      resizeMode={'cover'}
                      source={images.barProduct}
                      defaultSource={images.barProduct}
                    />
                  </View>

                  <View style={{margin: 0, marginLeft: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // alignItems: 'center',
                        // marginTop: 5,
                      }}>
                      <Icon name="wine-bar" size={20} color="#711323" />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#4D4F50',
                          marginLeft: 5,
                        }}>
                        Charlie’s Bar
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        // alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Icon name="place" size={20} color="#711323" />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#4D4F50',
                          marginLeft: 5,
                        }}>
                        St 07, Buliding
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Icon name="directions-run" size={20} color="#711323" />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#4D4F50',
                          marginLeft: 5,
                        }}>
                        2.8Km
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      // margin: 10,
                      marginLeft: 30,
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Icon
                        name="fiber-manual-record"
                        size={18}
                        color="#38C720"
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#38C720',
                          fontWeight: '500',
                          marginLeft: 5,
                        }}>
                        Open
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.productUnderline} />


              <View style={{margin: 15}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetailBars')
                  }>
                  <View>
                    <Image
                      style={{
                        width: 96,
                        height: 65,
                      }}
                      resizeMode={'cover'}
                      source={images.barProduct}
                      defaultSource={images.barProduct}
                    />
                  </View>

                  <View style={{margin: 0, marginLeft: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // alignItems: 'center',
                        // marginTop: 5,
                      }}>
                      <Icon name="wine-bar" size={20} color="#711323" />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#4D4F50',
                          marginLeft: 5,
                        }}>
                        Charlie’s Bar
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        // alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Icon name="place" size={20} color="#711323" />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#4D4F50',
                          marginLeft: 5,
                        }}>
                        St 07, Buliding
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Icon name="directions-run" size={20} color="#711323" />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#4D4F50',
                          marginLeft: 5,
                        }}>
                        2.8Km
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      // margin: 10,
                      marginLeft: 30,
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Icon
                        name="fiber-manual-record"
                        size={18}
                        color="#FF2121"
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#FF2121',
                          fontWeight: '500',
                          marginLeft: 5,
                        }}>
                        Closed
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.productUnderline} />
              
            </View>
          </View>

          <View
            style={{
              marginTop: '10%',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 1,
                shadowRadius: 10,

                elevation: 5,
                backgroundColor: '#fff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
              }}>
              <View style={{margin: 20}}>
                <View>
                  <Text
                    style={{
                      color: '#ACACAC',
                      fontWeight: '500',
                    }}>
                    Item added to cart successfully
                  </Text>
                </View>

                <View style={{marginTop: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        color: '#000',
                      }}>
                      Chivas Regal 12
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity>
                        <Icon name="remove" size={20} color="#4D4F50" />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: '#000',
                        }}>
                        {' '}
                        1{' '}
                      </Text>
                      <TouchableOpacity>
                        <Icon name="add" size={20} color="#4D4F50" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{marginTop: '10%', marginBottom: 10}}>
                    <TouchableOpacity
                      style={styles.save}
                      onPress={() => this.props.navigation.navigate('MyCard')}>
                      <Text style={{color: '#fff', fontSize: 15}}>
                        VIEW CART
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  productImg: {
    //   width:361,
    height: 241,
  },
  productView: {
    backgroundColor: '#fff',
    height: 100,
    width: 328,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderRadius: 12,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  productInnerView: {
    backgroundColor: '#fff',
    height: 100,
    width: '26%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  mainProductImg: {
    width: 102,
    height: 197,
  },
  itemQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
  },
  itemQuantitySelected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#A1172F',
    width: 87,
    height: 25,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  productUnderline: {
    height: 0.7,
    backgroundColor: '#ACACAC',
  },
});
