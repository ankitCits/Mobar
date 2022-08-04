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
  Dimensions,
  FlatList,
  ImageBackground,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import Header from '../Component/Header';

const data = [
  { id: 'a', value: 'Whisky', image: images.productFilter1 },
  { id: 'b', value: 'Wine', image: images.productFilter2 },
  { id: 'c', value: 'Beer', image: images.productFilter3 },
  { id: 'd', value: 'Cocktail', image: images.productFilter4 },
  { id: 'e', value: 'Vodka', image: images.productFilter5 },
  { id: 'f', value: 'Rum', image: images.productFilter6 },
  { id: 'g', value: 'Gin', image: images.productFilter7 },
];
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { A_KEY, BASE_URL } from '../../config';
import NoContentFound from '../../Component/NoContentFound';
import { getAccessToken } from '../../localstorage';
import { addTocard, addToFav, removeToFav } from '../../Redux/actions/product';
const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feature: true,
      featureValue: 0,
      loader: true,
      categoryList: null,
      categoryData: null,
      itemIndex: 0,
      innerLoader: false,
    };
  }

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/common/getCategory`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.response) {
          this.setState({ categoryList: result.response.result });
          return this.getProductList(0);
        }
        if (result.errors) {
          this.setState({ loader: false });
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        this.setState({ loader: false });
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        console.log('error', error);
      });
  };

  getProductList = cat => {
    this.setState({ loader: true, itemIndex: cat });
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    let raw = JSON.stringify({
      Keyword: this.state.categoryList.data[cat].name,
      categorys: [1, 2],
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/products/alldatas`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.response) {
          let data = [];
          for (let i = 0; i < result.response.result.data.length; i++) {
            data.push({ ...result.response.result.data[i], card: 0, fav: 0 });
          }
          this.setState({
            categoryData: {
              data,
              hostUrl: result.response.result.hostUrl,
            },
          });
          this.setState({ loader: false });
        }
        if (result.errors) {
          this.setState({ loader: false });
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        this.setState({ loader: false });
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        console.log('error', error);
      });
  };

  addTocard = async sendData => {
    console.log('ADD_DATA', sendData);
    this.props.dispatch(addTocard(sendData));
  };

  addToFav = async sendData => {
    console.log('ADD_DATA', sendData);
    this.props.dispatch(addToFav(sendData));
  };

  removeToFav = async sendData => {
    console.log('ADD_DATA', sendData);
    this.props.dispatch(removeToFav(sendData));
  };

  addCardToState = (item, index) => {
    this.setState({ innerLoader: true });

    let data = this.state.categoryData.data;
    data[index].card = data[index].card + 1;

    this.setState({
      categoryData: {
        data,
        hostUrl: this.state.categoryData.hostUrl,
      },
    });
    this.setState({ innerLoader: false });
    let sendData = {
      productUnitId: 57,
      comboId: 0,
      qty: item.card + 1,
    };

    return this.addTocard(sendData);
  };

  removeCardToState = (item, index) => {
    this.setState({ innerLoader: true });

    let data = this.state.categoryData.data;
    data[index].card = data[index].card - 1;

    this.setState({
      categoryData: {
        data,
        hostUrl: this.state.categoryData.hostUrl,
      },
    });
    this.setState({ innerLoader: false });

    let sendData = {
      productUnitId: 57,
      comboId: 0,
      qty: item.card - 1,
    };

    this.addTocard(sendData);
  };

  addFavToState = (item, index) => {
    this.setState({ innerLoader: true });

    let data = this.state.categoryData.data;
    data[index].fav = 1;

    this.setState({
      categoryData: {
        data,
        hostUrl: this.state.categoryData.hostUrl,
      },
    });
    this.setState({ innerLoader: false });
    let sendData = {
      productId: 0,
      comboId: 4,
      vendorId: 0,
    };

    return this.addToFav(sendData);
  };

  removeFavToState = (item, index) => {
    this.setState({ innerLoader: true });

    let data = this.state.categoryData.data;
    data[index].fav = 0;

    this.setState({
      categoryData: {
        data,
        hostUrl: this.state.categoryData.hostUrl,
      },
    });
    this.setState({ innerLoader: false });

    let sendData = {
      wishlistId: 11,
    };
    this.removeToFav(sendData);
  };

  render() {
    console.log('=======>>', this.state.categoryList);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}>
        <>
          <View
            style={{
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                height: 70,
              }}>
              <Header
                onClick={() => this.props.navigation.pop()}
                onCard={() => this.props.navigation.navigate('MyCard')}
                onNotification={() =>
                  this.props.navigation.navigate('Notification')
                }
                IconName="arrow-back"
                IconColor="#4D4F50"
                Address={
                  this.props.redux.auth.userData
                    ? this.props.redux.auth.userData.address
                    : 'Duxten Road, 338750'
                }
              />
            </View>
            <View style={{ alignSelf: 'center', marginTop: -5 }}>
              <View style={styles.sectionStyle}>
                <Icon
                  name="search"
                  size={28}
                  color="#A39B9B"
                  style={styles.imageStyle}
                />
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Search for Drinks..."
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity>
                  <Icon
                    name={'filter-list'}
                    size={22}
                    color="#A39B9B"
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.filterView}>
                <View
                  style={{
                    margin: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity style={styles.filterInnerView}>
                    <Icon name="swap-vert" size={28} color="#4D4F50" />
                    <Text style={styles.filterInnerText}>Sort</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.filterView}>
                <View
                  style={{
                    margin: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity style={styles.filterInnerView}>
                    <Icon name="filter-list-alt" size={24} color="#4D4F50" />
                    <Text style={styles.filterInnerText}>Filter</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
          {this.state.loader ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="large" color="#741728" />
            </View>
          ) : (
            <>
              {this.state.categoryList != null && this.state.feature ? (
                <>
                  <FlatList
                    data={this.state.categoryList.data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                      height: 140,
                      marginTop: 5,
                    }}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          margin: 10,
                          marginLeft: 15,
                          marginBottom: 0,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.getProductList(index)}
                          style={{
                            shadowColor: '#fff',
                            shadowOffset: { width: 1, height: 0 },
                            shadowOpacity: 0.4,
                            shadowRadius: 3,
                            elevation: 5,
                            height: 48,
                            width: 48,
                            backgroundColor:
                              index == this.state.itemIndex
                                ? '#B01732'
                                : '#fff',
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            resizeMode={'cover'}
                            source={{
                              uri: `${this.state.categoryList.hostUrl + item.images
                                }`,
                            }}
                            defaultSource={item.image}
                            style={{
                              alignSelf: 'center',
                              marginTop: index == this.state.itemIndex ? 5 : 10,
                              height: 35,
                              width: 35,
                            }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: '500',
                            color:
                              index != this.state.itemIndex
                                ? '#7B7B7B'
                                : '#711323',
                            // marginLeft:
                            textAlign: 'center',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    )}
                  />
                </>
              ) : null}

              {this.state.categoryData != null ? (
                this.state.categoryData.data.length > 0 ? (
                  <>
                    <FlatList
                      data={this.state.categoryData.data}
                      onScroll={e => {
                        console.log(e.nativeEvent.contentOffset.y);
                        this.setState({
                          featureValue: e.nativeEvent.contentOffset.y,
                        });
                        if (e.nativeEvent.contentOffset.y < 50) {
                          return this.setState({ feature: true });
                        } else {
                          this.setState({ feature: false });
                        }
                      }}
                      keyExtractor={(item,index) => index.toString()}
                      numColumns={numColumns}
                      renderItem={({ item, index }) => (
                        <View style={styles.itemOuterContailner}>
                          <View style={styles.itemContainer}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 10,
                              }}>
                              <Text style={styles.item}>
                                {item.ecom_aca_product_units[0].unitQty}{' '}
                                {item.ecom_aca_product_units[0].unitType}
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  item.fav
                                    ? this.removeFavToState(item, index)
                                    : this.addFavToState(item, index);
                                }}>
                                <Image
                                  resizeMode={'cover'}
                                  source={
                                    item.fav ? images.heartFill : images.heart
                                  }
                                  defaultSource={
                                    item.fav ? images.heartFill : images.heart
                                  }
                                  style={{
                                    width: 20.57,
                                    height: 18,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                alignItems: 'center',
                                marginTop: -5,
                              }}>
                              <Image
                                resizeMode={'cover'}
                                source={{
                                  uri: item.images
                                    ? `${this.state.categoryData.hostUrl +
                                    item.images
                                    }`
                                    : images.wine,
                                }}
                                defaultSource={images.wine}
                                style={{
                                  height: 80,
                                  width: 40,
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: '500',
                                  color: '#050505',
                                  marginTop: 10,
                                }}>
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: '400',
                                  color: '#000',
                                }}>
                                {item.shortDescription}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '700',
                                  color: '#000',
                                }}>
                                ${item.ecom_aca_product_units[0].unitUserPrice}
                              </Text>
                            </View>
                            <View
                              style={{
                                // marginTop: 18,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                              }}>
                              {item.ecom_aca_product_units.savedPrices ? (
                                <ImageBackground
                                  resizeMode={'cover'}
                                  source={images.saveTemplate}
                                  defaultSource={images.saveTemplate}
                                  style={{
                                    width: 76,
                                    height: 19,
                                    marginTop: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      fontWeight: '500',
                                      color: '#fff',
                                      // marginTop:-18,
                                      marginLeft: 5,
                                    }}>
                                    Save $100
                                  </Text>
                                </ImageBackground>
                              ) : (
                                <View />
                              )}
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                {item.card ? (
                                  <>
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.removeCardToState(item, index)
                                      }
                                      style={{
                                        alignSelf: 'center',
                                        backgroundColor: '#BABABA',
                                        borderRadius: 20,
                                        marginTop: -5,
                                        marginRight: 5,
                                      }}>
                                      <Icon
                                        name="remove"
                                        size={18}
                                        color="#fff"
                                      />
                                    </TouchableOpacity>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        fontWeight: '700',
                                        alignItems: 'center',
                                        marginTop: -5,
                                        marginRight: 5,
                                      }}>
                                      {item.card}
                                    </Text>
                                  </>
                                ) : null}
                                <TouchableOpacity
                                  onPress={() =>
                                    this.addCardToState(item, index)
                                  }
                                  style={{
                                    alignSelf: 'center',
                                    backgroundColor: '#BABABA',
                                    borderRadius: 20,
                                    marginTop: -5,
                                    marginRight: 5,
                                  }}>
                                  <Icon name="add" size={18} color="#fff" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    />
                  </>
                ) : (
                  <NoContentFound title="No Data Found" />
                )
              ) : (
                <NoContentFound title="No Data Found" />
              )}
            </>
          )}
        </>

        <></>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderWidth: 0,
    borderColor: '#000',
    height: 40,
    width: 360,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
  },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  Dashboard: {
    height: 170,
    width: 375,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
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
  itemContainer: {
    width: 155,
    // height: 225,
    // padding:,
    marginLeft: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 1,
    borderTopWidth: 0,
    borderRadius: 200,
    margin: 3,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  item: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
  },
  itemOuterContailner: {
    width: size,
    height: size + 50,
    // marginTop: 10,
  },
});
