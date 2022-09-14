import { maxFontSizeMultiplier } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ToastAndroid,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchRedeemMixerData, fetchRedeemMoreData } from '../../api/vendor';
import images from '../../assets/images';
import NoContentFound from '../../Component/NoContentFound';
import SelectInput from '../../Component/SelectInput';
import { A_KEY, BASE_URL } from '../../config';
import { getAccessToken } from '../../localstorage';
import { ThemeColors } from '../../Theme/ThemeColors';
import Util from '../../utils';
import HeaderSide from '../Component/HeaderSide';
export default class Redeem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      selectedQty: 0,
      modalVisible: false,
      itemModalVisible: false,
      comboModelVisible:false,
      inputQty:0,
      mixerData:[],
      comboData:[],
      selectedComboData:null,
      addItemData: null,
      data:this.props.route.params.items,
      moreData:[]
    };
    console.log("state Data vendor id", this.state.data);
  }

  componentDidMount() {
    this.fetchMore();
    this.fetchMixerData();
  }

  fetchMixerData=async()=>{
    try{
      const data={
        vendorId:this.state.data.ecom_ae_vendors.vendorId
      };
      const res = await fetchRedeemMixerData(data);
      const resData = res.response.result.data;
      const mappedData = resData.map((x,i)=>{
        return {
          id:x.vendorId,
          title:x.ecom_ah_mixer.mixerName
        }
      });
      this.setState({mixerData:mappedData});
    }catch(error){
      console.log("Redeem > fetchMixerData > catch",error);
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  }

  fetchMore = async () => {
    const raw = {
      vendorId: this.state.data.ecom_ae_vendors.vendorId,
    };
    try{
      const res = await fetchRedeemMoreData(raw);
      this.setState({addItemData:res.response.result.data});
      //console.log("fetchMore > state data",this.state.addItemData);
    }catch(error){
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  onSelectQty=(data)=>{
    this.setState({ selectedQty: data.vendorUnitId});
  }

  onSelect=(data)=>{
    console.log("On Select > more Data",data);
    this.setState({selectedComboData:data})
  }

  onComboSelect=(data)=>{
    console.log("On Select > more Data",data);
    this.setState({selectedComboData:data})
  }

  onComboModalSubmit=()=>{
    console.log("onComboModalVisible > Dataarray",this.state.selectedComboData);
    this.setState({comboModelVisible:false});
    this.state.moreData.push(this.state.selectedComboData);

  }

  setInputQty = (type)=>{
    if(type ==1) { // 1 for add and 2 for sub
      this.setState({inputQty:this.state.inputQty+1})
    }else{
      if(this.state.inputQty > 0){
      this.setState({inputQty:this.state.inputQty-1})
    }
  }
  }

  onItemModal=(data,type)=>{
    if(type == 'Combo'){ //if combo then open combo product modal
      const mappedData = data.ecom_ea_combo.ecom_ac_products.map((item,index)=>{
        return {
          ...item,
          id:item.productId,
        title:item.name}
  });
    console.log("mappedData > onItemModel",mappedData);
    this.setState({comboData:mappedData});
      this.setState({comboModelVisible:true});
    }else{ // else selected product add in product array
    this.state.moreData.push(data);
    this.setState({itemModalVisible:false})
    }
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
          <View
            style={{
              width: '95%',
              // height: 154,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#424242',
                  top: 20,
                  left: 20,
                }}>
                {this.state.data.ecom_ae_vendors.vendorShopName}
              </Text>
              <View style={{margin:20}}>
                <HTMLView value={this.state.data.ecom_ae_vendors.description} />
              </View>
              {/* <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#424242',
                  top: 25,
                  left: 20,
                }}>
                {this.state.data.description}
              </Text> */}

              <View
                style={{
                  left: 15,
                  flexDirection: 'row',
                  // top: 40,
                  alignItems: 'center',
                  marginBottom: 0,
                  marginTop: 10,
                }}>
                <Icon name="self-improvement" size={25} color="#851729" />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#851729',
                    left: 10,
                  }}>
                  Select Other Bar
                </Text>
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',
                left: 50,
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
                  uri: `${this.state.data.hostUrl + this.state.data.ecom_ae_vendors.images
                    }`,
                }}
                defaultSource={images.promotions1}
              />
            </View>
          </View>

          {/* Product array */}
          {/* {this.state.data.map((item,index)=>( */}
          <View
            style={{
              width: '95%',
              height: 400,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 150,
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
                  source={{
                    uri: `${this.state.data.hostUrl +
                      this.state.data.images
                      }`,
                  }}
                  defaultSource={images.product2}
                />
              </View>
              <View
                style={{
                  width: '50%',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#4D4F50',
                    top: 20,
                    left: 20,
                  }}>
                  {this.state.data.name}
                </Text>
                 
                  <View style={{marginBottom:0,margin:20}}>
                  {this.state.data.description ? 
                    <HTMLView value={this.state.data.description.substr(0,40)} />
                  :null
                  }
              
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#424242',
                    top: 5,
                    left: 20,
                  }}>
                  Available Qty:{' '}
                  {
                    this.state.data.availableQty+' '+this.state.data.unitType+' '
                  }
                </Text>
              </View>
            </View>

            <View
              style={{
                marginLeft: 15,
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#4D4F50',
                }}>
                Select Quantity:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  top: 5,
                  width: '70%',
                  alignSelf:'flex-start'
                }}>
                {
                  this.state.data.ecom_ae_vendors.ecom_acca_vendor_product_units && 
                  this.state.data.ecom_ae_vendors.ecom_acca_vendor_product_units.map((vItem,index)=>(
                    <TouchableOpacity key={index}
                  onPress={() => this.onSelectQty(vItem) }
                  style={[
                     this.state.selectedQty == vItem.vendorUnitId
                      ? styles.itemQuantitySelected
                      : styles.itemQuantity
                  ]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center',width:'60%' }}>
                    <Icon name="wine-bar" size={22} color="#7B7B7B" />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#7B7B7B',
                      }}>
                      {vItem.unitQty+' '+vItem.productUnitType}
                    </Text>
                  </View>
                </TouchableOpacity>
                  ))
                }

              </View>
            </View>

            <View
              style={{
                marginLeft: 15,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#4D4F50',
                }}>
                Select Quantity:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                onPress={()=>this.setInputQty(2)}
                  style={{
                    padding: 4,
                    backgroundColor: '#A1172F',
                    borderRadius: 15,
                  }}>
                  <Icon name="remove" size={20} color="#fff" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '700',
                    color: '#A1172F',
                    padding: 7,
                  }}>
                  {this.state.inputQty}
                </Text>
                <TouchableOpacity
                onPress={()=>this.setInputQty(1)}
                  style={{
                    padding: 4,
                    backgroundColor: '#A1172F',
                    borderRadius: 15,
                  }}>
                  <Icon name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              
              {/* <SelectInput items={this.state.mixerData} selectedItems={{id:0,title:'Select Mixer Item'}} visible={false} onChange={(item)=>{this.onSelect(item)}} /> */}

            </View>
          </View>

          { this.state.moreData && this.state.moreData.length > 0 &&
          this.state.moreData.map((item,index)=>(
            <View
            style={{
              width: '95%',
              height: 400,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 150,
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
                      item.ecom_aca_product_unit && item.ecom_aca_product_unit.ecom_ac_product ?
                        { uri: `${this.state.data.hostUrl + item.ecom_aca_product_unit.ecom_ac_product.images}` } :
                        images.product2
                    }
                  defaultSource={images.product2}
                />
              </View>
              <View
                style={{
                  width: '50%',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#4D4F50',
                    top: 20,
                    left: 20,
                  }}>
                  {item.ecom_aca_product_unit && item.ecom_aca_product_unit.ecom_ac_product &&
                   item.ecom_aca_product_unit.ecom_ac_product.name
                  }
                </Text>
                 
                  <View style={{marginBottom:0,margin:20}}>
                  {item.ecom_aca_product_unit && item.ecom_aca_product_unit.ecom_ac_product.description ? 
                    <HTMLView value={item.ecom_aca_product_unit.ecom_ac_product.description.substr(0,40)} />
                  :null
                  }
              
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#424242',
                    top: 5,
                    left: 20,
                  }}>
                  Available Qty:{' '}
                  {
                    item.availableQty+' '+item.unitType+' '
                  }
                </Text>
              </View>
            </View>

            <View
              style={{
                marginLeft: 15,
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#4D4F50',
                }}>
                Select Quantity:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  top: 5,
                  width: '70%',
                  alignSelf:'flex-start'
                }}>
                {
                  this.state.data.ecom_ae_vendors.ecom_acca_vendor_product_units && 
                  this.state.data.ecom_ae_vendors.ecom_acca_vendor_product_units.map((vItem,index)=>(
                    <TouchableOpacity key={index}
                  onPress={() => this.onSelectQty(vItem) }
                  style={[
                     this.state.selectedQty == vItem.vendorUnitId
                      ? styles.itemQuantitySelected
                      : styles.itemQuantity
                  ]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center',width:'60%' }}>
                    <Icon name="wine-bar" size={22} color="#7B7B7B" />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#7B7B7B',
                      }}>
                      {vItem.unitQty+' '+vItem.productUnitType}
                    </Text>
                  </View>
                </TouchableOpacity>
                  ))
                }
              </View>
            </View>

            <View
              style={{
                marginLeft: 15,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#4D4F50',
                }}>
                Select Quantity:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                onPress={()=>this.setInputQty(2)}
                  style={{
                    padding: 4,
                    backgroundColor: '#A1172F',
                    borderRadius: 15,
                  }}>
                  <Icon name="remove" size={20} color="#fff" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '700',
                    color: '#A1172F',
                    padding: 7,
                  }}>
                  {this.state.inputQty}
                </Text>
                <TouchableOpacity
                onPress={()=>this.setInputQty(1)}
                  style={{
                    padding: 4,
                    backgroundColor: '#A1172F',
                    borderRadius: 15,
                  }}>
                  <Icon name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              
              {/* <SelectInput items={this.state.mixerData} selectedItems={{id:0,title:'Select Mixer Item'}} visible={false} onChange={(item)=>{this.onSelect(item)}} /> */}
              
            </View>
          </View>
          ))

          }
          
          {/* Add More Items */}
          <View
            style={{
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
              borderRadius: 5,
            }}>
            <View
              style={{
                margin: 15,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  padding: 0,
                  backgroundColor: '#939393',
                  borderRadius: 20,
                }}
                onPress={() => this.setState({ itemModalVisible: true })}>
                <Icon name="add" size={28} color="#fff" />
              </TouchableOpacity>

              <View style={{ marginLeft: 20 }}>
                <Text
                  style={{ fontSize: 20, color: '#969696', fontWeight: '700' }}>
                  Add More Items
                </Text>
              </View>
            </View>

            <View
              style={{
                margin: 15,
                // alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#4D4F50',
                }}>
                Table No:
              </Text>

              <View style={styles.sectionStyleTable}>
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Table No"
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
              onPress={() => this.setState({ modalVisible: true })}
            // this.props.navigation.navigate('MyCard')}
            >
              <Text style={{ color: '#fff', fontSize: 15 }}>REDEEM</Text>
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
          visible={this.state.comboModelVisible} >
          
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
              <View style={{ marginTop: 10,marginBottom:80, margin: 5 }}>
                <SelectInput items={this.state.comboData} selectedItems={{ id: 0, title: 'Select Product' }} visible={false} onChange={(item) => { this.onComboSelect(item) }} />
              </View>
              {/* </ScrollView> */}
              <View style={{ marginTop: 10, margin: 5 }}>
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
            this.setState({ modalVisible: false });
          }}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
              <View
                style={{
                  height: 118,
                  backgroundColor: '#AF1731',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      color: '#fff',
                    }}>
                    Redeem Details
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.setState({ modalVisible: false })}>
                    <Icon name="close" size={32} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  height: 108,
                  width: 330,
                  backgroundColor: '#fff',
                  marginTop: -20,
                  alignSelf: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: '500',
                      color: '#C11331',
                    }}>
                    Redeemed
                  </Text>

                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '700',
                      color: '#7B7B7B',
                      marginTop: 5,
                    }}>
                    NewTown Bar
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: '#424242',
                      marginTop: 10,
                    }}>
                    20 Jun 2021 10:00 PM
                  </Text>
                </View>
              </View>

              <View
                style={{
                  // height: 108,
                  width: 330,
                  backgroundColor: '#fff',
                  marginTop: '10%',
                  alignSelf: 'center',
                  borderRadius: 5,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '35%',
                        height: 130,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        // style={styles.productImg}
                        resizeMode={'cover'}
                        source={images.product2}
                        defaultSource={images.product2}
                      />
                    </View>

                    <View
                      style={{
                        width: '65%',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: '700',
                          color: '#4D4F50',
                        }}>
                        Chivas Regal 12
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: '#7B7B7B',
                        }}>
                        60ml - 2 Glass
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: '#7B7B7B',
                        }}>
                        Pepsi
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 0.7,
                    width: 330,
                    alignSelf: 'center',
                    backgroundColor: '#4D4F50',
                  }}
                />

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '35%',
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        // style={styles.productImg}
                        resizeMode={'cover'}
                        source={images.product2}
                        defaultSource={images.product2}
                      />
                    </View>

                    <View
                      style={{
                        width: '65%',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: '700',
                          color: '#4D4F50',
                        }}>
                        Chivas Regal 12
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: '#7B7B7B',
                        }}>
                        60ml - 2 Glass
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: '#7B7B7B',
                        }}>
                        Pepsi
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 0.7,
                    width: 330,
                    alignSelf: 'center',
                    backgroundColor: '#4D4F50',
                  }}
                />
              </View>

              <View style={{ marginTop: '20%' }}>
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    this.props.navigation.navigate('MyCard');
                  }}>
                  <Text style={{ color: '#fff', fontSize: 15 }}>View Orders</Text>
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
                              }:
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
                          {item.ecom_aca_product_unit &&  item.ecom_aca_product_unit.ecom_ac_product ? item.ecom_aca_product_unit.ecom_ac_product.name : ' '}
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
                          onPress={() => { this.onItemModal(item,'Product') }}>
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
                  </View>)
                  :(
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
                              item.ecom_ea_combo  ?
                              {
                              uri: `${this.state.data.hostUrl + item.ecom_ea_combo.images}`
                              }:
                              images.redeemProduct
                          }
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
                          onPress={() => { this.onItemModal(item,'Combo') }}>
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
    width:'50%'
  },
  itemQuantitySelected: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    padding: 2,
    width:'50%',
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
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
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
    width: 332,
    height: 400,
  },
  modalHeader: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
