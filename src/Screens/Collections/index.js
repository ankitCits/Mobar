import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { addToCart, fetchCollectionData } from '../../api/product';
import { FontFamily } from '../../Theme/FontFamily';
import images from '../../assets/images';
import { getAccessToken } from '../../localstorage';
import { ThemeColors } from '../../Theme/ThemeColors';
import SelectInput from '../../Component/SelectInput';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import moment from 'moment/moment';
import HeaderSide from '../Component/HeaderSide';
import CartModal from '../../Component/CartModal';
import PaymentForm from '../../Component/PaymentForm';
import { initStripe, confirmPayment } from '@stripe/stripe-react-native';
import { fetchPaymentIntentClientSecret, increaseActiveDate } from '../../api/order';
import { amountForActiveDate } from '../../api/order';
import { connect } from 'react-redux';
import NoContentFound from '../../Component/NoContentFound';
import { authErrorMsg, stripePublishableKey, UnAuthorizedUser } from '../../config';
import { isLoggedIn, setDateFormate, showAlert, showToaster } from '../../api/func';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connectActionSheet } from '@expo/react-native-action-sheet';
const options = ['Sort By Date', 'Sort By Quantity', 'Cancel'];
const cancelButtonIndex = 2;
class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibilityQuantity: 30,
      cartModalVisible: false,
      isComboProduct: false,
      hostUrl: '',
      comboProduct: { productId: 0, walletId: 0, text: 'Select Product' },
      comData: null,
      comboProducts: [],
      isToggle: false,
      modalVisible: false,
      paymentModal: false,
      paymentType: 'creditDebit',
      activeDateAmount: 0,
      modalCartItem: null,
      item: null,
      type: 'Product',
      sort:'ASC',
      index: null,
      selectedQty: {
        name: 'name',
        unit: '0ml',
        qty: 0
      },
      isLoading: true,
      loader: false,
      refreshing: false,
      selectedWalletId: 0,
      userEmail: (props.redux.auth.userData) ? props.redux.auth.userData.result.profile.email : null,
      data: [],
    };
  }

  async componentDidMount() {
    this.state._unsubscribe = this.props.navigation.addListener('focus', async () => {
    if (await isLoggedIn()) {
      async function initialize() {
        await initStripe({
          publishableKey: stripePublishableKey,
        });
      }
      initialize().catch("collection > componentDidMount > catch", console.error);
        this.fetchData();
        this.fetchActiveDateAmount();
      
    } else {
      this.setState({ isLoading: false });
      showToaster(UnAuthorizedUser);
    }
  });
  }

  componentWillUnmount() {
    this.state._unsubscribe();
  }

  onRefresh = async () => {
    await this.fetchData();
  }

  fetchData = async (dateSort='',qtySort='') => {
    try {
      this.setState({ isLoading: true });
      const data={
          validDateSort : dateSort,
          availableQtySort:qtySort
      };
      const response = await fetchCollectionData(data);
      response.response.result.data.map((item) => {
        item.qty = 0
      });
      this.setState({
        hostUrl: response.response.result.hostUrl,
        data: response.response.result.data,
        isLoading: false,
      });
    } catch (error) {
      console.log("collection > catch > error", error);
      this.setState({ isLoading: false });
      showToaster(error);
    }
  }

  fetchActiveDateAmount = async () => {
    try {
      this.setState({ isLoading: true });
      const res = await amountForActiveDate();
      this.setState({ isLoading: false, activeDateAmount: res.response.result.data.Amount });
    } catch (error) {
      this.setState({ isLoading: false });
      console.log("Collection > fetchActiveDateAmount > catch >", error);
      showToaster(error)
    }
  }

  addCart = async (item, type, index, category) => {
    if (category == 2)
      return;
    try {
      const cartItem = {
        productUnitId: (type == 'product') ? item.ecom_aca_product_unit.productUnitId : 0,
        comboId: (type == 'combo') ? item.ecom_ea_combo.comboId : 0,
        qty: 1
      };
      const res = await addToCart(cartItem);
      const defaultQty = this.state.data[index].qty;
      this.state.data[index].qty = defaultQty + 1;
      this.setState({ data: this.state.data });
      if (type == 'product') {
        this.setState({
          selectedQty:
          {
            name: item.ecom_aca_product_unit.ecom_ac_product.name,
            unit: item.ecom_aca_product_unit.unitQty + item.ecom_aca_product_unit.unitType,
            type: type,
            index: index,
            items: item,
            qty: defaultQty + 1
          }
        });
      } else {
        this.setState({
          selectedQty: {
            name: item.ecom_ea_combo.name,
            unit: item.walletOriginalTotalQty + item.unitType,
            qty: defaultQty + 1,
            type: type,
            index: index,
            items: item,
          }
        });
      }
      this.setState({ cartModalVisible: true });

    } catch (error) {
      console.log("Collection > addCart > catch", error);
      showToaster(error);
    }
  }

  onSelect = (value) => {
    this.state.comboProduct.productId = value.id,
      this.state.comboProduct.text = value.title,
      this.toggle();
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

  toggle = () => {
    this.setState({ isToggle: !this.state.isToggle });
  };

  onModal = (data) => {
    if (data.validDateStatus == 1) {
      this.setState({ paymentModal: true, selectedWalletId: data.walletId })
    } else {
      const comboData = data.ecom_ea_combo.ecom_ac_products.map(x => {
        return {
          id: x.productId,
          title: x.name
        }
      });
      this.setState({ isComboProduct: true, comData: data, comboProducts: comboData });
      this.state.comboProduct.walletId = data.walletId;
    }
  }

  renderProducts = (item, index) => {
    return (
      item.ecom_aca_product_unit != null ?
        <>
          <View
            key={index}
            style={styles.productView}
          >
            <View style={styles.productInnerView} >
              <Image
                source={{ uri: `${this.state.hostUrl + item.ecom_aca_product_unit.ecom_ac_product.images}` }}
                defaultSource={images.defaultImg}
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
                <Text
                  style={styles.qtyText}>
                  Available Qty: {item.availableQty}
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.validDate, styles.itemDes]}>
                  Valid until: {setDateFormate(item.validTillDate)}
                </Text>
              </View>
            </View>
            <View
              style={styles.cartContainer}>
              <View style={styles.cart}>
                <TouchableOpacity
                  onPress={() => this.addCart(item, 'product', index, 1)}
                  style={styles.cartIcon}>
                  <Icon name="add" size={18} color={ThemeColors.CLR_WHITE} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.onRedeem(item)
                  }
                  style={styles.redeemBtn}>
                  <Text
                    style={styles.redeemBtnText}>
                    {item.validDateStatus == 1 ? 'Activate' : 'Redeem'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </> :
        <>
          <View
            key={index}
            style={styles.productView}
          >
            <View style={styles.productInnerView} key={index}>
              <Image
                source={{ uri: `${this.state.hostUrl + item.ecom_ea_combo.images}` }}
                style={styles.prodImg}
              />
            </View>
            <View style={styles.item}>
              <View
                style={styles.itemHeader}>
                <Text
                  style={styles.title}>
                  {item.ecom_ea_combo.name}
                </Text>
              </View>
              <View style={styles.itemDes}>
                <Text style={styles.qtyText}
                >Available Qty : {item.availableQty}</Text>
              </View>
              <View>
                <Text
                  style={[styles.validDate, styles.itemDes]}>
                  Valid until: {setDateFormate(item.validTillDate)}
                </Text>
              </View>
            </View>
            <View
              style={styles.cartContainer}>
              <View style={styles.cart}>
                <TouchableOpacity
                  onPress={() => this.addCart(item, 'combo', index, 1)}
                  style={styles.cartIcon}>
                  <Icon name="add" size={18} color={ThemeColors.CLR_WHITE} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { this.onModal(item) }}
                  style={styles.redeemBtn}>
                  <Text
                    style={styles.redeemBtnText}>
                    {item.validDateStatus == 1 ? 'Activate' : 'Redeem'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
    );
  }

  onSelected = (value) => {
    this.state.comboProduct.productId = value.productId,
      this.state.comboProduct.text = value.name,
      this.toggle();
  };

  onCloseModal = (isClose) => {
    this.setState({ cartModalVisible: isClose })
  }

  onSelectComboProduct = () => {
    this.setState({ isComboProduct: !this.state.isComboProduct },
      this.props.navigation.navigate('SelectBars', { data: this.state.comboProduct }));

  }

  onRedeem = (item) => {
    item.validDateStatus == 1 ?
      this.setState({ paymentModal: true, selectedWalletId: item.walletId }) :
      this.props.navigation.navigate('SelectBars', { data: { walletId: item.walletId, productId: item.ecom_aca_product_unit.ecom_ac_product.productId } });

  }

  increaseDate = async () => {
    try {

      this.setState({ loader: true });
      const postData = { orderAmount: this.state.activeDateAmount * 100 }; // get dynamic amount and pass to below api 
      const res = await fetchPaymentIntentClientSecret(postData);
      const billingDetails = {
        email: this.state.userEmail,
      };
      const { paymentIntent, error } = await confirmPayment(
        res.response.result.paymentIntent,
        {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
          },
        },
        { setupFutureUsage: 'OffSession', }
      );
      if (error) {
        console.log("Collection > increaseDate > error > ", error);
        this.setState({ loader: false });
        showAlert(`${error.code}`, error.localizedMessage)
      } else if (paymentIntent) {
        if (paymentIntent.status === 'Succeeded') {
          try {
            const data = {
              walletId: this.state.selectedWalletId,
              transactionId: paymentIntent.id,
              paymentMethod: 'credit-debit-cart',
              transactionPayAmount: paymentIntent.amount,
              transactionDate: moment(new Date()).format('YYYY-MM-DD'),
              transactionTime: moment(new Date()).format('HH:mm:ss'),
              transactionStatus: 'SUCCEEDED'
            }
            const res = await increaseActiveDate(data); // Call api to increase date 
            this.setState({ loader: false, paymentModal: false });
            this.fetchData();
          } catch (e) {
            console.log("Collection > increaseDate > catch >", e);
            this.setState({ loader: false });
            showAlert('Error', 'Error while processing payment')
          }
        } else {
          this.setState({ loader: false });
        }
      }
    } catch (error) {
      console.log("Collection > increaseDate > catch >", error);
    }
  }

  sortBy = (type) => {
    if(this.state.sort == 'ASC')
      this.setState({sort:'DESC'});
    else
      this.setState({sort:'ASC'});

    if(type=='Qty')
      this.fetchData('',this.state.sort);
    else
      this.fetchData(this.state.sort,'');
    // this.props.showActionSheetWithOptions(
    //   {
    //     options,
    //     cancelButtonIndex,
    //   },
    //   (buttonIndex) => {
    //     console.log("buttonIndex > ",buttonIndex);
    //     if (buttonIndex === 0) { // short by date or DESC
    //       this.fetchData('DESC','');
    //     } else if (buttonIndex === 1) { // short by date or ASC
    //       this.fetchData('','ASC');
    //     }
    //   }
    // );  
  };

  render() {

    return (
      <SafeAreaView
        style={styles.container}>
        <HeaderSide
          name={'Collection'}
          onClick={() => this.props.navigation.goBack()}
        />

        {
          this.state.isLoading ? (
            <ThemeFullPageLoader />
          ) : (
            <>
            {this.state.data != null && this.state.data.length > 0 ?
              (
                <>
                      <View style={{
                        flexDirection: 'row',
                      }}>
                        <TouchableOpacity
                          onPress={() => this.sortBy('Qty')}
                          style={styles.filterView}>
                          <TouchableOpacity onPress={() => this.sortBy('Qty') } style={styles.filterInnerView}>
                            <Icon name="swap-vert" size={28} color="#4D4F50" />
                            <Text style={styles.filterInnerText}>Available Quantity</Text>
                          </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.sortBy('Date')}
                          style={styles.filterView}>
                          <View onPress={() => this.sortBy('Date')} style={styles.filterInnerView}>
                            <Icon name="swap-vert" size={28} color="#4D4F50" />
                            <Text style={styles.filterInnerText}>Validity Date </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                <FlatList
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginTop: 10,
                  }}
                  data={this.state.data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => this.renderProducts(item, index)}
                  refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                  }
                /></>
                )
                : (<NoContentFound title="No Data Found" />)
              }
            </>
          )
        }

        {/* Product Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isComboProduct}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text></Text>
                <Text
                  style={styles.modalTitle}>
                  Select Products
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ isComboProduct: !this.state.isComboProduct })}>
                  <Icon name="close" size={28} color="#4D4F50" />
                </TouchableOpacity>
              </View>
              <View
                style={styles.modalBorder}
              />
              <View style={{ marginTop: 30, marginHorizontal: 7 }}>
                <SelectInput items={this.state.comboProducts}
                  selectedItems={{ id: 0, title: 'Select Product' }}
                  visible={false}
                  onChange={
                    (item) => { this.onSelect(item) }
                  } />
              </View>
              <View style={{ marginTop: 50, height: 48, zIndex: 1 }}>
                <TouchableOpacity
                  style={styles.addToCard}
                  onPress={() => this.onSelectComboProduct()}
                >
                  <Text style={styles.cartBtnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* End Product Modal */}

        {/* Top up Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            this.setState({ cartModalVisible: false });
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text></Text>
                <Text
                  style={styles.modalTitle}>
                  Top up
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ cartModalVisible: false })}>
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
        {/*End Top up Modal */}

        {/* Payment Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.paymentModal}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalView, styles.heightAuto]}>
              <View style={styles.modalHeader}>
                <Text
                  style={styles.modalTitle}>
                  Checkout
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ paymentModal: false })}>
                  <Icon name="close" size={28} color="#4D4F50" />
                </TouchableOpacity>
              </View>
              <View
                style={styles.modalBorder}
              />
              {this.state.paymentType == 'creditDebit' ? (
                <View style={{
                  flexDirection: "column",
                  justifyContent: 'flex-start'
                }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '400',
                      color: '#4D4F50',
                      marginLeft: 15,
                      marginTop: 10,
                    }}>
                    Enter Payment Details
                  </Text>
                  <PaymentForm></PaymentForm>
                </View>
              ) : null}

              <View
                style={{
                  //marginTop: '10%',
                  //flex: 1,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    //shadowOpacity: 1,
                    shadowRadius: 10,
                    elevation: 10,
                    zIndex: 1,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      margin: 10,
                      marginLeft: 30,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#3C3C3C',
                      }}>
                      Order Summary
                    </Text>
                  </View>
                  <View
                    style={{
                      // marginTop: 20,
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
                      ${this.state.activeDateAmount}
                    </Text>
                  </View>

                  {/* {this.state.amountData.couponDiscount > 0 &&
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
                    Coupon Discount
                  </Text>
                  <Text
                    style={{
                      marginRight: 40,
                      color: '#F01111',
                      fontWeight: '500',
                      fontSize: 18,
                    }}>
                    -$10
                    {/* {this.state.amountData.couponDiscount} 
                  </Text>
                </View>
              {/* } */}

                  {/* {this.state.amountData.extraDiscount > 0 && 
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
                    -$100
                    {/* {this.state.amountData.extraDiscount} 
                  </Text>
                </View>
              {/* } */}

                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#000',
                      marginTop: 10,
                    }}
                  />

                  <View
                    style={{
                      marginVertical: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginLeft: 30,
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 22,
                      }}>
                      Total Payable
                    </Text>
                    <Text
                      style={{
                        marginRight: 40,
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 22,
                      }}>

                      ${this.state.activeDateAmount}
                    </Text>
                  </View>

                  <View style={{ marginBottom: 15 }}>
                    <TouchableOpacity
                      style={styles.placeOrder}
                      disabled={this.state.loader}
                      onPress={() =>
                        this.increaseDate()
                      }
                    >
                      {this.state.loader ?
                        (
                          <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                          <Text style={{ color: '#fff', fontSize: 18 }}>PLACE ORDER</Text>
                        )
                      }

                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* End Payment Modal */}

        <CartModal props={this.props}
          navigation={this.props.navigation}
          data={this.state.selectedQty}
          modalVisible={this.state.cartModalVisible}
          onModalChange={this.addCart}
          onModalClose={this.onCloseModal} />

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
    //height: 50,
    flexDirection:'row',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.4,
    justifyContent:'center',
    shadowRadius: 3,
    elevation: 5,
    borderTopWidth: 0,
    paddingVertical:6,
    marginBottom: 10

  },
  sort: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '95%',
    shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  productInnerView: {
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prodImg: { width: 75, height: 75 },
  item: {
    margin: 5,
    width: '45%',
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
    fontWeight: '400',
    paddingVertical: 5
  },
  qtyText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '300',
    fontSize: 14,
    color: ThemeColors.CLR_DARK_GREY
  },
  validDate: {
    fontSize: 12
  },
  cartContainer: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  cart: {
    justifyContent: 'space-between',
    marginRight: 20,
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
    margin: 0,
  },
  redeemBtnText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 15,
    alignSelf: 'center',
    color: ThemeColors.CLR_WHITE,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius:20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalTitle: {
    fontFamily: FontFamily.ROBOTO_REGULAR,
    fontSize: 20,
    fontWeight: '500',
    color: '#4D4F50',
  },
  modalBorder: {
    height: 1,
    backgroundColor: '#DADADA',
    marginTop: 8,
  },
  modalItem: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  modalImage: {
    width: '35%',
    alignItems: 'center'
  },
  sectionStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: ThemeColors.CLR_WHITE,
    borderWidth: 0,
    borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    height: 48,
    width: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 4,
  },
  collapsed: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    backgroundColor: ThemeColors.CLR_WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#c3c3c3',
    borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    height: 48,
    width: 300,
    elevation: 4,
  },
  accordianTitle: {
    flexDirection: 'row',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c3c3c3',
    alignItems: 'center',
    height: 48,
    alignSelf: 'center'
  },
  hide: {
    height: 0
  },
  selected: {
    borderColor: "#AB1731",
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderLeftWidth: 5,
  },
  inputText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '400',
    fontSize: 15,
    flex: 1,
    padding: 10,
    color: ThemeColors.CLR_DARK_GREY
  },
  itemTitle: { marginTop: 10, marginBottom: 10, },
  itemTitleText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 25,
    fontWeight: '700',
    color: '#4D4F50',
  },
  modalQty: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalQtyText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '500',
    fontSize: 15,
    color: '#7B7B7B',
  },
  modalPriceText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 21,
    fontWeight: '700',
    color: ThemeColors.CLR_DARK_GREY,
  },
  cartBtnContainer: { flexDirection: 'column', marginBottom: 10 },
  addToCard: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
  },
  cartBtnText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 18,
    color: ThemeColors.CLR_WHITE
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    width: 332,
    height: 384,
  },
  heightAuto: {
    height: 'auto',
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
  descriptionContainer: { marginTop: 20 },
  placeOrder: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
function mapStateToProps(state) {
  let redux = state;
  return { redux };
}

const connectedApp = connectActionSheet(Collections);

export default connect(mapStateToProps, mapDispatchToProps)(connectedApp);