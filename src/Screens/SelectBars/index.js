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
export default class SelectBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      visibilityQuantity: 30,
      modalVisible: false,
      itemselected: false,
    };
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <HeaderSide
          name={'Select Bars'}
          onClick={() => this.props.navigation.pop()}
        />
        <ScrollView>
          <View
            style={{
              width: '96%',
              height: 150,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 150,
              }}>
              <View
                style={{
                  width: '40%',
                  //   top:'10%',
                  //   left:10
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  style={{
                    width: 66,
                    height: 118,
                  }}
                  resizeMode={'cover'}
                  source={images.product2}
                  defaultSource={images.product2}
                />
              </View>
              <View
                style={{
                  width: '70%',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '700',
                    color: '#4D4F50',
                    top: 20,
                    // left: 20,
                  }}>
                  Chivas Regal
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: '#424242',
                    top: 25,
                    left: 5,
                  }}>
                  Available Qty: 500 ml
                </Text>

                <View
                  style={{
                    top: 50,
                    left: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="more-time"
                    size={25}
                    color="#A39B9B"
                    // style={styles.imageStyle}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#424242',
                      left: 5,
                    }}>
                    Valid until: 20 Jun 2021
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              marginTop: '5%',
              marginBottom: '2%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: '#4D4F50',
              }}>
              Redeemable in Bars
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#ACACAC',
                marginTop: 5,
              }}>
              Select your nearest bar and redeem your drink
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.state.itemselected
                ? this.setState({itemselected: false})
                : this.setState({itemselected: true});
            }}
            style={{
              width: '96%',
              height: 154,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5,
              borderRadius: 10,
              borderWidth: this.state.itemselected ? 2 : 0,
              borderColor: '#B41430',
            }}>
            <View
              style={{
                alignSelf: 'center',
                // left: 10,
              }}>
              <ImageBackground
                style={{
                  width: 165,
                  height: 153,
                }}
                imageStyle={{
                    borderRadius:10
                }}
                resizeMode={'cover'}
                source={images.nearMe}
                defaultSource={images.nearMe}
              >
                  <View style={{
                      backgroundColor:'#B41430',
                      marginTop:128,
                      height:25,
                      borderBottomLeftRadius:10,
                      borderBottomRightRadius:10
                  }}>
                      <Text style={{
                          fontSize:18,
                          fontWeight:'700',
                          color:'#fff',
                          alignSelf:'center'
                      }}>Featured</Text>
                  </View>
            </ImageBackground>
            </View>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: '700',
                  color: '#424242',
                  top: 20,
                  left: 20,
                }}>
                New Town Bar
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#424242',
                  top: 25,
                  left: 20,
                }}>
                Odeon Towers Extension Rooftop, Singapore
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 50,
                }}>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="fiber-manual-record"
                    size={15}
                    color="#26B90E"
                    style={{marginTop: 2, marginLeft: 20}}
                  />
                  <Text style={{color: '#3C3C3C', marginLeft: 5}}>open</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="directions-run"
                    size={16}
                    color="#808080"
                    style={{marginTop: 2}}
                  />
                  <Text style={{color: '#3C3C3C', marginLeft: 5}}>2.8Km</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {this.state.itemselected ? (
            <View style={{marginTop: '5%'}}>
              <TouchableOpacity
                style={styles.save}
                onPress={() => this.props.navigation.navigate('Redeem')}>
                <Text style={{color: '#fff', fontSize: 15}}>Continue</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* <View
            style={{
              width: '96%',
              height: 325,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 150,
              }}>
              <View
                style={{
                  width: '40%',
                  //   top:'10%',
                  //   left:10
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  style={{
                    width: 59,
                    height: 115,
                  }}
                  resizeMode={'cover'}
                  source={images.product2}
                  defaultSource={images.product2}
                />
              </View>
              <View
                style={{
                  width: '50%',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#4D4F50',
                    top: 20,
                    left: 20,
                  }}>
                  Bud Lite
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#424242',
                    top: 25,
                    left: 20,
                  }}>
                  Beer
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#424242',
                    top: 25,
                    left: 20,
                  }}>
                  Available Qty: 150 ml
                </Text>
              </View>
            </View>

            <View
              style={{
                marginLeft: 15,
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#4D4F50',
                }}>
                Select Quantity:
              </Text>
              <View
                style={{
                  //   flexDirection: 'row',
                  justifyContent: 'space-around',
                  top: 5,
                  width: '70%',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({visibilityQuantity: 30})}
                  style={
                    this.state.visibilityQuantity == 30
                      ? styles.itemQuantitySelectedNew
                      : styles.itemQuantity
                  }>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="wine-bar" size={22} color="#7B7B7B" />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#7B7B7B',
                        marginLeft: 5,
                      }}>
                      pint (500ml)
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({visibilityQuantity: 60})}
                  style={
                    this.state.visibilityQuantity == 60
                      ? styles.itemQuantitySelectedNew
                      : styles.itemQuantity
                  }>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="wine-bar" size={22} color="#7B7B7B" />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#7B7B7B',
                        marginLeft: 5,
                      }}>
                      Pitcher (2ltr)
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({visibilityQuantity: 90})}
                  style={
                    this.state.visibilityQuantity == 90
                      ? styles.itemQuantitySelectedNew
                      : styles.itemQuantity
                  }>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="wine-bar" size={22} color="#7B7B7B" />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#7B7B7B',
                        marginLeft: 5,
                      }}>
                      Tower (3 ltr)
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}

          {/* <View
            style={{
              width: '96%',
              height: 240,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                margin: 15,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  padding: 0,
                  backgroundColor: '#939393',
                  borderRadius: 20,
                }}
                onPress={() => this.setState({modalVisible: true})}>
                <Icon name="add" size={28} color="#fff" />
              </TouchableOpacity>

              <View style={{marginLeft: 20}}>
                <Text
                  style={{fontSize: 20, color: '#969696', fontWeight: '700'}}>
                  Add More Items
                </Text>
              </View>
            </View>

            <View
              style={{
                margin: 15,
                // alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#4D4F50',
                }}>
                Table No:
              </Text>

              <View style={styles.sectionStyleTable}>
                <TextInput
                  style={{flex: 1}}
                  placeholder="Table No"
                  underlineColorAndroid="transparent"
                  placeholderTextColor={'#DADADA'}
                />
              </View>
            </View>

            <View style={{marginTop: 5, marginBottom: 10}}>
              <TouchableOpacity
                style={styles.save}
                onPress={() => this.props.navigation.navigate('MyCard')}>
                <Text style={{color: '#fff', fontSize: 15}}>REDEEM</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <View
            style={{
              marginBottom: '5%',
            }}
          />
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView>
              <View
                style={{
                  height: 118,
                  backgroundColor: '#AF1731',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      color: '#fff',
                    }}>
                    Redeem Details
                  </Text>
                  <TouchableOpacity>
                    <Icon name="close" size={32} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  height: 108,
                  width: 330,
                  backgroundColor: '#fff',
                  marginTop: -20,
                  alignSelf: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: '500',
                      color: '#C11331',
                    }}>
                    Redeemed
                  </Text>

                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '700',
                      color: '#7B7B7B',
                      marginTop: 5,
                    }}>
                    NewTown Bar
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: '#424242',
                      marginTop: 10,
                    }}>
                    20 Jun 2021 10:00 PM
                  </Text>
                </View>
              </View>

              <View
                style={{
                  // height: 108,
                  width: 330,
                  backgroundColor: '#fff',
                  marginTop: '10%',
                  alignSelf: 'center',
                  borderRadius: 5,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '35%',
                        height: 130,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        // style={styles.productImg}
                        resizeMode={'cover'}
                        source={images.product2}
                        defaultSource={images.product2}
                      />
                    </View>

                    <View
                      style={{
                        width: '65%',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: '700',
                          color: '#4D4F50',
                        }}>
                        Chivas Regal 12
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: '#7B7B7B',
                        }}>
                        60ml - 2 Glass
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: '#7B7B7B',
                        }}>
                        Pepsi
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 0.7,
                    width: 330,
                    alignSelf: 'center',
                    backgroundColor: '#4D4F50',
                  }}
                />

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '35%',
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        // style={styles.productImg}
                        resizeMode={'cover'}
                        source={images.product2}
                        defaultSource={images.product2}
                      />
                    </View>

                    <View
                      style={{
                        width: '65%',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: '700',
                          color: '#4D4F50',
                        }}>
                        Chivas Regal 12
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: '#7B7B7B',
                        }}>
                        60ml - 2 Glass
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: '#7B7B7B',
                        }}>
                        Pepsi
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 0.7,
                    width: 330,
                    alignSelf: 'center',
                    backgroundColor: '#4D4F50',
                  }}
                />
              </View>

              <View style={{marginTop: '20%'}}>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => this.props.navigation.navigate('MyCard')}>
                  <Text style={{color: '#fff', fontSize: 15}}>REDEEM</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 2,
  },
  itemQuantitySelected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 1,
    padding: 2,
    borderRadius: 10,
    borderColor: '#A1172F',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: '#ACACAC',
    height: 44,
    width: 320,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
    right: '10%',
    marginTop: '2%',
  },
  itemQuantitySelectedNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 1,
    padding: 2,
    borderRadius: 10,
    borderColor: '#A1172F',
    width: 132,
  },
  sectionStyleTable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: '#ACACAC',
    height: 44,
    width: 320,
    borderRadius: 5,
    marginTop: 10,
    elevation: 2,
    // marginRight:'15%'
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
});
