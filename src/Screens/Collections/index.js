import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ToastAndroid,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showAlert } from '../../api/auth';
import { addToCart, fetchCollectionData } from '../../api/product';
import { FontFamily } from '../../Theme/FontFamily';
import images from '../../assets/images';
import { getAccessToken } from '../../localstorage';
import { ThemeColors } from '../../Theme/ThemeColors';
import SelectInput from '../../Component/SelectInput';
import HTMLView from 'react-native-htmlview';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import moment from 'moment/moment';
import HeaderSide from '../Component/HeaderSide';

export default class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibilityQuantity: 30,
      modalVisible: false,
      isComboProduct: false,
      hostUrl: '',
      comboProduct: { productId: 0, walletId: 0, text: 'Select Product' },
      comData: null,
      comboProducts: [],
      isToggle: false,
      modalVisible:false,
      isLoading: false,
      refreshing: false,
      currentDate: new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate(),
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
  }

  onRefresh = async () => {
    await this.fetchData();
  }

  fetchData = async () => {
    try {
      this.setState({ isLoading: true });
      
      const response = await fetchCollectionData();
      this.setState({
        hostUrl: response.response.result.hostUrl,
        data: response.response.result.data,
        isLoading: false
      });
    } catch (error) {
      console.log("collection > catch > error", error);
      this.setState({ isLoading: false });
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }

  addCart = async (prodUnitId, type) => {
    try {
      const cartItem = {
        productUnitId: (type == 'product') ? prodUnitId : 0,
        comboId: (type == 'combo') ? prodUnitId : 0,
        qty: 1
      }
      await addToCart(cartItem);
      this.setState({modalVisible:true});
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

  onModal = (data, id) => {
    const comboData = data.map(x => {
      return {
        id: x.productId,
        title: x.name
      }
    });
    this.setState({ isComboProduct: true, comData: data, comboProducts: comboData });
    this.state.comboProduct.walletId = id;
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
              {/* <View style={styles.itemDes}>
                <HTMLView
                  value={item.ecom_aca_product_unit.ecom_ac_product.shortDescription.substr(0, 28)} />
              </View> */}
              <View style={styles.itemDes}>
                <Text
                style={styles.qtyText}>
                  Available Qty: {item.availableQty}
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.validDate, styles.itemDes]}>
                  Valid until: {moment(item.validTillDate).format('DD MMM YYYY')}
                </Text>
              </View>
            </View>
            <View
              style={styles.cartContainer}>
              <View style={styles.cart}>
                <TouchableOpacity
                  onPress={() => this.addCart(item.ecom_aca_product_unit.productUnitId, 'product')}
                  style={styles.cartIcon}>
                  <Icon name="add" size={18} color={ThemeColors.CLR_WHITE} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => 
                    //this.props.navigation.navigate('OrderHistory')}
                    this.props.navigation.navigate('SelectBars', { data: { walletId: item.walletId, productId: item.ecom_aca_product_unit.ecom_ac_product.productId } })}
                  style={styles.redeemBtn}>
                  <Text
                    style={styles.redeemBtnText}>
                    Redeem
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
                  Valid until: {item.validTillDate}
                </Text>
              </View>
            </View>
            <View
              style={styles.cartContainer}>
              <View style={styles.cart}>
                <TouchableOpacity
                  onPress={() => this.addCart(item.ecom_ea_combo.comboId, 'combo')}
                  style={styles.cartIcon}>
                  <Icon name="add" size={18} color={ThemeColors.CLR_WHITE} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { this.onModal(item.ecom_ea_combo.ecom_ac_products, item.walletId) }}
                  style={styles.redeemBtn}>
                  <Text
                    style={styles.redeemBtnText}>
                    Redeem
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

  onSelectComboProduct = () => {
    this.setState({ isComboProduct: !this.state.isComboProduct },
      this.props.navigation.navigate('SelectBars', { data: this.state.comboProduct }));

  }

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

              {/* </View> */}
              <FlatList
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => this.renderProducts(item, index)}
                refreshControl={
                  <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }
              />
            </>
          )
        }
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
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
    borderTopWidth: 0,
    marginBottom: 10

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
    paddingVertical:5
  },
  qtyText:{
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    fontWeight:'300',
    fontSize:14,
    color:ThemeColors.CLR_DARK_GREY
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
    //height: '100%',
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
    borderTopLeftRadiusRadius: 5,
    borderTopRightRadiusRadius: 5,
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
    //marginBottom:15,
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
