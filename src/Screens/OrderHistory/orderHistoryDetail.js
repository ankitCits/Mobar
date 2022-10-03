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
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { getPrintInvoicePdf } from '../../api/order';
import RNFetchBlob from 'rn-fetch-blob';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
import { getAccessToken } from '../../localstorage';
export default class OrderHistoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.route.params.orderData.ecom_bc_order_details,
      visibility: false,
      pdfLink: '',
      orderHistory: props.route.params.orderData,
      hostUrl: props.route.params.hostUrl,
    };
    console.log('orderHistory data ', this.state.orderHistory.orderId);
  }

  componentDidMount() {
    // this.getPdfInvoiceLink();
  }

  getPdfInvoiceLink = async () => {
    const data = {
      orderId: this.state.orderHistory.orderId,
    }
    try {
      const res = await getPrintInvoicePdf(data);
      this.setState({ pdfLink: res.response.result.hostUrl + res.response.result.data }, () => this.downloadPdf())
    } catch (error) {
      console.log(" history details > getPdfInvoiceLink > catch ", error);
    }

  }

  downloadPdf = async () => {
    if (Platform.OS === 'ios') {
      this.downloadHistory();
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'Allow access external storage to download invoice pdf',
          },
        ).then(granted => {
          console.log("permission storage granted,result granted > ", granted, PermissionsAndroid.RESULTS.GRANTED);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            console.log('Storage Permission Granted.');
            this.downloadHistory();
          } else {
            //If permission denied then show alert 'Storage Permission 
            alert('Storage permission has denied.');
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log('error', err);
      }
    }
  }


  downloadHistory = async () => {
    const token = getAccessToken();
    const { config, fs } = RNFetchBlob;
    let DownloadDir = RNFetchBlob.fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: 'application/pdf',
        notification: true,
        path:
          DownloadDir +
          '/MybarInvoice1.pdf',
        description: 'Your invoice pdf download',
      },
    };
    try {
      const res = await config(options).fetch('GET', this.state.pdfLink, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/pdf',
      });
      
    } catch (error) {
      console.log("orderHistoryDetails > downloadHistory > catch >", error);
      alert('Download failed.');
    }
  }



  renderCartItems = (item, index) => {
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
            <TouchableOpacity
              onPress={() => {
                this.getPdfInvoiceLink();
              }}
              style={{ margin: 15 }}>
              <Image
                style={styles.productImg}
                resizeMode={'cover'}
                source={images.pdf}
                defaultSource={images.pdf}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              margin: 15,
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
          <View style={{ marginTop: '0%', flex: 0, justifyContent: 'flex-end', }}>
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
