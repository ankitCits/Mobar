import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
export default class Promotions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#F4F4F4',
        }}>
        <>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: '#4D4F50',
              }}>
              All Promotions
            </Text>
          </View>

          <View
            style={{
              marginTop: '5%',
              marginLeft: 10,
            }}>
            <Text
              style={{
                color: '#A1A1A1',
                fontSize: 15,
                fontWeight: '500',
              }}>
              Today
            </Text>

            <View
              style={{
                marginTop: '5%',
                flexDirection: 'row',
                alignSelf:"center",
                paddingRight:2
              }}>
              <Icon
                name={'check-circle'}
                size={25}
                color="#4FEA36"
                // style={styles.iconStyle}
              />

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  marginTop: 5,
                }}>
                <Image
                  style={styles.productImg1}
                  resizeMode={'cover'}
                  source={images.notification1}
                  defaultSource={images.notification1}
                />
                <ImageBackground
                  style={styles.productImg2}
                  resizeMode={'cover'}
                  source={images.notification2}
                  defaultSource={images.notification2}>
                  <View
                    style={{
                      margin: '3%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#4D4F50',
                      }}>
                      Redeemed Sucessfully
                    </Text>

                    <TouchableOpacity>
                      <Icon
                        name={'close'}
                        size={22}
                        color="#969696"
                        // style={styles.iconStyle}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{
                    margin:'3%',
                    marginTop:-3
                  }}>
                    <Text style={{
                      color:'#969696',
                      fontSize:14,
                      fontWeight:'400'
                    }}>
                      Nibh vestibulum egestas condimentum nibh arcu mauris
                      lacus, malesuada sed. Etiam volutpat condimentum vitae.
                    </Text>
                  </View>

                  <View style={{
                    margin:'3%',
                    marginTop:-5
                  }}>
                    <Text style={{
                      fontSize:13,
                      fontWeight:'400',
                      color:'#4D4F50'
                    }}>
                    Purchase ID- 24551364698156
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>
        </>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  productImg2: {
    right: '15%',
    height: 117,
    width: 305,
  },
});
