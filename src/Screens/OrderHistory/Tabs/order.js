import moment from 'moment';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import images from '../../../assets/images';
import { FontFamily } from '../../../Theme/FontFamily';
import { ThemeColors } from '../../../Theme/ThemeColors';

export default class Order extends Component {
    constructor(props) {
      super(props);
      console.log("Props > ",props.items);
      this.state = {
        data:props.items,
        index:props.index,
        url:props.hostUrl
      };
    }

    formatDDMMM = s => {
      var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
      var b = s.split(/\D/);
      return b[2] + ' ' + months[b[1] - 1];
    };

    render() {
        return (
       
                    <>
                        <TouchableOpacity key={this.state.index}
                            style={[styles.subContainer, styles.productContainer]}
                            onPress={() =>
                                this.props.navigation.navigate('OrderHistoryDetail', { orderData: this.state.data, hostUrl: this.state.url })
                            }
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    style={{
                                        height: 80,
                                        width: 70
                                    }}
                                    resizeMode={'cover'}
                                    source={{
                                        uri: `${this.state.url +
                                          this.state.data.ecom_bc_order_details[0].productImage
                                            }`,
                                    }}
                                    defaultSource={images.defaultImg}
                                />
                            </View>

                            <View style={{marginVertical:5,paddingHorizontal:10,width:'50%',flexDirection:'column' }}>
                                <View
                                    style={{
                                        
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '700',
                                            color: '#4D4F50',
                                        }}>
                                        Purchase Id :{this.state.data.orderNumber}
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#4D4F50',
                                            fontWeight: '400',
                                        }}>
                                        Purchased On : {moment(this.state.data.orderDate).format('dd-MMM-yyyy')}
                                    </Text>
                                </View>
                                {this.state.data.couponCode ? 
                                    <View style={{ marginTop: 10, flexDirection: 'row' }}>

                                        <View
                                            style={{
                                                borderWidth: 1,
                                                borderColor: '#B51D36',
                                                height: 20,
                                                width: 90,
                                                borderRadius: 5,
                                                flexDirection: 'row',
                                            }}>
                                            <Image
                                                style={styles.orderPercentageImg}
                                                resizeMode={'cover'}
                                                source={images.orderPercentage}
                                                defaultSource={images.orderPercentage}
                                            />
                                            <Text style={{ marginLeft: 5, fontSize: 12 }}>
                                                {this.state.data.couponCode}
                                            </Text>
                                        </View>

                                        <Text style={{ marginLeft: 10, fontSize: 13 }}>
                                            Applied
                                        </Text>
                                    </View>:
                                    null

                                }
                            </View>

                            <View style={{ 
                              borderRadius:10,
                              
                            }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        marginLeft: 20,
                                        color: '#4D4F50',
                                        fontWeight: '400',
                                    }}>
                                    {this.state.data.ecom_bc_order_details[0].productUnitType}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 20,
                                        marginLeft: 20,
                                        color: '#4D4F50',
                                        fontWeight: '500',
                                        marginTop: 5,
                                    }}>
                                    ${this.state.data.subTotalAmount}
                                </Text>

                                <View
                                    style={{
                                        backgroundColor: '#26B90E',
                                        padding: 5,
                                        marginTop:10,
                                        borderRadius: 10,
                                        flexDirection:'column',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#fff',
                                            fontWeight: '500',
                                        }}>
                                        Purchased
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </>
             
        );
    }
}

const styles = StyleSheet.create({

redeemContainer: {
    backgroundColor: ThemeColors.CLR_WHITE,
    flex: 1,
    marginBottom: 10,
  },
  filterView: {
    backgroundColor: '#fff',
    height: 50,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
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
  tabView: { height: '100%' },
  productList: {
    color: '#ACACAC',
  },
  header: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  titleText: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontSize: 14,
    fontWeight: '400',
    color: '#ACACAC'
  },
  subContainer: {
    width: '95%',
    backgroundColor:ThemeColors.CLR_WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10
  },
  productContainer: {
    marginVertical: 15
  },
  imageContainer: {
    backgroundColor: '#fff',
    height: 'auto',
    width: '28%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageAvatar: {
    backgroundColor: '#fff',
    height: 125,
    width: '28%',
    margin: 0,
    padding: 0,
    backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 6,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  cardDetails: {
    marginTop: 0,
    margin: 15,
    paddingTop: 5,
  },
  shopName: {
    width: 150,
  },
  shopNameText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 15,
    fontWeight: '700',
    color: '#4D4F50',
  },
  productText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 12,
    color: '#4D4F50',
    fontWeight: '400',
  },
  quantity: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 12,
    color: '#4D4F50',
    fontWeight: '700',
  },
  right: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
  },
  
  orderPercentageImg: {
    width: 16.97,
    height: 17.79,
  },

});