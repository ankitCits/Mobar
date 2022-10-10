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

export default class Redeems extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:props.items,
        index:props.index,
        url:props.hostUrl
      };
    }

    render() {
        return (
            <View style={styles.redeemContainer}>
          <ScrollView>
          
            
             
                    <>
                      <View style={styles.header} key={this.state.index}>
                        <Text
                          style={styles.titleText}
                        >{
                            moment(this.state.data.date).format('DD-MMM-YYYY') == moment(new Date).format('DD-MMM-YYYY') ?
                              'Today' :
                              moment(this.state.data.date).format('DD-MMM-YYYY')
                          }</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.subContainer}
                        onPress={() =>
                          console.log('work in progress')
                          //this.props.navigation.navigate('RedeemHistoryDetail', { orderData:item,hostUrl:this.state.url})
                        }
                      >
                        <View style={styles.imageAvatar}>
                          <Image
                            style={styles.image}
                            resizeMode={'cover'}
                            source={{
                              uri: `${this.state.url +
                                this.state.data.ecom_ae_vendor.images
                                }`,
                            }}
                            defaultSource={images.defaultImg}
                          />
                        </View>

                        <View style={styles.cardDetails}>
                          <View
                            style={styles.shopName}>
                            <Text
                              style={styles.shopNameText}>
                              {this.state.data.ecom_ae_vendor.vendorShopName}
                            </Text>
                          </View>

                          <View style={styles.shopName}>
                            <Text
                              style={styles.productText}>
                              Redeemed :{this.state.data.ecom_ac_product.name}
                            </Text>
                          </View>
                          <View style={styles.shopName}>
                            <Text
                              style={styles.productText}>
                              Redeemed On : {moment(this.state.data.date).format('DD-MMM-YYYY')+" "+this.state.data.time
                              }
                              
                            </Text>
                          </View>
                          <View style={styles.shopName}>
                            <Text style={styles.quantity}>
                              {this.state.data.redeemUnitQty + ' ' + this.state.data.unitType + ' - ' + this.state.data.reddemQty}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.right}>
                          <View style={styles.closeContainer}>
                            {/* <Icon name="close" size={28} color="#4D4F50" /> */}
                          </View>
                          <View style={styles.redeemBtnContainer}>
                            <Text
                              style={styles.redeemBtnText}>
                              Redeemed
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </>
             
           

          </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({

    redeemContainer: {
        backgroundColor: ThemeColors.CLR_WHITE,
        flex: 1,
        marginBottom: 10
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
        backgroundColor: '#fff',
        //    height: 96,
        width: '95%',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 10
        //margin: 10,
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
      redeemBtnContainer: {
        flexDirection: 'row',
        backgroundColor: '#B51D36',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end'
      },
      redeemBtnText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '500',
        fontSize: 12,
        color: ThemeColors.CLR_WHITE
      },
    
    });