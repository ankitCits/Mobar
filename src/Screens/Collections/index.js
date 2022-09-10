import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showAlert } from '../../api/auth';
import { addToCart, fetchCollectionData } from '../../api/product';
import { FontFamily } from '../../Theme/FontFamily';
import images from '../../assets/images';
import { getAccessToken } from '../../localstorage';
import { ThemeColors } from '../../Theme/ThemeColors';
import NoContentFound from '../../Component/NoContentFound';
import HTMLView from 'react-native-htmlview';
export default class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibilityQuantity: 30,
      modalVisible: false,
      hostUrl:'',
      isLoading:false,
      data: [],
    };
  }

  componentDidMount() {
    // const token = await getAccessToken();
    // console.log("Token ",token);
    // if (token != null) {
      this.fetchData();
  }

  fetchData = async () => {
    try {
      this.setState({isLoading:true});
      const response = await fetchCollectionData();
      this.setState({hostUrl:response.response.result.hostUrl,data:response.response.result.data,isLoading:false});
    } catch (error) {
      this.setState({isLoading:false});
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }

  addCart = async (prodUnitId) => {
    try {
      const cartItem={
        productUnitId:prodUnitId,
        comboId:0,
        qty:1
      }
      const cartResponse = await addToCart(cartItem);
      ToastAndroid.showWithGravity(
        'Item added to cart successfully',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } catch (error) {
      console.log("Details Bars > addCart > catch", error);
      ToastAndroid.showWithGravity(
        'Try again!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  }

  showModal = async () => {
    const token = await getAccessToken();
    if (token == null) {
      showAlert();
      return;
    } else {
      this.setState({ modalVisible: true });
    }
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <SafeAreaView
        style={styles.container}>
        <View style={styles.subContainer}>
          <View
            style={styles.header}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MyBottomTabs')}>
              {/* <Icon name="arrow-back" size={28} color="#4D4F50" /> */}
            </TouchableOpacity>
            <View style={{}}>
              <Text style={styles.headerText}>
                Collections
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.filterRow}>
          <View style={styles.filterView}>
            <View
              style={styles.sort}>
              <TouchableOpacity style={styles.filterInnerView}>
                <Icon name="swap-vert" size={28} color="#4D4F50" />
                <Text style={styles.filterInnerText}>Sort</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filterView}>
            <View
              style={styles.filter}>
              <TouchableOpacity style={styles.filterInnerView}>
                <Icon name="filter-list-alt" size={24} color="#4D4F50" />
                <Text style={styles.filterInnerText}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state.isLoading ? (
                <ActivityIndicator size="small" color={ThemeColors.CLR_WHITE} />
              ) : 
        this.state.data && this.state.data.length > 0 ? 
        this.state.data.map((item,index)=>
        <>
          <TouchableOpacity
          key={index}
            style={styles.productView}
            onPress={() =>
              this.props.navigation.navigate('OrderHistoryDetail')
            }>
            <View style={styles.productInnerView} key={index}>
              <Image
                source={{ uri: `${this.state.hostUrl + item.ecom_aca_product_unit.ecom_ac_product.images}` }}
                style={styles.prodImg}
              />
            </View>
            <View style={styles.item}>
              <View
                style={styles.itemHeader}>
                <Text
                  style={styles.title}>
                  {item.ecom_aca_product_unit.ecom_ac_product.name}
                </Text>
              </View>
              <View style={styles.itemDes}>
                <HTMLView
                  value={item.ecom_aca_product_unit.ecom_ac_product.shortDescription.substr(0,28)} />                
              </View>
              {/* <View>
                <Text
                  style={styles.itemDes}>
                  Available Qty: {item.availableQty+' '+item.unitType}
                </Text>
              </View> */}
              <View>
                <Text
                  style={styles.itemDes}>
                  Qty: {item.ecom_aca_product_unit.unitQty + ' ' +item.ecom_aca_product_unit.unitType}
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.validDate, styles.itemDes]}>
                  Valid until: {item.validTillDate}
                </Text>
              </View>
            </View>
            <View
              style={styles.cartContainer}>
              <View style={styles.cart}>
                <TouchableOpacity
                  onPress={() => this.addCart(item.ecom_aca_product_unit.productUnitId)}
                  style={styles.cartIcon}>
                  <Icon name="add" size={18} color={ThemeColors.CLR_WHITE} />
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.props.navigation.navigate('SelectBars')}
                  style={styles.redeemBtn}>
                  <Text
                    style={styles.redeemBtnText}>
                    Redeem
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* <View
            style={styles.productView}
            onPress={() =>
              this.props.navigation.navigate('OrderHistoryDetail')
            }>
            <View style={styles.productInnerView}>
              <Image
                resizeMode={'cover'}
                source={images.product2}
                defaultSource={images.product2}
              />
            </View>
            <View style={styles.item}>
              <View
                style={styles.itemHeader}>
                <Text
                  style={styles.title}>
                  Chivas Regal 12
                </Text>
              </View>

              <View>
                <Text
                  style={styles.itemDes}>
                  Blended
                </Text>
              </View>

              <View>
                <Text
                  style={styles.itemDes}>
                  Available Qty: 150 ml
                </Text>
              </View>

              <View>
                <Text
                  style={[styles.validDate, styles.itemDes]}>
                  Valid until: 20 Jun 2021
                </Text>
              </View>
            </View>
            <View
              style={styles.cartContainer}>
              <View style={styles.cart}>
                <TouchableOpacity
                  onPress={() => this.showModal()}
                  style={styles.cartIcon}>
                  <Icon name="add" size={18} color={ThemeColors.CLR_WHITE} />
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.props.navigation.navigate('SelectBars')}
                  style={styles.redeemBtn}>
                  <Text
                    style={styles.redeemBtnText}>
                    Active
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
        
        </>):(
            <NoContentFound title="No Data Found" />
          )}


        {/* <View style={{marginTop: '10%', flex: 1, justifyContent: 'flex-end'}}>
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
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
            }}>
              
            <View style={{margin: 20}}>
              <View>
                <Text
                  style={{
                    color: '#ACACAC',
                    fontWeight: '500',
                  }}>
                  2 Items selected add to cart{' '}
                </Text>
              </View>

              <View style={{marginTop: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#000',
                    }}>
                    Adrianna Vineyard
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity>
                      <Icon name="remove" size={20} color="#4D4F50" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        color: '#000',
                      }}>
                      {' '}
                      1{' '}
                    </Text>
                    <TouchableOpacity>
                      <Icon name="add" size={20} color="#4D4F50" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#000',
                    }}>
                    Havana Club
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity>
                      <Icon name="remove" size={20} color="#4D4F50" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        color: '#000',
                      }}>
                      {' '}
                      2{' '}
                    </Text>
                    <TouchableOpacity>
                      <Icon name="add" size={20} color="#4D4F50" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{marginTop: '10%', marginBottom: 10}}>
                  <TouchableOpacity
                    style={styles.save}
                    onPress={() => this.props.navigation.navigate('MyCard')}>
                    <Text style={{color: '#fff', fontSize: 15}}>VIEW CART</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text></Text>
                <Text
                  style={styles.modalTitle}>
                  Topup
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ modalVisible: false })}>
                  <Icon name="close" size={28} color="#4D4F50" />
                </TouchableOpacity>
              </View>
              <View
                style={styles.modalBorder}
              />

              <View style={styles.modalItem}>
                <View style={styles.modalImage}>
                  <Image
                    resizeMode={'cover'}
                    source={images.product3}
                    defaultSource={images.product3}
                  />
                </View>
                <View style={styles.itemTitle}>
                  <Text
                    style={styles.itemTitleText}>
                    Havana Club
                  </Text>

                  <TouchableOpacity
                    onPress={() => this.setState({ visibilityQuantity: 30 })}
                    style={
                      this.state.visibilityQuantity == 30
                        ? styles.itemQuantitySelected
                        : styles.itemQuantity
                    }>
                    <View style={styles.modalQty}>
                      <Icon name="wine-bar" size={22} color="#7B7B7B" />
                      <Text
                        style={styles.modalQtyText}>
                        30ml
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={styles.modalPriceText}>
                        $59
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.setState({ visibilityQuantity: 60 })}
                    style={
                      this.state.visibilityQuantity == 60
                        ? styles.itemQuantitySelected
                        : styles.itemQuantity
                    }>
                    <View style={styles.modalQty}>
                      <Icon name="wine-bar" size={22} color="#7B7B7B" />
                      <Text
                        style={styles.modalQtyText}>
                        60ml
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={styles.modalPriceText}>
                        $85
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.setState({ visibilityQuantity: 90 })}
                    style={
                      this.state.visibilityQuantity == 90
                        ? styles.itemQuantitySelected
                        : styles.itemQuantity
                    }>
                    <View style={styles.modalQty}>
                      <Icon name="wine-bar" size={22} color="#7B7B7B" />
                      <Text
                        style={styles.modalQtyText}>
                        90ml
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={styles.modalPriceText}>
                        $99
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.cartBtnContainer}>
                <TouchableOpacity
                  style={styles.addToCard}
                  onPress={() => this.addCart()}>
                  <Text style={styles.cartBtnText}>ADD TO CART</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    padding: 10,
  },
  header: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontSize: 20,
    color: '#4D4F50',
    fontWeight: '500'
  },
  filterRow: {
    flexDirection: 'row'
  },
  filter: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  filterView: {
    backgroundColor: '#fff',
    height: 50,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderTopWidth: 0
  },
  sort: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  filterInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterInnerText: {
    marginLeft: 5,
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontWeight: '400',
    fontSize: 18,
    color: '#4D4F50',
  },
  productList: {
    color: '#ACACAC',
  },
  productView: {
    backgroundColor: ThemeColors.CLR_WHITE,
    width:'95%',
    shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 25,
  },
  productInnerView: {
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prodImg:{width:75,height:75},
  item: {
    margin: 5,
    width:'45%',
  },
  itemHeader: {
    flexDirection: 'row',
    marginTop: 5,
  },
  title: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 18,
    fontWeight: '700',
    color: '#4D4F50'
  },
  itemDes: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 14,
    color: '#424242',
    fontWeight: '400'
  },
  validDate: {
    fontSize: 12
  },
  cartContainer: {
    marginTop: 10,
    marginBottom:5,
    flexDirection: 'row',
  },
  cart: {
    justifyContent: 'space-between',
    marginRight:20,
  },
  cartIcon: {
    alignSelf: 'flex-end',
    backgroundColor: '#BABABA',
    padding: 2,
    marginRight: 10,
    borderRadius: 20,
  },
  redeemBtn: {
    backgroundColor: '#C11331',
    padding: 5,
    borderRadius: 20,
    width: 80,
    margin:0,
  },
  redeemBtnText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 15,
    alignSelf:'center',
    color: ThemeColors.CLR_WHITE,
    fontWeight: '500',
  },
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalTitle:{
  fontFamily:FontFamily.ROBOTO_REGULAR,
  fontSize: 20,
  fontWeight: '500',
  color: '#4D4F50',
},
modalBorder:{
  height: 0.8,
  backgroundColor: '#DADADA',
  marginTop: 8,
  marginBottom: 8,
},
modalItem:{ 
  flexDirection: 'row', 
  marginTop: 10 
},
modalImage:{
  width:'35%',
  alignItems:'center'
},
itemTitle:{ marginTop:10 },
itemTitleText:{
  fontFamily:FontFamily.TAJAWAL_REGULAR,
  fontSize: 25,
  fontWeight: '700',
  color: '#4D4F50',
},
modalQty:{ 
  flexDirection: 'row', 
  alignItems: 'center' 
},
modalQtyText:{
  fontFamily:FontFamily.TAJAWAL_REGULAR,
  fontWeight:'500',
  fontSize: 15,
  color: '#7B7B7B',
},
modalPriceText:{
  fontFamily:FontFamily.TAJAWAL_REGULAR,
  fontSize: 21,
  fontWeight: '700',
  color: ThemeColors.CLR_DARK_GREY,
},
cartBtnContainer:{ marginTop: '10%', marginBottom: 10 },
addToCard: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
  },
cartBtnText:{ 
  fontFamily:FontFamily.TAJAWAL_REGULAR,
  fontSize:18, 
  color: ThemeColors.CLR_WHITE 
},
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 332,
    height: 384,
  },
  modalHeader: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 2,
  },
  itemQuantitySelected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 1,
    padding: 2,
    borderRadius: 15,
    borderColor: '#A1172F',
  },
});
