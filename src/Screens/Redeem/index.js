import moment from 'moment';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setDateFormate, showToaster } from '../../api/func';
import { redeemOrder } from '../../api/order';
import { fetchRedeemMixerData, fetchRedeemMoreData } from '../../api/vendor';
import images from '../../assets/images';
import NoContentFound from '../../Component/NoContentFound';
import SelectInput from '../../Component/SelectInput';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
import Util from '../../utils';
import HeaderSide from '../Component/HeaderSide';
export default class Redeem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      modalVisible: false,
      itemModalVisible: false,
      comboModelVisible: false,
      mixerData: [],
      comboData: [],
      tableNo: "",
      isLoading: false,
      error: null,
      selectedComboData: null,
      addItemData: null,
      data: this.props.route.params.items,
      successOrderData: [],
      moreData: [this.props.route.params.items]
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.fetchMore();
      this.fetchMixerData();
    });
  }

  componentWillUnmount() {

  }

  fetchMixerData = async () => {
    try {
      const data = {
        vendorId: this.state.data.vendorId,
        categoryId: this.state.data.ecom_aca_product_unit.ecom_ac_product.ecom_aa_category.categoryId
      };
      const res = await fetchRedeemMixerData(data);
      const resData = res.response.result.mixData;
      const mappedData = resData.map((x, i) => {
        return {
          id: x.ecom_ai_vendor_mixer.vendorId,
          title: x.mixerName
        }
      });
      this.state.moreData[0].ecom_aca_product_unit.ecom_ac_product.ecom_aa_category.ecom_ah_mixers = mappedData;
      this.setState({ moreData: this.state.moreData });
    } catch (error) {
      console.log("Redeem > fetchMixerData > catch", error);
      showToaster(error, 'TOP');
    }
  }

  addMoreData = () => {
    this.setState({ itemModalVisible: true });
  }

  fetchMore = async () => {
    const raw = {
      vendorId: this.props.route.params.items.vendorId,
    };
    try {
      const res = await fetchRedeemMoreData(raw);
      this.setState({ addItemData: res.response.result.data });
    } catch (error) {
      showToaster(error, 'TOP');
    }
  };

  onSelectQty = (data, index, type, isComboProduct) => {
    if (isComboProduct) {
      this.state.moreData[index].selectedUnitQty = data.vendorUnitId
      this.setState({ moreData: this.state.moreData })
    } else {
      this.state.moreData[index].ecom_aca_product_unit.ecom_ac_product.selectedUnitQty = data.vendorUnitId
      this.setState({ moreData: this.state.moreData })
    }
  }

  onSelect = (data, type, isComboProduct, index) => {
    if (type == 'Object') {
      this.setState({});
    } else {
      if (isComboProduct) { // if isComboProduct is true the update selectedMixerData within  combo Product
        this.state.moreData[index].selectedMixerData = data.title;
      } else {
        this.state.moreData[index].ecom_aca_product_unit.ecom_ac_product.selectedMixerData = data.title;
      }
      this.setState({ moreData: this.state.moreData });
    }
  }

  redirectHandle = () => {
    this.props.navigation.navigate('SelectBars', { data: { walletId: this.props.route.params.items.walletId, productId: this.props.route.params.items.ecom_aca_product_unit.ecom_ac_product.productId } });
  }

  onComboSelect = (data) => {
    this.setState({ selectedComboData: data })
  }

  onComboModalSubmit = () => {
    this.setState({ comboModelVisible: false });
    this.state.selectedComboData.quantity = 0;
    this.state.selectedComboData.selectedMixerData = '';
    this.state.moreData.push(this.state.selectedComboData);
  }

  setInputQty = (isRemove, type, isComboProduct, index) => {
    if (type == 'Object') {
      if (isRemove) { // isRemove is true then minus otherwise plus
        if (this.state.data.inputQty > 0) {
          this.state.data.inputQty = this.state.data.inputQty - 1;
          this.setState({ data: this.state.data })
        }
      } else {
        this.state.data.inputQty = this.state.data.inputQty + 1;
        this.setState({ data: this.state.data })
      }
    } else {
      if (isComboProduct) { // if this true then minus or plus from combo Product
        if (isRemove) { // isRemove is true then minus otherwise plus
          if (this.state.moreData[index].quantity > 0) {
            this.state.moreData[index].quantity =
              this.state.moreData[index].quantity - 1;
            this.setState({ moreData: this.state.moreData })
          }
        } else {
          this.state.moreData[index].quantity =
            this.state.moreData[index].quantity + 1;
          this.setState({ moreData: this.state.moreData });
        }
      } else {//else minus or plus from product unit 
        if (isRemove) { // isRemove is true then minus otherwise plus
          if (this.state.moreData[index].ecom_aca_product_unit.ecom_ac_product.quantity > 0) {
            this.state.moreData[index].ecom_aca_product_unit.ecom_ac_product.quantity =
              this.state.moreData[index].ecom_aca_product_unit.ecom_ac_product.quantity - 1;
            this.setState({ moreData: this.state.moreData })
          }
        } else {
          this.state.moreData[index].ecom_aca_product_unit.ecom_ac_product.quantity =
            this.state.moreData[index].ecom_aca_product_unit.ecom_ac_product.quantity + 1;
          this.setState({ moreData: this.state.moreData });
        }
      }
    }
  }

  onItemModal = (data, type) => {
    if (type == 'Combo') { //if combo then open combo product modal
      const mappedData = data.ecom_ea_combo.ecom_ac_products.map((item, index) => {
        item.ecom_aa_category.ecom_ah_mixers.map((x, i) => {
          x.id = x.ecom_ai_vendor_mixer.vendorId,
            x.title = x.mixerName
        });
        return {
          ...item,
          walletId: data.walletId,
          availableQty: data.availableQty,
          unitType: data.unitType,
          id: item.productId,
          title: item.name
        }
      });
      this.setState({ comboData: mappedData });
      this.setState({ comboModelVisible: true });
    } else { // else selected product add in product array
        data.ecom_aca_product_unit.ecom_ac_product.ecom_aa_category.ecom_ah_mixers.map((x, i) => {
        x.id = x.ecom_ai_vendor_mixer.vendorId,
          x.title = x.mixerName
      });
      data.ecom_aca_product_unit.ecom_ac_product.quantity = 0;
      data.ecom_aca_product_unit.ecom_ac_product.selectedMixerData = "";
      const ifExist = this.state.moreData.find(x =>
        x.ecom_aca_product_unit && x.ecom_aca_product_unit.ecom_ac_product.productId == data.ecom_aca_product_unit.ecom_ac_product.productId
      );

      if (ifExist && ifExist.ecom_aca_product_unit.ecom_ac_product.productId) {
        showToaster('This product already exists', 'TOP');
      } else {
        this.state.moreData.push(data);
        this.setState({ itemModalVisible: false })
      }
    }
  }

  onRedeemOrder = async () => {
    const data = this.state.moreData.map((item, index) => {

      let selectedData = item.ecom_aca_product_unit && item.ecom_aca_product_unit.ecom_ac_product ?
        item.ecom_aca_product_unit.ecom_ac_product.ecom_acca_vendor_product_units.find(x => x.vendorUnitId == item.ecom_aca_product_unit.ecom_ac_product.selectedUnitQty) :
        item.ecom_acca_vendor_product_units.find(x => x.vendorUnitId == item.selectedUnitQty);
      if (item.ecom_aca_product_unit) {
        return {
          walletId: item.walletId,
          availableQty: item.availableQty,
          productId: item.ecom_aca_product_unit.ecom_ac_product.productId,
          productName: item.ecom_aca_product_unit.ecom_ac_product.name,
          image: item.ecom_aca_product_unit.ecom_ac_product.images,
          unitProductId: item.ecom_aca_product_unit.productUnitId,
          comboId: 0,
          vendorUnitId: item.ecom_aca_product_unit.ecom_ac_product.ecom_aa_category.vendorProductUnitHide == 0 ? item.ecom_aca_product_unit.ecom_ac_product.selectedUnitQty : 0,
          numberOfGlass: item.ecom_aca_product_unit.ecom_ac_product.quantity,
          vendorProductUnitHide: item.ecom_aca_product_unit.ecom_ac_product.ecom_aa_category.vendorProductUnitHide,
          productUnitType: selectedData ? selectedData.productUnitType : "",
          unitQty: selectedData ? selectedData.unitQty : 0,
          unitPrice: selectedData ? selectedData.unitPrice : 0,
          mixerName: item.ecom_aca_product_unit.ecom_ac_product.selectedMixerData
        }
      } else {
        return {
          walletId: item.walletId,
          availableQty: item.availableQty,
          productId: item.productId,
          productName: item.name,
          image: item.images,
          unitProductId: 0,
          comboId: item.ecom_eb_combo_detail ? item.ecom_eb_combo_detail.cId : 0,
          vendorUnitId: item.ecom_aa_category.vendorProductUnitHide == 0 ? item.selectedUnitQty : 0,
          numberOfGlass: item.quantity,
          vendorProductUnitHide: item.ecom_aa_category.vendorProductUnitHide,
          productUnitType: selectedData ? selectedData.productUnitType : "",
          unitQty: selectedData ? selectedData.unitQty : 0,
          unitPrice: selectedData ? selectedData.unitPrice : 0,
          mixerName: item.selectedMixerData
        }
      }
    });

    let quantityError = data.find(x => x.numberOfGlass == 0);
    let unitQuantityError = data.find(x => x.unitQty == 0);

    if (quantityError && quantityError.numberOfGlass == 0) { // select unit like 1,2,3
      showToaster('Please Select Unit', 'TOP');
      return;
    }
    if (unitQuantityError && unitQuantityError.vendorProductUnitHide == 0) {
      if (unitQuantityError.unitQty == 0) {// vendorProductUnitHide = 0 then show unit qty other hide unit quantity like 30ml 60ml
        showToaster('Please select quantity', 'TOP');
        return;
      }
    }

    if (this.state.tableNo.trim() == "") {
      showToaster('Please enter  Table No.', 'TOP');
      return;
    }

    let isValid = true;

    data.filter((item) => {
      let userSelectedQty = item.vendorProductUnitHide == 0 ?
        item.numberOfGlass * item.unitQty : item.numberOfGlass;
      if (userSelectedQty > item.availableQty) {
        showToaster('Selected quantity should be less then from available qty', 'TOP');
        isValid = false;
        return;
      }
    });

    const payload = {
      vendorId: this.props.route.params.items.vendorId,
      tableNo: this.state.tableNo,
      redeemProducts: data
    };
    try {
      if (isValid) {
        this.setState({ isLoading: true });
        const res = await redeemOrder(payload);
        this.setState({ isLoading: false, modalVisible: true });
        if (res.response.result && res.response.result.data && res.response.result.data.length > 0) {
          res.response.result.data.map(item => {
            item.currentDate = item.date + ' ' + item.time
          });
        }
        this.setState({ successOrderData: res.response.result.data });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      showToaster(error, 'TOP');
    }
  }

  onCloseModal = () => {
    this.setState({ modalVisible: false }, this.props.navigation.navigate('OrderHistory'));
  }

  render() {

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <HeaderSide
          name={'Redeem'}
          onClick={() => this.props.navigation.pop()}
        />
        <ScrollView>
          {/* vendor details */}
          <View
            style={styles.topContainer}>
            <View
              style={{
                width: '50%',
                //backgroundColor:"red"
              }}>
              <Text
                style={styles.topSubContainer}>
                {this.props.route.params.items.vendorShopName}
              </Text>
              <View style={{ margin: 20 }}>
                <HTMLView value={this.props.route.params.items.description} />
              </View>
              <View
                style={styles.topFooterContainer}>
                <Icon name="self-improvement" size={25} color="#851729" />
                <Text
                  onPress={() => { this.redirectHandle() }}
                  style={styles.topSubText}>

                  Select Other Bar
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-end'
                //left: 50,
              }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
                resizeMode={'cover'}
                //source={images.product1}
                source={{
                  uri: `${this.state.data.hostUrl + this.props.route.params.items.images
                    }`,
                }}
                defaultSource={images.defaultImg}
              />
            </View>
          </View>
          {/* end vendor details */}
          {this.state.moreData && this.state.moreData.length > 0 &&
            this.state.moreData.map((item, index) =>
              item.ecom_aca_product_unit != null ?
                (<View
                  style={[styles.middleContainer, { zIndex: -(index + 1) }]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      //height: 150,
                    }}>
                    <View
                      style={{
                        width: '40%',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <Image
                        style={{
                          width: 60,
                          height: 120,
                        }}
                        resizeMode={'cover'}
                        source={
                          { uri: `${this.state.data.hostUrl + item.ecom_aca_product_unit.ecom_ac_product.images}` }
                        }
                        defaultSource={images.defaultImg}
                      />
                    </View>
                    <View
                      style={{ width: '50%', }}>
                      <Text
                        style={styles.middleContainerText}>
                        {item.ecom_aca_product_unit.ecom_ac_product.name}
                      </Text>
                      <View style={{ marginBottom: 0, margin: 20 }}>

                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#424242',
                          top: 5,
                          left: 20,
                        }}>
                        {
                          'Available Qty: ' + item.availableQty + ' ' + item.unitType + ' '
                        }
                      </Text>
                    </View>
                  </View>
                  {item.ecom_aca_product_unit.ecom_ac_product.ecom_aa_category.vendorProductUnitHide == 0 &&
                    <View
                      style={{
                        marginLeft: 15,
                        marginTop: 15,
                      }}>
                      <Text
                        style={styles.middleContainerSubText1}>
                        Select Quantity:
                      </Text>
                      <ScrollView
                        showsHorizontalScrollIndicator={false}
                        style={{ width: '95%' }} horizontal={true}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            zIndex: -5,
                            marginVertical: 8,
                          }}>

                          {
                            item.ecom_aca_product_unit.ecom_ac_product.ecom_acca_vendor_product_units.map((vItem, vIndex) => (
                              <TouchableOpacity key={vIndex}
                                onPress={() => this.onSelectQty(vItem, index, 'Array', false)}
                                style={[
                                  item.ecom_aca_product_unit.ecom_ac_product.selectedUnitQty == vItem.vendorUnitId
                                    ? styles.itemQuantitySelected
                                    : styles.itemQuantity
                                ]}>
                                <View style={styles.middleContainerIcon} key={vIndex}>
                                  <Icon name="wine-bar" size={22} color="#7B7B7B" />
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      color: '#7B7B7B',
                                    }}>
                                    {vItem.unitQty + ' ' + vItem.productUnitType}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            ))
                          }
                        </View>
                      </ScrollView>
                    </View>
                  }

                  <View
                    style={{
                      marginLeft: 15,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={styles.middleContainerSubText2}>
                      Select Unit:
                    </Text>
                    <View
                      style={styles.middleContainerSubTextIcon}>
                      <TouchableOpacity
                        onPress={() =>
                          item.quantity != undefined ?
                            this.setInputQty(true, 'Array', true, index) :
                            this.setInputQty(true, 'Array', false, index)
                        }
                        style={{
                          padding: 4,
                          backgroundColor: '#A1172F',
                          borderRadius: 15,
                        }}>
                        <Icon name="remove" size={20} color="#fff" />
                      </TouchableOpacity>
                      <Text
                        style={styles.middleContainerCounter}>
                        {item.ecom_aca_product_unit.ecom_ac_product.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          item.quantity != undefined ?
                            this.setInputQty(false, 'Array', true, index) :
                            this.setInputQty(false, 'Array', false, index)
                        }
                        style={{
                          padding: 4,
                          backgroundColor: '#A1172F',
                          borderRadius: 15,
                        }}>
                        <Icon name="add" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    {item.ecom_aca_product_unit.ecom_ac_product.ecom_aa_category.ecom_ah_mixers &&
                      item.ecom_aca_product_unit.ecom_ac_product.ecom_aa_category.ecom_ah_mixers.length > 0 &&
                      <View style={{
                        alignSelf: 'flex-start',
                        marginTop: 13
                      }}>
                        <SelectInput items={item.ecom_aca_product_unit.ecom_ac_product.ecom_aa_category.ecom_ah_mixers}
                          selectedItems={{ id: 0, title: 'Select Mixer Item' }}
                          visible={false}
                          onChange={(sItem) => {
                            item.ecom_aca_product_unit && item.ecom_aca_product_unit.ecom_ac_product ?
                              this.onSelect(sItem, 'Array', false, index) :
                              this.onSelect(sItem, 'Array', true, index)
                          }
                          } />
                      </View>
                    }
                  </View>
                </View>) :
                (<View
                  style={[styles.middleContainer, { zIndex: -(index + 1) }]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      //height: 150,
                    }}>
                    <View
                      style={{
                        width: '40%',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <Image
                        style={{
                          width: 60,
                          height: 120,
                        }}
                        resizeMode={'cover'}
                        source={
                          { uri: `${this.state.data.hostUrl + item.images}` }
                        }
                        defaultSource={images.defaultImg}
                      />
                    </View>
                    <View
                      style={{ width: '50%', }}>
                      <Text
                        style={styles.middleContainerText}>
                        {item.name}
                      </Text>
                      <View style={{ marginBottom: 0, margin: 20 }}>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#424242',
                          top: 5,
                          left: 20,
                        }}>
                        {

                          'Available Qty: ' + item.availableQty + ' ' + item.unitType + ' '
                        }
                      </Text>
                    </View>
                  </View>
                  {item.ecom_aa_category.vendorProductUnitHide == 0 ?
                    <View
                      style={{
                        marginLeft: 15,
                        marginTop: 15,
                      }}>
                      <Text
                        style={styles.middleContainerSubText1}>
                        Select Quantity:
                      </Text>
                      <ScrollView
                        showsHorizontalScrollIndicator={false}
                        style={{ width: '95%' }} horizontal={true}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            zIndex: -5,
                            marginVertical: 8,
                          }}>

                          {
                            item.ecom_acca_vendor_product_units.map((vItem, vIndex) => (
                              <TouchableOpacity key={vIndex}
                                onPress={() => this.onSelectQty(vItem, index, 'Array', true)}
                                style={[
                                  item.selectedUnitQty == vItem.vendorUnitId
                                    ? styles.itemQuantitySelected
                                    : styles.itemQuantity
                                ]}>

                                <View style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',

                                }} key={vIndex}>
                                  <Icon name="wine-bar" size={22} color="#7B7B7B" />
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      color: '#7B7B7B',
                                    }}>
                                    {vItem.unitQty + ' ' + vItem.productUnitType}
                                  </Text>
                                </View>

                              </TouchableOpacity>
                            ))
                          }
                        </View>
                      </ScrollView>
                    </View> : null
                  }
                  <View
                    style={{
                      marginLeft: 15,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={styles.middleContainerSubText2}>
                      Select Unit:
                    </Text>
                    <View
                      style={styles.middleContainerSubTextIcon}>
                      <TouchableOpacity
                        onPress={() =>
                          item.quantity != undefined ?
                            this.setInputQty(true, 'Array', true, index) :
                            this.setInputQty(true, 'Array', false, index)
                        }
                        style={{
                          padding: 4,
                          backgroundColor: '#A1172F',
                          borderRadius: 15,
                        }}>
                        <Icon name="remove" size={20} color="#fff" />
                      </TouchableOpacity>
                      <Text
                        style={styles.middleContainerCounter}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          item.quantity != undefined ?
                            this.setInputQty(false, 'Array', true, index) :
                            this.setInputQty(false, 'Array', false, index)
                        }
                        style={{
                          padding: 4,
                          backgroundColor: '#A1172F',
                          borderRadius: 15,
                        }}>
                        <Icon name="add" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    {item.ecom_aa_category.ecom_ah_mixers.length > 0 &&
                      <View style={{
                        alignSelf: 'flex-start',
                        marginTop: 13
                      }}>
                        <SelectInput items={item.ecom_aa_category.ecom_ah_mixers}
                          selectedItems={{ id: 0, title: 'Select Mixer Item' }}
                          visible={false}
                          onChange={(sItem) => {
                            // item.ecom_aca_product_unit && item.ecom_aca_product_unit.ecom_ac_product ?
                            //this.onSelect(sItem, 'Array', false, index) 
                            this.onSelect(sItem, 'Array', true, index)
                          }
                          } />
                      </View>
                    }
                  </View>
                </View>
                )

            )
          }

          {/* Add More Items */}
          <View
            style={styles.bottomContainer}>
            <View
              style={styles.bottomContainerHeaderText}>
              <TouchableOpacity
                style={styles.bottomContainerIcon}
                onPress={() => this.addMoreData()}>
                <Icon name="add" size={28} color="#fff" />
              </TouchableOpacity>

              <View style={{ marginLeft: 20 }}>
                <TouchableOpacity
                  onPress={() => this.setState({ itemModalVisible: true })}>
                  <Text
                    style={{ fontSize: 20, color: '#969696', fontWeight: '700' }}>
                    Add More Items
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                margin: 15,
                // alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={styles.bottomContainerSubText}>
                Table No:
              </Text>
              <View style={styles.sectionStyleTable}>
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Table No"
                  onChangeText={text => this.setState({ tableNo: text })}
                  underlineColorAndroid="transparent"
                  placeholderTextColor={'#DADADA'}
                />
              </View>
            </View>
          </View>
          {/* {End More Items model} */}
          <View style={{ marginTop: '5%' }}>
            <TouchableOpacity
              style={styles.save}
              onPress={() => this.onRedeemOrder()}
            // this.props.navigation.navigate('MyCard')}
            >
              {this.state.isLoading ?

                <ActivityIndicator size="small" color="#ffffff" />

                :
                <Text style={{ color: '#fff', fontSize: 15 }}>REDEEM</Text>
              }
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: '5%',
            }}
          />
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.comboModelVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                {/* <Text></Text> */}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#4D4F50',
                  }}>
                  Select Product
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ comboModelVisible: false })}>
                  <Icon name="close" size={28} color="#4D4F50" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 0.8,
                  backgroundColor: '#DADADA',
                  marginTop: 8,
                }}
              />
              {/* <ScrollView> */}
              <View style={{ marginTop: 10, marginBottom: 80, margin: 5 }}>
                <SelectInput items={this.state.comboData} selectedItems={{ id: 0, title: 'Select Product' }} visible={false} onChange={(item) => { this.onComboSelect(item) }} />
              </View>
              {/* </ScrollView> */}
              <View style={{ marginTop: 20, margin: 5 }}>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => this.onComboModalSubmit()}>
                  <Text style={{ color: '#fff', fontSize: 15 }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.onCloseModal();
          }}>
          <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
            <ScrollView>
              <View
                style={{
                  height: 118,
                  flexDirection: 'column',
                  marginBottom: '35%',
                  backgroundColor: '#AF1731',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.ROBOTO_REGULAR,
                      fontSize: 18,
                      fontWeight: '500',
                      color: ThemeColors.CLR_WHITE,
                    }}>
                    Redeem Details
                  </Text>
                  <TouchableOpacity style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end', justifyContent: 'flex-end' }}
                    onPress={() => this.onCloseModal()}>
                    <Icon name="close" size={32} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View
                  style={styles.redeemDetailsHeader}>
                  <View
                    style={{
                      //width: '50%',
                    }}>
                    <Text
                      style={styles.redeemDetailsText}>
                      Redeemed
                    </Text>
                    <Text
                      style={styles.redeemDetailsSubText}>
                      {this.state.successOrderData.length > 0 ? this.state.successOrderData[0].ecom_ae_vendor.vendorShopName : ''}
                    </Text>
                    <Text
                      style={styles.redeemDetailsSubText1}>
                      {this.state.successOrderData.length > 0 ? setDateFormate(this.state.successOrderData[0].currentDate,true):''}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{
                width: '93%',
                borderRadius: 10,
                backgroundColor: '#fff',
                alignSelf: 'center',
                marginBottom: 20,
              }}>
                {this.state.successOrderData.length > 0 ? this.state.successOrderData.map((item, index) => (
                  <View key={index}
                    style={styles.redeemDetailsContainer}>
                    <View>
                      <View
                        style={{ flexDirection: 'row', }}>
                        <View
                          style={styles.redeemDetailsContainerLeft}>
                          <Image
                            style={styles.redeemDetailsContainerImage}
                            resizeMode={'cover'}
                            source={
                              { uri: `${this.state.data.hostUrl + item.ecom_ac_product.images}` }
                            }
                            defaultSource={images.defaultImg}
                          />
                        </View>
                        <View
                          style={{
                            width: '50%',
                            alignSelf: 'flex-start',
                            marginVertical: 10,
                          }}>
                          <Text
                            style={styles.redeemDetailsContainerText}>
                            {item.ecom_ac_product.name}
                          </Text>
                          <Text
                            style={styles.redeemDetailsContainerSubText}>
                            {
                              item.ecom_ac_product.redeemUnitQty != undefined ?
                                item.ecom_ac_product.redeemUnitQty + item.ecom_ac_product.unitType + '  -  ' + item.ecom_ac_product.reddemQty + '' :
                                item.redeemUnitQty + item.unitType + '  -  ' + item.reddemQty + ''
                            }
                          </Text>
                          {item.ecom_ac_product.mixerData != undefined ?
                            <Text
                              style={styles.redeemDetailsContainerSubText}>
                              {item.ecom_ac_product.mixerData}
                            </Text> : <Text
                              style={styles.redeemDetailsContainerSubText}>
                              {item.mixerData}
                            </Text>
                          }
                          <Text
                            style={styles.redeemDetailsContainerSubText}>
                            {item.tableNo}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 0.7,
                        width: '100%',
                        backgroundColor: '#4D4F50',
                      }} />
                    <View
                      style={{
                        height: 0.7,
                        width: '100%',
                        backgroundColor: '#4D4F50',
                      }} />
                  </View>
                )) : null
                }
              </View>
              <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => {
                    this.onCloseModal();
                  }}>
                  <Text style={styles.redeemFooterContainer}>View Orders</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* { addMoreItem modal} */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.itemModalVisible}
          onRequestClose={() => {
            this.setState({ itemModalVisible: false });
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                {/* <Text></Text> */}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#4D4F50',
                  }}>
                  Add more items
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ itemModalVisible: false })}>
                  <Icon name="close" size={28} color="#4D4F50" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 0.8,
                  backgroundColor: '#DADADA',
                  marginTop: 8,
                }}
              />
              <ScrollView>
                {this.state.addItemData && this.state.addItemData.length > 0 ? (
                  this.state.addItemData.map(item => (
                    item.ecom_aca_product_unit != null ?

                      (
                        <View>
                          <View
                            style={{
                              width: '95%',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              alignSelf: 'center',
                              //height: 120,
                            }}>
                            <View
                              style={{
                                width: '25%',
                                alignSelf: 'center',
                              }}>
                              <Image
                                style={{
                                  width: 75,
                                  height: 75,
                                }}
                                resizeMode={'cover'}
                                source=
                                {
                                  item.ecom_aca_product_unit && item.ecom_aca_product_unit.ecom_ac_product ?
                                    {
                                      uri: `${this.state.data.hostUrl + item.ecom_aca_product_unit.ecom_ac_product.images}`
                                    } :
                                    images.redeemProduct
                                }
                              //source={images.redeemProduct}
                              //defaultSource={images.product2}
                              />
                            </View>

                            <View
                              style={{
                                width: '65%',
                                marginTop: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  fontWeight: '500',
                                  color: '#4D4F50',
                                }}>
                                {item.ecom_aca_product_unit && item.ecom_aca_product_unit.ecom_ac_product ? item.ecom_aca_product_unit.ecom_ac_product.name : ' '}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#424242',
                                  marginTop: 4,
                                }}>
                                Available Qty: {item.availableQty} {item.unitType}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: '400',
                                  color: '#424242',
                                  marginTop: 4,
                                }}>
                                Valid until: {Util.changeDateFormat(item.validTillDate)}
                              </Text>
                            </View>

                            <View
                              style={{
                                width: '10%',
                                alignSelf: 'flex-end',

                              }}>
                              <TouchableOpacity
                                style={{
                                  backgroundColor: '#851729',
                                  height: 26,
                                  borderRadius: 25,
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  width: 70,
                                  flexDirection: 'row',
                                  justifyContent: 'space-evenly',
                                  right: '20%',
                                }}
                                onPress={() => { this.onItemModal(item, 'Product') }}>
                                <Text style={{ color: '#fff', fontSize: 14, paddingLeft: 5, }}>ADD</Text>
                                <Icon name="add" size={18} color="#fff" />
                              </TouchableOpacity>
                            </View>
                          </View>

                          <View
                            style={{
                              height: 0.8,
                              backgroundColor: '#DADADA',
                              margin: 5,

                            }}
                          />
                        </View>)
                      : (
                        <View>
                          <View
                            style={{
                              width: '95%',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              alignSelf: 'center',
                              //height: 120,
                            }}>
                            <View
                              style={{
                                width: '25%',
                                alignSelf: 'center',
                              }}>
                              <Image
                                style={{
                                  width: 75,
                                  height: 75,
                                }}
                                resizeMode={'cover'}
                                source=
                                {
                                  item.ecom_ea_combo ?
                                    {
                                      uri: `${this.state.data.hostUrl + item.ecom_ea_combo.images}`
                                    } :
                                    images.defaultImg
                                }
                                defaultSource={images.defaultImg}
                              />
                            </View>

                            <View
                              style={{
                                width: '65%',
                                marginTop: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  fontWeight: '500',
                                  color: '#4D4F50',
                                }}>
                                {item.ecom_ea_combo ? item.ecom_ea_combo.name : ' '}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: '500',
                                  color: '#424242',
                                  marginTop: 4,
                                }}>
                                Available Qty: {item.availableQty} {item.unitType}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: '400',
                                  color: '#424242',
                                  marginTop: 4,
                                }}>
                                Valid until: {Util.changeDateFormat(item.validTillDate)}
                              </Text>
                            </View>

                            <View
                              style={{
                                width: '10%',
                                alignSelf: 'flex-end',

                              }}>
                              <TouchableOpacity
                                style={{
                                  backgroundColor: '#851729',
                                  height: 26,
                                  borderRadius: 25,
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  width: 70,
                                  flexDirection: 'row',
                                  justifyContent: 'space-evenly',
                                  right: '20%',
                                }}
                                onPress={() => { this.onItemModal(item, 'Combo') }}>
                                <Text style={{ color: '#fff', fontSize: 14 }}>ADD</Text>
                                <Icon name="add" size={18} color="#fff" />
                              </TouchableOpacity>
                            </View>
                          </View>

                          <View
                            style={{
                              height: 0.8,
                              backgroundColor: '#DADADA',
                              margin: 5,

                            }}
                          />
                        </View>
                      )
                  ))
                ) : (
                  <NoContentFound title="No Data Found" />
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* {close addMoreItemModal} */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemQuantity: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    padding: 2,
    marginHorizontal: 5
  },
  itemQuantitySelected: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#A1172F',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: '#ACACAC',
    height: 44,
    width: 320,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
    right: '10%',
    marginTop: '2%',
  },
  itemQuantitySelectedNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 1,
    padding: 2,
    borderRadius: 10,
    borderColor: '#A1172F',
    width: 132,
  },
  sectionStyleTable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: '#ACACAC',
    height: 44,
    width: 320,
    borderRadius: 5,
    marginTop: 10,
    elevation: 2,
    // marginRight:'15%'
  },
  save: {
    backgroundColor: '#AF1731',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    //marginHorizontal:10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 380,
    height: 420,
  },
  modalHeader: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topContainer: {
    width: '95%',
    // height: 154,
    backgroundColor: '#fff',
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    zIndex: -1,
    borderRadius: 5,
  },
  topSubContainer: {
    fontSize: 17,
    fontWeight: '700',
    color: '#424242',
    top: 20,
    left: 20,
  },
  topSubText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#851729',
    left: 10,
  },
  topFooterContainer: {
    left: 15,
    flexDirection: 'row',
    // top: 40,
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 10,
  },
  middleContainer: {
    width: '95%',
    //height: 400,
    backgroundColor: '#fff',
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 5,
  },
  middleContainerSubText1: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4D4F50',
  },
  middleContainerSubText2: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4D4F50',
  },
  middleContainerCounter: {
    fontSize: 25,
    fontWeight: '700',
    color: '#A1172F',
    padding: 7,

  },
  middleContainerSubTextIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  middleContainerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4D4F50',
    top: 20,
    left: 20,
  },
  middleContainerIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomContainer: {
    width: '96%',
    height: 180,
    backgroundColor: '#fff',
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    zIndex: -1000,
    borderRadius: 5,
  },
  bottomContainerHeaderText: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  bottomContainerIcon: {
    padding: 0,
    backgroundColor: '#939393',
    borderRadius: 20,
  },
  bottomContainerSubText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4D4F50',
  },
  redeemDetailsHeader: {
    width: '93%',
    height: 130,
    marginVertical: '5%',
    backgroundColor: ThemeColors.CLR_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    margin: 10,
    //marginTop:65,
    //paddingBottom:20 
  },
  redeemDetailsText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#C11331',
    fontFamily: FontFamily.ROBOTO_REGULAR,
    //top: 20,
    //left: 20,
  },
  redeemDetailsSubText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7B7B7B',
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    //top: 20,
    //left: 20,
    paddingTop: 5,
  },
  redeemDetailsSubText1: {
    fontSize: 12,
    fontWeight: '400',
    color: '#424242',
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    //top: 20,
    //left: 20,
    paddingTop: 4,
  },
  redeemDetailsContainer: {
    width: '93%',
    //backgroundColor: ThemeColors.CLR_WHITE,
    elevation: 5,
    alignSelf: 'center',
    //borderRadius: 10,
  },
  redeemDetailsContainerImage: {
    width: 95,
    height: 95,
  },
  redeemDetailsContainerLeft: {
    width: '35%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemDetailsContainerText: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: '#4D4F50',
  },
  redeemDetailsContainerSubText: {
    fontSize: 20,
    fontWeight: '500',
    //paddingTop: 5,
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: '#7B7B7B',
  },
  redeemFooterContainer: {
    color: ThemeColors.CLR_WHITE,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
});
