import moment from 'moment/moment';
import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { orderHistory, redeemOrderHistory } from '../../api/order';
import images from '../../assets/images';
import { FontFamily } from '../../Theme/FontFamily';
import NoContentFound from '../../Component/NoContentFound';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { ThemeColors } from '../../Theme/ThemeColors';
import HeaderSide from '../Component/HeaderSide';

const LazyPlaceholder = ({ route }) => (
  <View>
    <ThemeFullPageLoader />
  </View>
);
export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      loader: true,
      data: [],
      redeemOrders:[],
      url: null,
      index:0,
      routes: [
        { key: '1', name: 'Products' },
        { key: '2', name: 'Redeem' },
      ],
    };
  }

  componentDidMount() {
    this.fetchOrders();
    this.fetchRedeemOrders();
  }

  fetchOrders = async () => {
    try {
      this.setState({ loader: true })
      const res = await orderHistory();
      this.setState({ url: res.response.result.hostUrl, data: res.response.result.data, loader: false })
    } catch (error) {
      this.setState({ loader: false });
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      console.log('fetchOrders Error', error);
    }
  };

  fetchRedeemOrders = async () => {
    try {
      this.setState({ loader: true })
      const res = await redeemOrderHistory();
      console.log("redeemOrder history",res);
      this.setState({ url: res.response.result.hostUrl, redeemOrders: res.response.result.data, loader: false })
    } catch (error) {
      this.setState({ loader: false });
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      console.log('fetchRedeemOrders Error', error);
    }
  };

  renderItem = (item, index) => {
    return (
      <>
        <TouchableOpacity key={index}
          style={[styles.subContainer, styles.productContainer]}
        // onPress={() =>
        //   this.props.navigation.navigate('OrderHistoryDetail', { orderData: item, hostUrl: this.state.url })
        // }
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
                  item.ecom_bc_order_details[0].productImage
                  }`,
              }}
            />
          </View>

          <View style={{ margin: 5, marginLeft: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: '#4D4F50',
                }}>
                Purchase Id :{item.orderNumber}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#4D4F50',
                  fontWeight: '400',
                }}>
                Purchased On : {this.formatDDMMM(item.orderDate)}
              </Text>
            </View>
            {this.state.data.couponCode == '' &&
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
                    {item.couponCode}
                  </Text>
                </View>

                <Text style={{ marginLeft: 10, fontSize: 13 }}>
                  Applied
                </Text>
              </View>
            }
          </View>

          <View style={{ marginTop: 5, paddingLeft: 30 }}>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 20,
                color: '#4D4F50',
                fontWeight: '400',
              }}>
              {item.ecom_bc_order_details[0].productUnitType}
            </Text>

            <Text
              style={{
                fontSize: 20,
                marginLeft: 20,
                color: '#4D4F50',
                fontWeight: '500',
                marginTop: 5,
              }}>
              ${item.subTotalAmount}
            </Text>

            <View
              style={{
                backgroundColor: '#26B90E',
                // height:30,
                // width:90,
                // right:15,
                padding: 5,
                marginTop: 10,
                marginLeft: 5,
                borderRadius: 10,
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
    )
  }

  _handleIndexChange = index => this.setState({ index });

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

  _renderScene = ({ route, jumpTo }) => {
    if (route.name == 'Products') {
      return (
        <View style={styles.redeemContainer}>
          <ScrollView>
            {
              this.state.data && this.state.data.length > 0 ? (
                this.state.data.map((item,index)=>{
                return (
                  <>
                    <TouchableOpacity key={index}
                      style={[styles.subContainer, styles.productContainer]}
                    // onPress={() =>
                    //   this.props.navigation.navigate('OrderHistoryDetail', { orderData: item, hostUrl: this.state.url })
                    // }
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
                              item.ecom_bc_order_details[0].productImage
                              }`,
                          }}
                        />
                      </View>
            
                      <View style={{ margin: 5, marginLeft: 10 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '700',
                              color: '#4D4F50',
                            }}>
                            Purchase Id :{item.orderNumber}
                          </Text>
                        </View>
            
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#4D4F50',
                              fontWeight: '400',
                            }}>
                            Purchased On : {this.formatDDMMM(item.orderDate)}
                          </Text>
                        </View>
                        {this.state.data.couponCode == '' &&
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
                                {item.couponCode}
                              </Text>
                            </View>
            
                            <Text style={{ marginLeft: 10, fontSize: 13 }}>
                              Applied
                            </Text>
                          </View>
                        }
                      </View>
            
                      <View style={{ marginTop: 5, paddingLeft: 30 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginLeft: 20,
                            color: '#4D4F50',
                            fontWeight: '400',
                          }}>
                          {item.ecom_bc_order_details[0].productUnitType}
                        </Text>
            
                        <Text
                          style={{
                            fontSize: 20,
                            marginLeft: 20,
                            color: '#4D4F50',
                            fontWeight: '500',
                            marginTop: 5,
                          }}>
                          ${item.subTotalAmount}
                        </Text>
            
                        <View
                          style={{
                            backgroundColor: '#26B90E',
                            // height:30,
                            // width:90,
                            // right:15,
                            padding: 5,
                            marginTop: 10,
                            marginLeft: 5,
                            borderRadius: 10,
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
                )})
                // <FlatList
                  
                //   data={this.state.data}
                //   keyExtractor={(item, index) => index.toString()}
                //   renderItem={({ item, index }) => this.renderItem(item, index)}
                // />
              ) : (
                <NoContentFound title="No Data Found" />
              )}
              </ScrollView>
          </View>
      )
    } else {
      return (
    
        <View style={styles.redeemContainer}>
          <ScrollView>
          {
          this.state.redeemOrders && this.state.redeemOrders.length > 0 ? (
            this.state.redeemOrders.map(item => { 
               return (
                <>
                <View style={styles.header}>
                  <Text
                  style={styles.titleText}
                     >{
                         moment(item.date).format('DD-MMM-YYYY') == moment(new Date).format('DD-MMM-YYYY') ?
                           'Today' :
                           moment(item.date).format('DD-MMM-YYYY')
                      }</Text>
                </View>
                  <TouchableOpacity
                    style={styles.subContainer}
                    // onPress={() =>
                    //   //this.props.navigation.navigate('OrderHistoryDetail', { orderData: item, hostUrl: this.state.url })
                    // }
                    >
                    <View style={styles.imageAvatar}>
                      <Image
                        style={styles.image}
                        resizeMode={'cover'}
                        source={{
                          uri: `${this.state.url +
                            item.ecom_ae_vendor.images
                            }`,
                        }}
                      />
                    </View>

                    <View style={styles.cardDetails}>
                      <View
                        style={styles.shopName}>
                        <Text
                          style={styles.shopNameText}>
                          {item.ecom_ae_vendor.vendorShopName}
                        </Text>
                      </View>

                      <View style={styles.shopName}>
                        <Text
                          style={styles.productText}>
                          Redeemed :{item.ecom_ac_product.name}
                        </Text>
                      </View>
                      <View style={styles.shopName}>
                        <Text
                          style={styles.productText}>
                          Redeemed On : {moment(item.date).format('DD-MMM-YYYY hh:mm A')}
                        </Text>
                      </View>
                      <View style={styles.shopName}>
                        <Text style={styles.quantity}>
                          {item.redeemUnitQty+' '+item.unitType+ ' - '+item.reddemQty}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.right}>
                        <View style={styles.closeContainer}>
                   <Icon name="close" size={28} color="#4D4F50" />
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
              )
            })
           ) : (
            <NoContentFound title="No Data Found" /> 
          )}
        
        </ScrollView>
      </View>
      );
    }
  };






  formatDDMMM = s => {
    var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var b = s.split(/\D/);
    return b[2] + ' ' + months[b[1] - 1];
  };

  render() {
    return (
      <SafeAreaView
        style={{flex:1,backgroundColor:ThemeColors.CLR_WHITE}}>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={'dark-content'}
        />
        <HeaderSide
          name={'Order History'}
          onClick={() => this.props.navigation.openDrawer()}
        />

        
        { this.state.loader ? 
        (    <ThemeFullPageLoader /> ) :
          <TabView
            lazy
            navigationState={this.state}
            renderScene={this._renderScene}
            renderLazyPlaceholder={this._renderLazyPlaceholder}
            onIndexChange={this._handleIndexChange}
            ///initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: ThemeColors.CLR_WHITE,margin:0 }}
                tabStyle={{ backgroundColor: ThemeColors.CLR_WHITE,padding:0,margin:0 }}
                style={{ backgroundColor: ThemeColors.CLR_BG }}
                renderLabel={({ route }) => (
                  <>

                    <View style={styles.tabRow}>
                      <Text
                        style={[styles.label,
                        route.key === props.navigationState.routes[this.state.index].key
                          ? styles.selectedTabText : styles.tabText
                        ]}>
                        {route.name}
                      </Text>
                    </View>
                    {route.key === props.navigationState.routes[this.state.index].key &&
                      <View style={styles.selectedTabBorder} />
                    }
                  </>
                )}
                labelStyle={styles.noLabel}
              />
            )}
          />
                  }
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabRow: { flexDirection: 'row',marginHorizontal:20 },
  selectedTabText: {
    color: ThemeColors.CLR_TAB,
  },
  selectedTabBorder: {
    backgroundColor: '#C11331',
    height: 3,
    width: 100,
    top: '30%',
  },
  tabText: {
    color: '#000000',
  },
  redeemContainer:{ 
    backgroundColor: ThemeColors.CLR_WHITE, 
    flex: 1,
    marginBottom:10
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
  header:{
    marginHorizontal:10,
    marginVertical:20,
    },
  titleText:{
    fontFamily:FontFamily.ROBOTO_REGULAR,
    fontSize:14,
    fontWeight:'400',
    color:'#ACACAC'
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
    marginHorizontal:10
    //margin: 10,
  },
  productContainer:{
    marginVertical:15
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
    margin:0,
    padding:0,
    backgroundColor:'red',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 6,
  },
  image:{
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  cardDetails:{
    marginTop:0, 
    margin: 15,
    paddingTop:5,
   },
  shopName:{
    width:150,
  },
  shopNameText:{
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    fontSize: 15,
    fontWeight: '700',
    color: '#4D4F50',
  },
  productText:{
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    fontSize: 12,
    color: '#4D4F50',
    fontWeight: '400',
  },
  quantity:{
      fontFamily:FontFamily.TAJAWAL_REGULAR,
      fontSize: 12,
      color: '#4D4F50',
      fontWeight: '700',
  },
  right:{
    flexDirection:'column',
    justifyContent:'space-between'
  },
  closeContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginHorizontal:5,
   },
  row:{
    flexDirection: 'row',
},
  redeemBtnContainer:{
    flexDirection: 'row',
    backgroundColor: '#B51D36',
    paddingHorizontal:15,
    paddingVertical:5,
    borderRadius: 10,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  redeemBtnText:{
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    fontWeight:'500',
    fontSize:12,
    color:ThemeColors.CLR_WHITE
  },

  orderPercentageImg: {
    width: 16.97,
    height: 17.79,
  },
});
