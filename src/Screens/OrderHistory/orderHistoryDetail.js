import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
export default class OrderHistoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.route.params.orderData.ecom_bc_order_details,
      visibility: false,
      orderHistory: props.route.params.orderData,
      hostUrl: props.route.params.hostUrl,
    };
    console.log(this.state)
  }

  cartDetails = () => {

  }

  renderCartItems = (item, index) => {
    // console.log("renderCartItems", (this.state.hostUrl + item.productImage));
    return (
      <>

        <View style={styles.productView} key={index}>
          <Text
            style={{
              color: '#000',
              fontWeight: '500',
              marginLeft: '60%',
            }}>
            ${item.productPrice}
          </Text>
          <Image
            style={styles.productImg}
            resizeMode={'cover'}
            source={{ uri: `${this.state.hostUrl + item.productImage}` }}
          // defaultSource={`${this.state.hostUrl + item.productImage}`}
          />
          <Text
            style={{
              fontSize: 11,
              fontWeight: '500',
              color: '#4D4F50',
            }}>
            {item.productName}
          </Text>
        </View>

      </>
    );
  };

  render() {
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
                Purchase ID : {this.state.orderHistory.orderNumber}
              </Text>
              <Text style={styles.innerText}>Date : {this.state.orderHistory.orderDate}</Text>
            </View>
            <View style={{ margin: 15 }}>
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
              margin:15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              
            }}>
            <Text style={styles.innerText}>Items Purchased</Text>
            <Text style={styles.innerText}>Total :{this.state.item.length} </Text>
          </View>

          <View>
            <FlatList
              data={this.state.item}
              numColumns={numColumns}
              style={{ height: 300 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => this.renderCartItems(item, index)}
            />
            {/* <ScrollView horizontal={true}>
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
            </ScrollView> */}
          </View>
          {this.state.orderHistory.couponCode != '' &&
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
                  {this.state.orderHistory.couponCode}
                </Text>
              </View>

              <Text
                style={{
                  marginTop: 10,
                  fontWeight: '400',
                  color: '#3C3C3C',
                }}>

              </Text>
            </View>
          }
          <View style={{ marginTop: '0%', flex: 0, justifyContent: 'flex-end',}}>
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
                  marginTop: 10,
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
                  ${this.state.orderHistory.subTotalAmount}
                </Text>
              </View>
              {this.state.orderHistory.totalDiscount > 0 &&
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
                    -${this.state.orderHistory.totalDiscount}
                  </Text>
                </View>
              }
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
                  ${this.state.orderHistory.totalPayable}
                </Text>
              </View>
            </View>
            {this.props.route.params != undefined && this.props.route.params.home ? (
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
                    <Text style={{ color: '#fff', fontSize: 18 }}>
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
const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;
const styles = StyleSheet.create({
  innerText: {
    color: '#4D4F50',
    fontWeight: '500',
    marginTop: 5,
  },
  productImg: {
    //marginTop: -15,
    height: 60,
    width: 60,
  },
  productView: {
    width: size - 28,
    flexDirection: "column",
    paddingBottom: 10,
    margin: 14,
    backgroundColor: '#fff',
    height: 118,
    //width: 105,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
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
