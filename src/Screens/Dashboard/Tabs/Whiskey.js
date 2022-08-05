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
import BarCard from '../../../Component/BarCard';
import CategoryCard from '../../../Component/CategoryCard';

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
                      <CategoryCard navigation={this.props.navigation} item={item} hostUrl={this.props.data.hostUrl} />
                    ) : null}
                  </>
                )}
              />

              {/* Combo Offer */}
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
              {/* Combo Offer */}

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

                {/* Bar Slider */}
                <ScrollView
                  // horizontal
                  nestedScrollEnabled>
                  {this.props.data && this.props.data.barDatas.length > 0
                    ? this.props.data.barDatas.map(item => (
                      <BarCard navigation={this.props.navigation} item={item} hostUrl={this.props.data.hostUrl} />
                    ))
                    : null}
                </ScrollView>
                {/* Bar Slider */}

              </View>

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
});
