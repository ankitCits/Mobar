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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
export default class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibilityQuantity: 30,
      modalVisible: false,
    };
  }

  render() {
    const {modalVisible} = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 60,
          }}>
          <View
            style={{margin: 12, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MyBottomTabs')}>
              {/* <Icon name="arrow-back" size={28} color="#4D4F50" /> */}
            </TouchableOpacity>

            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 20, color: '#4D4F50', fontWeight: '500'}}>
              Collections
              </Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.filterView}>
            <View
              style={{
                margin: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity style={styles.filterInnerView}>
                <Icon name="swap-vert" size={28} color="#4D4F50" />
                <Text style={styles.filterInnerText}>Sort</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filterView}>
            <View
              style={{
                margin: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity style={styles.filterInnerView}>
                <Icon name="filter-list-alt" size={24} color="#4D4F50" />
                <Text style={styles.filterInnerText}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <>
          <View
            style={styles.productView}
            onPress={() =>
              this.props.navigation.navigate('OrderHistoryDetail')
            }>
            <View style={styles.productInnerView}>
              <Image
                style={styles.productImg}
                resizeMode={'cover'}
                source={images.product2}
                defaultSource={images.product2}
              />
            </View>

            <View style={{margin: 5, marginLeft: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#4D4F50'}}>
                  Chivas Regal 12
                </Text>
              </View>

              <View>
                <Text
                  style={{fontSize: 14, color: '#4D4F50', fontWeight: '400'}}>
                  Blended
                </Text>
              </View>

              <View>
                <Text
                  style={{fontSize: 14, color: '#4D4F50', fontWeight: '400'}}>
                  Available Qty: 150 ml
                </Text>
              </View>

              <View>
                <Text
                  style={{fontSize: 14, color: '#4D4F50', fontWeight: '400'}}>
                  Valid until: 20 Jun 2021
                </Text>
              </View>
            </View>
            <View
              style={{
                margin: 10,
                marginLeft: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => this.setState({modalVisible: true})}
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#BABABA',
                  padding: 2,
                  borderRadius: 20,
                }}>
                <Icon name="add" size={18} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('SelectBars')}
                style={{
                  backgroundColor: '#C11331',
                  // padding: 5,
                  marginTop: 10,
                  // marginLeft: 5,
                  borderRadius: 10,
                  height: 25,
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight:5
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                    fontWeight: '500',
                  }}>
                  Redeem
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={styles.productView}
            onPress={() =>
              this.props.navigation.navigate('OrderHistoryDetail')
            }>
            <View style={styles.productInnerView}>
              <Image
                style={styles.productImg}
                resizeMode={'cover'}
                source={images.product2}
                defaultSource={images.product2}
              />
            </View>

            <View style={{margin: 5, marginLeft: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#4D4F50'}}>
                  Chivas Regal 12
                </Text>
              </View>

              <View>
                <Text
                  style={{fontSize: 14, color: '#4D4F50', fontWeight: '400'}}>
                  Blended
                </Text>
              </View>

              <View>
                <Text
                  style={{fontSize: 14, color: '#4D4F50', fontWeight: '400'}}>
                  Available Qty: 150 ml
                </Text>
              </View>

              <View>
                <Text
                  style={{fontSize: 14, color: '#4D4F50', fontWeight: '400'}}>
                  Valid until: 20 Jun 2021
                </Text>
              </View>
            </View>
            <View
              style={{
                margin: 10,
                marginLeft: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => this.setState({modalVisible: true})}
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#BABABA',
                  padding: 2,
                  borderRadius: 20,
                }}>
                <Icon name="add" size={18} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('SelectBars')}
                style={{
                  backgroundColor: '#C11331',
                  // padding: 5,
                  marginTop: 10,
                  // marginLeft: 5,
                  borderRadius: 10,
                  height: 25,
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight:5
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                    fontWeight: '500',
                  }}>
                  Activate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>

        {/* <View style={{marginTop: '10%', flex: 1, justifyContent: 'flex-end'}}>
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
                  2 Items selected add to cart{' '}
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
                    Adrianna Vineyard
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
                    Havana Club
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
                      2{' '}
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
                    <Text style={{color: '#fff', fontSize: 15}}>VIEW CART</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text></Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#4D4F50',
                  }}>
                  Topup
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible: false})}>
                  <Icon name="close" size={28} color="#4D4F50" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 0.8,
                  backgroundColor: '#DADADA',
                  marginTop: 8,
                  marginBottom: 8,
                }}
              />

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View>
                  <Image
                    style={styles.productImg}
                    resizeMode={'cover'}
                    source={images.product3}
                    defaultSource={images.product3}
                  />
                </View>
                <View style={{marginTop: 10, right: 5}}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '700',
                      color: '#4D4F50',
                    }}>
                    Havana Club
                  </Text>

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
                        }}>
                        30ml
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                          color: '#424242',
                        }}>
                        $59
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
                        }}>
                        60ml
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                          color: '#424242',
                        }}>
                        $85
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
                        }}>
                        90ml
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                          color: '#424242',
                        }}>
                        $99
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: '10%', marginBottom: 10}}>
                <TouchableOpacity
                  style={styles.addToCard}
                  onPress={() => this.setState({modalVisible: false})}>
                  <Text style={{color: '#fff', fontSize: 15}}>ADD TO CART</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  filterView: {
    backgroundColor: '#fff',
    height: 50,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderTopWidth:0
    
  },
  filterInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterInnerText: {
    marginLeft: 5,
    fontSize: 18,
    color: '#4D4F50',
  },
  productList: {
    color: '#ACACAC',
  },
  productView: {
    backgroundColor: '#fff',
    height: 100,
    width: '97%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderRadius: 12,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  productInnerView: {
    backgroundColor: '#fff',
    height: 100,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderPercentageImg: {
    width: 16.97,
    height: 17.79,
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  addToCard: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
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
});
