import React, { Component } from 'react';
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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchRedeemBars } from '../../api/vendor';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
import { connect } from 'react-redux';

class SelectBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      visibilityQuantity: 30,
      modalVisible: false,
      collectionWallet: {},
      itemSelected: 0,
      hostUrl: '',
      data: {}
    };
    console.log("route data", props.route.params.data);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      this.setState({ isLoading: true });
      const data = {
        walletId: this.props.route.params.data.walletId,
        productId: this.props.route.params.data.productId,
        latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : 1.28668,
        longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : 103.853607,
      };

      const response = await fetchRedeemBars(data);
      this.setState({
        hostUrl: response.response.result.hostUrl,
        data: response.response.result.productWithBar,
        collectionWallet: response.response.result.collectionWallet,
        isLoading: false
      });

    } catch (error) {
      console.log("Select bars > catch > error", error);
      this.setState({ isLoading: false });
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }

  onContinue = () => {
    const items = this.state.data;
    items.collectionWallet = this.state.collectionWallet
    items.ecom_ae_vendors = this.state.itemSelected;
    items.hostUrl = this.state.hostUrl;
    this.state.data.selectedQty = 0;
    this.state.data.inputQty = 0;
    const data = {
      walletId: this.state.collectionWallet.walletId,
      availableQty: this.state.collectionWallet.availableQty,
      unitType: this.state.collectionWallet.unitType,
      vendorShopName: this.state.itemSelected.vendorShopName,
      description: this.state.itemSelected.description,
      images: this.state.itemSelected.images,
      vendorId: this.state.itemSelected.vendorId,
      hostUrl: this.state.hostUrl,
      ecom_aca_product_unit: {
        productUnitId: this.state.collectionWallet.ecom_aca_product_unit ? this.state.collectionWallet.ecom_aca_product_unit.productUnitId : 0,
        unitType: this.state.collectionWallet.ecom_aca_product_unit ? this.state.collectionWallet.ecom_aca_product_unit.unitType : '',
        unitQty: this.state.collectionWallet.ecom_aca_product_unit ? this.state.collectionWallet.ecom_aca_product_unit.unitQty : 0,
        unitUserPrice: this.state.collectionWallet.ecom_aca_product_unit ? this.state.collectionWallet.ecom_aca_product_unit.unitUserPrice : 0,
        ecom_ac_product: {
          selectedUnitQty: 0,
          inputQty: 0,
          selectedMixerData: "",
          quantity: 0,
          productId: this.state.data.productId,
          name: this.state.data.name,
          images: this.state.data.images,
          description: this.state.data.shortDescription,
          ecom_acca_vendor_product_units: this.state.itemSelected.ecom_acca_vendor_product_units,
        }
      }
    };
    this.props.navigation.navigate('Redeem', { items: data })
  }

  onItemSelected = (item) => {
    console.log("onSelected > Item", item);
    this.setState({ itemSelected: item })


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
              shadowOffset: { width: 1, height: 1 },
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
                    width: 75,
                    height: 75,
                  }}
                  source={{ uri: `${this.state.hostUrl + this.state.data.images}` }}
                />
                {/* <Text>{this.state.hostUrl + this.state.data.images}</Text> */}
              </View>
              <View
                style={{
                  width: '60%',
                  alignSelf: 'flex-start',
                  margin: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#4D4F50',
                  }}>
                  {this.state.data.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: '#424242',
                    //top: 10,
                    //left: 5,
                  }}>
                  Available Qty: {this.state.collectionWallet.availableQty + this.state.collectionWallet.unitType}
                </Text>

                <View
                  style={{
                    top: 15,
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
                    Valid until: {this.state.collectionWallet.validTillDate}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '90%',
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
          {this.state.data.ecom_ae_vendors && this.state.data.ecom_ae_vendors.length > 0 ?
            this.state.data.ecom_ae_vendors.map((item, index) =>
            (
              <TouchableOpacity
                onPress={() => {
                  //this.setState({ itemSelected: item.vendorId })
                  this.onItemSelected(item)
                }}
                style={{
                  //width: '96%',
                  height: 154,
                  backgroundColor: '#fff',
                  marginTop: 20,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 5,
                  elevation: 5,
                  borderRadius: 10,
                  borderWidth: this.state.itemSelected.vendorId == item.vendorId ? 2 : 0,
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
                      borderRadius: 10
                    }}
                    resizeMode={'cover'}
                    source={{ uri: `${this.state.hostUrl + item.images}` }}
                  >
                    <View style={{
                      backgroundColor: '#B41430',
                      marginTop: 128,
                      height: 25,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10
                    }}>
                      <Text style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#fff',
                        alignSelf: 'center'
                      }}>Featured</Text>
                    </View>
                  </ImageBackground>
                </View>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start'
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#424242',
                      top: 5,
                      width: '100%',
                      left: 20,
                    }}>
                    {item.vendorShopName + ' ' + item.vendorId}
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '400',
                      color: '#424242',
                      top: 5,
                      padding: 0,
                      width: '90%',
                      left: 20,
                    }}>
                    {item.address.substr(0, 30)}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginBottom: 5,
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
                        style={{ marginTop: 2, marginLeft: 20 }}
                      />
                      {item.ecom_acc_vendor_product.vendorProductStatus == 'Available' ?
                        <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>open</Text> :
                        <Text style={{ color: 'red', marginLeft: 5 }}>close</Text>
                      }
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
                        style={{ marginTop: 2 }}
                      />
                      <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>{item.distance.toFixed(1)}Km</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )) : null
          }
          {this.state.itemSelected != 0 ? (
            <View style={{ marginTop: '5%' }}>
              <TouchableOpacity
                style={styles.save}
                onPress={() =>
                  //Alert.alert('Alert', 'Work in Progress')
                  this.onContinue()
                  //this.props.navigation.navigate('Redeem', { items: this.state.itemSelected })
                }>
                <Text style={{ color: '#fff', fontSize: 15 }}>
                  Continue
                </Text>
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
            this.setState({ modalVisible: false });
          }}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
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

              <View style={{ marginTop: '20%' }}>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => this.props.navigation.navigate('MyCard')}>
                  <Text style={{ color: '#fff', fontSize: 15 }}>REDEEM</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

// dispatcher functions
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

//getting props from redux
function mapStateToProps(state) {
  let redux = state;
  return { redux };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectBars);


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
