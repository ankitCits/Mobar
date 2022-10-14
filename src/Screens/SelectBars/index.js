import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchRedeemBars } from '../../api/vendor';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
import { connect } from 'react-redux';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import NoContentFound from '../../Component/NoContentFound';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showToaster } from '../../api/func';

class SelectBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      visibilityQuantity: 30,
      collectionWallet: {},
      itemSelected: 0,
      hostUrl: '',
      vendorData: [],
      category:null,
      isLoading: 'false',
      data:null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      this.setState({ isLoading: true });
      const data = {
        walletId: this.props.route.params.data.walletId,
        productId: this.props.route.params.data.productId,
        latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : '',
        longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : '',
      };
      
      const response = await fetchRedeemBars(data);
      this.setState({
        hostUrl: response.response.result.hostUrl,
        data: response.response.result.productWithBar,
        vendorData: response.response.result.productWithBar.ecom_ae_vendors,
        category: response.response.result.productWithBar.ecom_aa_category,
        collectionWallet: response.response.result.collectionWallet,
        isLoading: false
      });
    } catch (error) {
      console.log("Select bars > catch > error", error);
      this.setState({ isLoading: false });
      showToaster(error);
      
    }
  }

  onContinue = () => {
    const items = this.state.data;
    items.collectionWallet = this.state.collectionWallet
    items.ecom_ae_vendors = this.state.itemSelected;
    items.hostUrl = this.state.hostUrl;
    this.state.data.selectedQty = 0;
    this.state.data.inputQty = 0;
    const data = {
      walletId: this.state.collectionWallet.walletId,
      availableQty: this.state.collectionWallet.availableQty,
      unitType: this.state.collectionWallet.unitType,
      vendorShopName: this.state.itemSelected.vendorShopName,
      description: this.state.itemSelected.description,
      images: this.state.itemSelected.images,
      vendorId: this.state.itemSelected.vendorId,
      hostUrl: this.state.hostUrl,
      category:this.state.category,
      ecom_aca_product_unit: {
        productUnitId: this.state.collectionWallet.ecom_aca_product_unit ? this.state.collectionWallet.ecom_aca_product_unit.productUnitId : 0,
        unitType: this.state.collectionWallet.ecom_aca_product_unit ? this.state.collectionWallet.ecom_aca_product_unit.unitType : '',
        unitQty: this.state.collectionWallet.ecom_aca_product_unit ? this.state.collectionWallet.ecom_aca_product_unit.unitQty : 0,
        unitUserPrice: this.state.collectionWallet.ecom_aca_product_unit ? this.state.collectionWallet.ecom_aca_product_unit.unitUserPrice : 0,
        ecom_ac_product: {
          selectedUnitQty: 0,
          inputQty: 0,
          selectedMixerData: "",
          quantity: 0,
          productId: this.state.data.productId,
          name: this.state.data.name,
          images: this.state.data.images,
          description: this.state.data.shortDescription,
          ecom_acca_vendor_product_units: this.state.itemSelected.ecom_acca_vendor_product_units,
          ecom_aa_category:this.state.category
        }
      }
    };
    this.props.navigation.navigate('Redeem', { items: data })
  }

  onItemSelected = (item) => {
    this.setState({ itemSelected: item })
  }

  renderProducts = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          key={index}
          onPress={() => {
            this.onItemSelected(item)
          }}
          style={{
            height: 154,
            backgroundColor: '#fff',
            marginVertical: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 5,
            borderRadius: 10,
            borderWidth: this.state.itemSelected.vendorId == item.vendorId ? 2 : 0,
            borderColor: '#B41430',
          }}>
          <View
            style={{
              alignSelf: 'center',
            }}>
            <ImageBackground
              style={{
                width: 165,
                height: 153,
              }}
              imageStyle={{
                borderRadius: 10
              }}
              resizeMode={'cover'}
              source={{ uri: `${this.state.hostUrl + item.images}` }}
            >
              <View style={{
                backgroundColor: '#B41430',
                marginTop: 128,
                height: 25,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
              }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#fff',
                  alignSelf: 'center'
                }}>Featured</Text>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              width: '50%',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignContent: 'flex-start',
              alignItems: 'flex-start',

            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#424242',
                top: 5,
                width: '75%',
                left: 20,
              }}>
              {item.vendorShopName + ' ' + item.vendorId}
            </Text>

            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#424242',
                top: 5,
                padding: 0,
                width: '90%',
                left: 20,
              }}>
              {item.address.substr(0, 30)}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 5,
              }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="fiber-manual-record"
                  size={15}
                  color="#26B90E"
                  style={{ marginTop: 2, marginLeft: 20 }}
                />
                {item.ecom_acc_vendor_product.vendorProductStatus == 'Available' ?
                  <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>Open</Text> :
                  <Text style={{ color: 'red', marginLeft: 5 }}>Closed</Text>
                }
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="directions-run"
                  size={16}
                  color="#808080"
                  style={{ marginTop: 2,marginLeft:5 }}
                />
                <Text style={{ color: '#3C3C3C' }}>{item.distance.toFixed(1)}Km</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <HeaderSide
          name={'Select Bars'}
          onClick={() => this.props.navigation.goBack()}
        />
        {
          this.state.isLoading ?
            (<ThemeFullPageLoader />)
            :
           
                 this.state.data != null ?
                (
                  <>
                <View
                  style={{
                    width: '96%',
                    height: 150,
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
                          width: 75,
                          height: 75,
                        }}
                        source={{ uri: `${this.state.hostUrl + this.state.data.images}` }}
                      />
                    </View>
                    <View
                      style={{
                        width: '55%',
                        alignSelf: 'flex-start',
                        margin: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                          color: '#4D4F50',
                        }}>
                        {this.state.data.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '500',
                          color: '#424242',
                          //top: 10,
                          //left: 5,
                        }}>
                        Available Qty: {this.state.collectionWallet.availableQty + this.state.collectionWallet.unitType}
                      </Text>

                      <View
                        style={{
                          top: 15,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="more-time"
                          size={25}
                          color="#A39B9B"
                        // style={styles.imageStyle}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#424242',
                            left: 5,
                          }}>
                          Valid until: {this.state.collectionWallet.validTillDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
             
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: '5%',
                      marginBottom: '2%',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '500',
                        color: '#4D4F50',
                      }}>
                      Redeemable in Bars
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: '#ACACAC',
                        marginTop: 5,
                      }}>
                      Select your nearest bar and redeem your drink
                    </Text>
                  </View>
               

                <FlatList
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.vendorData} //{this.state.data.ecom_ae_vendors && this.state.data.ecom_ae_vendors.length > 0 ? this.state.data.ecom_ae_vendors : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => this.renderProducts(item, index)}
                />
                </>
                ) :
               (<NoContentFound title="No Data Found" />)
        }
          

        {this.state.itemSelected != 0 ? (
          <View style={{
            marginVertical: 5,
          }}>
            <TouchableOpacity
              style={styles.save}
              onPress={() =>
                this.onContinue()
              }>
              <Text style={{ color: '#fff', fontSize: 15 }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

// dispatcher functions
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

//getting props from redux
function mapStateToProps(state) {
  let redux = state;
  return { redux };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectBars);


const styles = StyleSheet.create({
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
    borderRadius: 10,
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
});
