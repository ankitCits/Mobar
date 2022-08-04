import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import images from '../../../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default class Whiskey extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            margin: 15,
            marginTop: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '5%',
            }}>
            <Text style={styles.whiskeyText}>Whiskey</Text>
            <TouchableOpacity>
              <Text style={styles.ViewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {this.props.data ? (
            <View style={{ marginTop: '7%' }}>
              <FlatList
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.props.data.drinkCategory}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <>
                    {item.name == 'Whiskey' ? (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Product')
                        }
                        key={index.toString()}
                        style={{
                          marginTop: 28,
                          marginBottom: 30,
                          marginLeft: 10,
                        }}>
                        <ImageBackground
                          style={styles.boxInner}
                          resizeMode={'cover'}
                          source={images.boxOuter}
                          defaultSource={images.boxOuter}>
                          <View style={styles.innerTop}>
                            <TouchableOpacity
                              onPress={() =>
                                console.log(
                                  this.props.data.hostUrl + item.images,
                                )
                              }>
                              <Icon
                                name={'favorite'}
                                size={22}
                                color="#FF1405"
                                style={styles.imageStyle}
                              />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 12 }}>
                              300ml
                            </Text>
                          </View>
                          <Image
                            style={styles.productImg}
                            resizeMode={'cover'}
                            source={{
                              uri: `${this.props.data.hostUrl + item.images}`,
                            }}
                          />
                          <Image
                            style={styles.boxOuter}
                            resizeMode={'cover'}
                            source={images.boxInner}
                            defaultSource={images.boxInner}
                          />
                          <View style={styles.innerBottom}>
                            <View>
                              <Text style={styles.innerBottomText}>
                                {item.ecom_ac_products[0].name}
                              </Text>
                            </View>
                            <View>
                              <Text style={styles.innerBottomText2}>
                                Your Saving:{' '}
                                {
                                  item.ecom_ac_products[0]
                                    .ecom_aca_product_units[0].unitDiscountPrice
                                }
                              </Text>
                            </View>
                            <View>
                              <Text style={styles.innerBottomText3}>
                                ${' '}
                                {
                                  item.ecom_ac_products[0]
                                    .ecom_aca_product_units[0].unitUserPrice
                                }
                              </Text>
                            </View>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    ) : null}
                  </>
                )}
              />

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.whiskeyText}>Combos</Text>
                  <TouchableOpacity>
                    <Text style={styles.ViewAll}>View All</Text>
                  </TouchableOpacity>
                </View>

                {this.props.data.comboDatas.map(item => (
                  <View>
                    <ImageBackground
                      style={{
                        width: 341,
                        height: 151,
                        marginTop: '10%',
                        marginBottom: '5%',
                        alignSelf: 'center',
                        // borderWidth: 1,
                      }}
                      resizeMode={'cover'}
                      source={images.combo}
                      defaultSource={images.combo}
                    />
                    <View
                      style={{
                        marginTop: '-48%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 20,
                      }}>
                      <View
                        style={{
                          marginTop: 20,
                          // alignItems:'center'
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            resizeMode={'cover'}
                            source={images.king}
                            defaultSource={images.king}
                          />
                          <Text
                            style={{
                              marginLeft: 10,
                              fontSize: 14,
                              fontWeight: '400',
                              color: '#4D4F50',
                            }}>
                            Top of the week
                          </Text>
                        </View>

                        <View
                          style={{
                            marginTop: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: '500',
                              color: '#4D4F50',
                            }}>
                            {item.name}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginTop: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '500',
                              color: '#4D4F50',
                            }}>
                            ${item.comboPrice}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 5,
                            right: 5,
                          }}>
                          <Image
                            resizeMode={'cover'}
                            source={images.Fivestar}
                            defaultSource={images.Fivestar}
                          />
                        </View>

                        {/* <TouchableOpacity
                          style={{
                            marginTop: 5,
                            borderWidth: 2,
                            borderRadius: 20,
                            padding: 2,
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              color: '#000',
                            }}>
                            Redeem Now
                          </Text>
                        </TouchableOpacity> */}
                      </View>
                      <View>
                        {item.images == '' || item.images == null ? (
                          <Image
                            resizeMode={'cover'}
                            source={images.MixCombo}
                            defaultSource={images.MixCombo}
                            style={{
                              width: 200,
                              height: 160,
                            }}
                          />
                        ) : (
                          <Image
                            resizeMode={'cover'}
                            source={{
                              uri: `${this.props.data.hostUrl + item.images}`,
                            }}
                            style={{
                              width: 180,
                              height: 160,
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View
                style={{
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '8%',
                  }}>
                  <Text style={styles.whiskeyText}>Bars</Text>
                  <TouchableOpacity>
                    <Text style={styles.ViewAll}>View All</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  // horizontal
                  nestedScrollEnabled>
                  {this.props.data && this.props.data.barDatas.length > 0
                    ? this.props.data.barDatas.map(item => (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => console.log(item.images)}
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
                          width: 350,
                          margin: 10,
                        }}>
                        <ImageBackground
                          style={styles.promotions1Img}
                          resizeMode={'cover'}
                          // source={images.promotions1}
                          // defaultSource={images.promotions1}
                          source={{
                            uri: `${this.props.data.hostUrl + item.images}`,
                          }}>
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
                            {item.vendorShopName}
                          </Text>
                          <View
                            style={{
                              marginTop: 5,
                              // marginBottom: -10,
                              // alignSelf: 'flex-end',
                            }}>
                            <Text>{item.address}</Text>
                          </View>
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
                              <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>
                                {item.distance.toFixed(2)}Km
                              </Text>
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
                        </View>
                      </TouchableOpacity>
                    ))
                    : null}
                </ScrollView>
              </View>

              {/* <View>
                        <View
                          style={{
                            marginTop: 10,
                            alignSelf: 'center',
                          }}>
                          <ImageBackground
                            style={styles.promotions2Img}
                            resizeMode={'cover'}
                            source={images.promotions2}
                            defaultSource={images.promotions2}>
                            <View style={{marginTop: '10%', marginLeft: '65%'}}>
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
                                style={{alignItems: 'center', marginTop: 7}}>
                                <Text
                                  style={{
                                    color: '#fff',
                                  }}>
                                  VIRGIN MOJITO
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </ImageBackground>
                        </View>
                      </View> */}
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  whiskeyText: {
    fontSize: 18,
    fontWeight: '500',
  },
  ViewAll: {
    fontSize: 13,
    fontWeight: '400',
    color: '#711323',
  },
  boxInner: {
    width: 147,
    height: 169,
  },
  boxOuter: {
    bottom: 0,
    position: 'absolute',
  },
  productImg: {
    marginTop: '-30%',
    marginRight: 10,
    position: 'relative',
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  innerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '94%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 5,
    position: 'relative',
  },
  innerBottom: {
    // width: '94%',
    alignItems: 'center',
    marginTop: '25%',
  },
  innerBottomText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
  },
  innerBottomText2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
  innerBottomText3: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  promotions1Img: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: 350,
    height: 223,
  },
  promotions2Img: {
    width: 350,
    height: 181,
    borderRadius: 50,
  },
});
