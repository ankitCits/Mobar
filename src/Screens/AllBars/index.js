import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
export default class AllBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      searchString: ''
    };
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            height: 165,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              height: 60,
            }}>
            <View
              style={{ margin: 12, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyBottomTabs')}>
                <Icon name="arrow-back" size={28} color="#4D4F50" />
              </TouchableOpacity>

              <View style={{ marginLeft: 20 }}>
                <Text
                  style={{ fontSize: 20, color: '#4D4F50', fontWeight: '500' }}>
                  Bars
                </Text>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#fff' }}>
            <View style={{ alignSelf: 'center', marginTop: -5 }}>
              <View style={styles.sectionStyle}>
                <Icon
                  name="search"
                  size={28}
                  color="#A39B9B"
                  style={styles.imageStyle}
                />
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Search for Bars..."
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({ searchString: text })}
                />
                <TouchableOpacity>
                  <Icon
                    name={'filter-list'}
                    size={22}
                    color="#A39B9B"
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                margin: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="place"
                  size={20}
                  color="#4D4F50"
                  style={styles.imageStyle}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    color: '#3C3C3C',
                  }}>
                  Duxten Road, 338750
                </Text>
              </View>

              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    color: '#A1172F',
                  }}>
                  Change
                </Text>
                <Icon
                  name="edit"
                  size={12}
                  color="#A39B9B"
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              margin: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#424242',
                }}>
                Featured
              </Text>
            </View>

            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#94172D',
                }}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              margin: 0,
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                height: 350,
              }}>
              <TouchableOpacity
                onPress={() =>
                  // this.props.navigation.navigate('ProductDetailBars')
                  console.log('go to bar details')
                }
                style={{
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 15,
                  borderRadius: 15,
                  elevation: 5,
                  alignSelf: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <ImageBackground
                  style={styles.promotions1Img}
                  resizeMode={'cover'}
                  source={images.promotions1}
                  defaultSource={images.defaultBar}>
                  <View style={{ marginTop: '2%', marginRight: 10 }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'flex-end',
                      }}>
                      <Icon name="favorite" size={28} color="#FF1405" />
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
                      fontWeight: '400',
                    }}>
                    Charlie’s Bar
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      color: '#3C3C3C',
                      fontWeight: '400',
                      marginTop: 5,
                    }}>
                    Odeon Towers Extension Rooftop, Singapore
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 15,
                    marginBottom: 10,
                    marginTop: -5,
                    flexDirection: 'row',
                    width: 250,
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
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  // this.props.navigation.navigate('ProductDetailBars')
                  console.log('go to bar details')
                }
                style={{
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 15,
                  borderRadius: 15,
                  elevation: 5,
                  alignSelf: 'center',
                  marginLeft: 10,
                  marginRight: 10,
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
                      <Icon name="favorite" size={28} color="#FF1405" />
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
                      fontWeight: '400',
                    }}>
                    Charlie’s Bar
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      color: '#3C3C3C',
                      fontWeight: '400',
                      marginTop: 5,
                    }}>
                    Odeon Towers Extension Rooftop, Singapore
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 15,
                    marginBottom: 10,
                    marginTop: -5,
                    flexDirection: 'row',
                    width: 250,
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
              </TouchableOpacity>
            </ScrollView>

            <View
              style={{
                margin: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#424242',
                  }}>
                  New on Mybar
                </Text>
              </View>

              <TouchableOpacity style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#94172D',
                  }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                height: 150,
              }}>
              <TouchableOpacity
                onPress={() =>
                  // this.props.navigation.navigate('ProductDetailBars')
                  console.log('go to bar details')
                }
                style={{
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 15,
                  borderRadius: 15,
                  elevation: 5,
                  alignSelf: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                  width: 320,
                  height: 133,
                  flexDirection: 'row',
                }}>
                <View style={{ width: '40%' }}>
                  <Image
                    style={{
                      width: 132,
                      height: 110,
                      borderTopLeftRadius: 10,
                    }}
                    resizeMode={'cover'}
                    source={images.nearMe}
                    defaultSource={images.nearMe}
                  />
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignSelf: 'center',
                      backgroundColor: '#B41430',
                      width: 135,
                      alignItems: 'center',
                      marginLeft: 10,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#fff',
                      }}>
                      Featured
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginLeft: 20,
                    marginTop: 20,
                    width: 160,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      color: '#424242',
                    }}>
                    New Town Bar
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '400',
                      color: '#424242',
                    }}>
                    Odeon Towers Extension Rooftop, Singapore
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
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
                        style={{ marginTop: 2 }}
                      />
                      <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>
                        open
                      </Text>
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
                      <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>
                        2.8Km
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  // this.props.navigation.navigate('ProductDetailBars')
                  console.log('go to bar details')
                }
                style={{
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 15,
                  borderRadius: 15,
                  elevation: 5,
                  alignSelf: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                  width: 320,
                  height: 133,
                  flexDirection: 'row',
                }}>
                <View style={{ width: '40%' }}>
                  <Image
                    style={{
                      width: 132,
                      height: 110,
                      borderTopLeftRadius: 10,
                    }}
                    resizeMode={'cover'}
                    source={images.nearMe}
                    defaultSource={images.nearMe}
                  />
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignSelf: 'center',
                      backgroundColor: '#B41430',
                      width: 135,
                      alignItems: 'center',
                      marginLeft: 10,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#fff',
                      }}>
                      Featured
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginLeft: 20,
                    marginTop: 20,
                    width: 160,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      color: '#424242',
                    }}>
                    New Town Bar
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '400',
                      color: '#424242',
                    }}>
                    Odeon Towers Extension Rooftop, Singapore
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
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
                        style={{ marginTop: 2 }}
                      />
                      <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>
                        open
                      </Text>
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
                      <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>
                        2.8Km
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>

            <View
              style={{
                margin: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#424242',
                  }}>
                  Special Offers
                </Text>
              </View>

              <TouchableOpacity style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#94172D',
                  }}></Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                height: 150,
              }}>
              <View
                style={{
                  margin: 15,
                }}>
                <Image
                  // style={styles.productImg}
                  resizeMode={'cover'}
                  source={images.promotionBanner}
                  defaultSource={images.promotionBanner}
                />
              </View>

              <View
                style={{
                  margin: 15,
                }}>
                <Image
                  // style={styles.productImg}
                  resizeMode={'cover'}
                  source={images.promotionBanner}
                  defaultSource={images.promotionBanner}
                />
              </View>
            </ScrollView>

            <View
              style={{
                margin: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#424242',
                  }}>
                  Near me
                </Text>
              </View>

              <TouchableOpacity style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#94172D',
                  }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() =>
                // this.props.navigation.navigate('ProductDetailBars')
                console.log('go to bar details')
              }
              style={{
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 15,
                borderRadius: 15,
                elevation: 5,
                alignSelf: 'center',
                marginLeft: 10,
                marginRight: 10,
                width: 350,
                height: 133,
                flexDirection: 'row',
              }}>
              <View style={{ width: '40%' }}>
                <Image
                  style={{
                    width: 132,
                    height: 110,
                    borderTopLeftRadius: 10,
                  }}
                  resizeMode={'cover'}
                  source={images.nearMe}
                  defaultSource={images.nearMe}
                />
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                    backgroundColor: '#B41430',
                    width: 135,
                    alignItems: 'center',
                    //   marginLeft: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    marginRight: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#fff',
                    }}>
                    Featured
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginLeft: 20,
                  marginTop: 20,
                  width: 160,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#424242',
                  }}>
                  New Town Bar
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: '#424242',
                  }}>
                  Odeon Towers Extension Rooftop, Singapore
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                      name="directions-run"
                      size={16}
                      color="#808080"
                      style={{ marginTop: 2 }}
                    />
                    <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>2.8Km</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ marginBottom: 10 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  promotions2Img: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: 338,
    height: 181,
  },
  promotions1Img: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: 334,
    height: 200,
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderWidth: 0,
    borderColor: '#000',
    height: 40,
    width: 360,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
  },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
