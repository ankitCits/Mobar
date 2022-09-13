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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
export default class OrderHistoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }

  render() {
    // console.log('==============>>>>>>>>>', this.props.route.params);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <HeaderSide
          name={'Purchase Information'}
          onClick={() => this.props.navigation.pop()}
        />
        <>
          <View
            style={{
              margin: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: '#4D4F50',
                  fontWeight: '700',
                }}>
                Purchase ID : 451681664168748184
              </Text>
              <Text style={styles.innerText}>Date : 20 May 2020 7:00 PM</Text>
            </View>
            <View style={{margin: 15}}>
              <Image
                style={styles.productImg}
                resizeMode={'cover'}
                source={images.pdf}
                defaultSource={images.pdf}
              />
            </View>
          </View>

          <View
            style={{
              margin: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.innerText}>Items Purchased</Text>
            <Text style={styles.innerText}>Total : 2</Text>
          </View>

          <View>
            <ScrollView horizontal={true}>
              <View style={styles.productView}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    marginLeft: '60%',
                  }}>
                  $99
                </Text>
                <Image
                  style={styles.productImg}
                  resizeMode={'cover'}
                  source={images.product2}
                  defaultSource={images.product2}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '500',
                    color: '#4D4F50',
                  }}>
                  Chivas Regal 12
                </Text>
              </View>

              <View style={styles.productView}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    marginLeft: '60%',
                  }}>
                  $99
                </Text>
                <Image
                  style={styles.productImg}
                  resizeMode={'cover'}
                  source={images.product2}
                  defaultSource={images.product2}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '500',
                    color: '#4D4F50',
                  }}>
                  Chivas Regal 12
                </Text>
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              marginTop: 50,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#3C3C3C',
                fontWeight: '400',
              }}>
              Promocode Applied
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#B51D36',
                height: 23.24,
                width: 118,
                borderRadius: 5,
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Image
                style={styles.orderPercentageImg}
                resizeMode={'cover'}
                source={images.orderDeatilPercentage}
                defaultSource={images.orderPercentage}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                MO534V6
              </Text>
            </View>
            <Text
              style={{
                marginTop: 10,
                fontWeight: '400',
                color: '#3C3C3C',
              }}>
              Get $99 Discount on your Purchase
            </Text>
          </View>

          <View style={{marginTop: '10%', flex: 1, justifyContent: 'flex-end'}}>
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
                height: 180,
                // borderBottomLeftRadius: 10,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#3C3C3C',
                    fontWeight: '500',
                    fontSize: 20,
                  }}>
                  Sub Total
                </Text>
                <Text
                  style={{
                    marginRight: 40,
                    color: '#3C3C3C',
                    fontWeight: '500',
                    fontSize: 20,
                  }}>
                  $397
                </Text>
              </View>

              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginLeft: 30,
                    color: '#3C3C3C',
                    fontWeight: '500',
                    fontSize: 18,
                  }}>
                  Discount
                </Text>
                <Text
                  style={{
                    marginRight: 40,
                    color: '#F01111',
                    fontWeight: '500',
                    fontSize: 18,
                  }}>
                  -$99
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: '#000',
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />

              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginLeft: 30,
                    color: '#A1172F',
                    fontWeight: '700',
                    fontSize: 22,
                  }}>
                  Amount Paid
                </Text>
                <Text
                  style={{
                    marginRight: 40,
                    color: '#A1172F',
                    fontWeight: '700',
                    fontSize: 22,
                  }}>
                  $262
                </Text>
              </View>
            </View>
            { this.props.route.params != undefined && this.props.route.params.home ? (
              <View
                style={{
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    marginTop: '-2%',
                    marginBottom: '2%',
                  }}>
                  <TouchableOpacity
                    style={styles.save}
                    onPress={() =>
                      this.props.navigation.navigate('MyBottomTabs')
                    }>
                    <Text style={{color: '#fff', fontSize: 18}}>
                      Go To Home
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  innerText: {
    color: '#4D4F50',
    fontWeight: '500',
    marginTop: 5,
  },
  productImg: {
    marginTop: -15,
  },
  productView: {
    margin: 15,
    backgroundColor: '#fff',
    height: 118,
    width: 105,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  orderPercentageImg: {
    // width: 10,
    // height: 23.24,
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
