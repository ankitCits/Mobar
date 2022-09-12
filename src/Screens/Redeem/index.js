import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import NoContentFound from '../../Component/NoContentFound';
import {A_KEY, BASE_URL} from '../../config';
import {getAccessToken} from '../../localstorage';
import Util from '../../utils';
import HeaderSide from '../Component/HeaderSide';
export default class Redeem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      visibilityQuantity: 30,
      modalVisible: false,
      itemModalVisible: false,
      addItemData: null,
    };
    console.log("this.props.route.params.vendorId",this.props.route.params);
  }

  componentDidMount() {
    this.fetchMore();
  }

  fetchMore = async () => {
    let token = await getAccessToken(token);
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    let raw = JSON.stringify({
      vendorId:8, //this.props.route.params.vendorId,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/redeem/moreitem`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.response) {
          console.log('xxxxxxxxx=====>>>', result.response.result.data);
          this.setState({addItemData: result.response.result.data});
        }
        if (result.errors) {
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        console.log('error', error);
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };

  render() {
    console.log('PROPS_IN_REDEEM>>', this.props.route.params);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <HeaderSide
          name={'Redeem'}
          onClick={() => this.props.navigation.pop()}
        />
        <ScrollView>
          <View
            style={{
              width: '95%',
              // height: 154,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 0,
              borderRadius: 5,
            }}>
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
                {/* {this.props.route.params.item.name} */}
                Name
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#424242',
                  top: 25,
                  left: 20,
                }}>
                {/* {this.props.route.params.item.description} */}
                description
              </Text>

              <View
                style={{
                  left: 15,
                  flexDirection: 'row',
                  // top: 40,
                  alignItems: 'center',
                  marginBottom: 5,
                  marginTop: 10,
                }}>
                <Icon name="self-improvement" size={25} color="#851729" />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#851729',
                    left: 10,
                  }}>
                  Select Other Bar
                </Text>
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',
                left: 50,
              }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
                resizeMode={'cover'}
                source={{
                  uri: `${
                    this.props.route.params.uri + this.props.route.params.image
                  }`,
                }}
                defaultSource={images.promotions1}
              />
            </View>
          </View>
          <View
            style={{
              width: '95%',
              height: 400,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 0,
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
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  style={{
                    width: 60,
                    height: 120,
                  }}
                  resizeMode={'cover'}
                  source={{
                    uri: `${
                      this.props.route.params.uri +
                      this.props.route.params.item.images
                    }`,
                  }}
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
                  Chivas Regal 12
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: '#424242',
                    top: 25,
                    left: 20,
                  }}>
                  {
                    this.props.route.params.item.ecom_aca_product_units[0]
                      .unitDescription
                  }
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#424242',
                    top: 25,
                    left: 20,
                  }}>
                  Available Qty:{' '}
                  {
                    this.props.route.params.item.ecom_aca_product_units[0]
                      .unitQty
                  }{' '}
                  {
                    this.props.route.params.item.ecom_aca_product_units[0]
                      .unitType
                  }
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
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  top: 5,
                  width: '70%',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({visibilityQuantity: 30})}
                  style={
                    this.state.visibilityQuantity == 30
                      ? styles.itemQuantitySelected
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="wine-bar" size={22} color="#7B7B7B" />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#7B7B7B',
                        marginLeft: 5,
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="wine-bar" size={22} color="#7B7B7B" />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#7B7B7B',
                        marginLeft: 5,
                      }}>
                      90ml
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                marginLeft: 15,
                marginTop: 20,
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
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    padding: 4,
                    backgroundColor: '#A1172F',
                    borderRadius: 15,
                  }}>
                  <Icon name="remove" size={20} color="#fff" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '700',
                    color: '#A1172F',
                    padding: 7,
                  }}>
                  {' '}
                  1{' '}
                </Text>
                <TouchableOpacity
                  style={{
                    padding: 4,
                    backgroundColor: '#A1172F',
                    borderRadius: 15,
                  }}>
                  <Icon name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => {}} style={styles.sectionStyle}>
                <TextInput
                  style={{flex: 1, padding: 10}}
                  placeholder=""
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#424242"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Icon
                  name={
                    this.state.itemModalVisible ? 'expand-less' : 'expand-more'
                  }
                  size={28}
                  color="#424242"
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '96%',
              height: 180,
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
                onPress={() => this.setState({itemModalVisible: true})}>
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
          </View>

          <View style={{marginTop: '5%'}}>
            <TouchableOpacity
              style={styles.save}
              onPress={() => this.setState({modalVisible: true})}
              // this.props.navigation.navigate('MyCard')}
            >
              <Text style={{color: '#fff', fontSize: 15}}>REDEEM</Text>
            </TouchableOpacity>
          </View>

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
                  <TouchableOpacity
                    onPress={() => this.setState({modalVisible: false})}>
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
                  onPress={() => {
                    this.setState({modalVisible: false});
                    this.props.navigation.navigate('MyCard');
                  }}>
                  <Text style={{color: '#fff', fontSize: 15}}>View Orders</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* { item modal} */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.itemModalVisible}
          onRequestClose={() => {
            this.setState({itemModalVisible: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                {/* <Text></Text> */}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#4D4F50',
                  }}>
                  Add more items
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({itemModalVisible: false})}>
                  <Icon name="close" size={28} color="#4D4F50" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 0.8,
                  backgroundColor: '#DADADA',
                  marginTop: 8,
                }}
              />
              {this.state.addItemData && this.state.addItemData.length > 0 ? (
                this.state.addItemData.map(item => (
                  <View>
                    <View
                      style={{
                        width: '95%',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        height: 120,
                      }}>
                      <View
                        style={{
                          width: '25%',
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{
                            width: 59,
                            height: 115,
                          }}
                          resizeMode={'cover'}
                          source={images.redeemProduct}
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
                            fontSize: 20,
                            fontWeight: '500',
                            color: '#4D4F50',
                          }}>
                          Bud Lite
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#424242',
                            marginTop: 4,
                          }}>
                          Available Qty: {item.availableQty} {item.unitType}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#424242',
                            marginTop: 4,
                          }}>
                          Valid until: {Util.changeDateFormat(item.validTillDate)}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '10%',
                          alignSelf: 'flex-end',
                        }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#851729',
                            height: 26,
                            borderRadius: 25,
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: 70,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            right: '25%',
                          }}
                          onPress={() => {}}>
                          <Text style={{color: '#fff', fontSize: 14}}>ADD</Text>
                          <Icon name="add" size={18} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={{
                        height: 0.8,
                        backgroundColor: '#DADADA',
                        marginTop: 8,
                      }}
                    />
                  </View>
                ))
              ) : (
                <NoContentFound title="No Data Found" />
              )}
            </View>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 332,
    height: 384,
  },
  modalHeader: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
