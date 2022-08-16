import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import styles from './styles'
export default class Promotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        {/* Header */}
        <View
          style={{
            backgroundColor: '#fff',
            height: 60,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
          }}>
          <View
            style={{ margin: 12, flexDirection: 'row', alignItems: 'center' }}>
          
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 20, color: '#4D4F50', fontWeight: '500' }}>
                Promotions
              </Text>
            </View>
          </View>
        </View>
        {/* Header Ends */}
        <ScrollView>
          <View
            style={{
              margin: 10,
            }}>
            <View
              style={{
                marginTop: 10,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 15,
                borderRadius: 15,
                elevation: 5,
                alignSelf: 'center',
              }}>
              <ImageBackground
                style={styles.promotions2Img}
                resizeMode={'cover'}
                source={images.promotions2}
                defaultSource={images.promotions2}>
                <View style={{ marginTop: '10%', marginLeft: '65%' }}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                      width: 100,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: '400',
                      }}>
                      Redeem Now
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignItems: 'center', marginTop: 7 }}>
                    <Text
                      style={{
                        color: '#fff',
                      }}>
                      VIRGIN MOJITO
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
              <View
                style={{
                  margin: 15,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#3C3C3C',
                    fontWeight: '500',
                  }}>
                  Grab your Drink now at your nearest bar.
                </Text>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AllBars')}
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: '#3C3C3C' }}>View all bars</Text>
                  <Icon
                    name="navigate-next"
                    size={22}
                    color="#808080"
                    style={{ marginTop: 2 }}
                  />
                </TouchableOpacity>

                {/* <View
                  style={{
                    // marginTop:10,
                    marginBottom: -10,
                    alignSelf: 'flex-end',
                  }}>
                  <Text>AD</Text>
                </View> */}
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              // onPress={() => this.props.navigation.navigate('ProductDetailBars')}
              style={{
                marginTop: 20,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 15,
                borderRadius: 15,
                elevation: 5,
                alignSelf: 'center',
              }}>
              <ImageBackground
                style={styles.promotions1Img}
                resizeMode={'cover'}
                source={images.promotions1}
                defaultSource={images.promotions1}>
                <View style={{ marginTop: '2%', marginRight: 10 }}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    {/* <Icon name="favorite" size={28} color="#FF1405" /> */}
                    <Image
                      resizeMode={'cover'}
                      source={images.heart}
                      defaultSource={images.heart}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      //   marginLeft:10,
                      marginTop: 20,
                      backgroundColor: '#26B90E',
                      width: 68,
                      height: 20,
                      alignItems: 'center',
                      //   borderRadius:10
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        //   marginTop:2
                      }}>
                      50% Off
                    </Text>
                  </View>
                </View>
              </ImageBackground>
              <View
                style={{
                  margin: 15,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#3C3C3C',
                    fontWeight: '500',
                  }}>
                  Charlie’s Bar
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    justifyContent: 'space-between',
                  }}>
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
                    <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>2.8Km</Text>
                  </TouchableOpacity>

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
                      style={{ marginTop: 2 }}
                    />
                    <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>open</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="star"
                      size={16}
                      color="#FAB914"
                      style={{ marginTop: 2 }}
                    />
                    <Icon
                      name="star"
                      size={16}
                      color="#FAB914"
                      style={{ marginTop: 2 }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: 5,
                    marginBottom: -10,
                    // alignSelf: 'flex-end',
                  }}>
                  <Text>New Bar added nearby you</Text>
                </View>
              </View>
            </TouchableOpacity>

         
            <View
              style={{
                marginTop: 15,
                alignItems: 'center',
              }}>
              <Image
                // style={styles.productImg}
                resizeMode={'cover'}
                source={images.promotionBanner}
                defaultSource={images.promotionBanner}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

