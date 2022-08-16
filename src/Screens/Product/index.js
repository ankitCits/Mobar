import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../Component/Header';

import { connect } from 'react-redux';
import { A_KEY, BASE_URL } from '../../config';
import NoContentFound from '../../Component/NoContentFound';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';

import styles from './styles';
import ProductCard from '../../Component/ProductCard';
const numColumns = 2;

class Product extends Component {
  constructor(props) {
    super(props);
    console.log('Product')
    this.state = {
      feature: true,
      featureValue: 0,
      loader: true,
      categoryList: null,
      categoryData: null,
      itemIndex: (this.props.route.params && this.props.route.params.categoryIdx.key) ? this.props.route.params.categoryIdx.key : 0,
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
          return this.getProductList(this.state.itemIndex);
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
      // categorys: [1, 2],
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
            data.push({ ...result.response.result.data[i], cart: 0, fav: 0 });
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

  renderCategories = (item, index) =>
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
          backgroundColor: index == this.state.itemIndex ? '#B01732' : '#fff',
          borderRadius: 10,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode={'cover'}
          source={{
            uri: `${this.state.categoryList.hostUrl + item.images}`,
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
          color: index != this.state.itemIndex ? '#7B7B7B' : '#711323',
          textAlign: 'center',
        }}>
        {item.name}
      </Text>
    </View>

  renderProducts = (item, index) => {
    return (
      <ProductCard navigation={this.props.navigation} item={item} index={index} categoryData={this.state.categoryData} hostUrl={this.state.categoryData.hostUrl} />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <>
          {/* Header */}
          <View
            style={{ backgroundColor: '#fff', }}>
            <View style={{ height: 70, }}>
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
          {/* Header Ends */}
          <>
            {/* Sort and Filter */}
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
            {/* Sort and Filter Ends */}

          </>

          {this.state.loader ? (
            <ThemeFullPageLoader />
          ) : (
            <>
              {this.state.categoryList != null && this.state.feature ? (
                <>
                  <FlatList
                    data={this.state.categoryList.data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryFlatList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => this.renderCategories(item, index)}
                  />
                </>
              ) : null}

              {this.state.categoryData != null ? (
                this.state.categoryData.data.length > 0 ? (
                  <>
                    <FlatList
                      data={this.state.categoryData.data}
                      // NOTE: To hide and show the category bar

                      // onScroll={e => {
                      //   console.log(e.nativeEvent.contentOffset.y);
                      //   this.setState({
                      //     featureValue: e.nativeEvent.contentOffset.y,
                      //   });
                      //   if (e.nativeEvent.contentOffset.y < 50) {
                      //     return this.setState({ feature: true });
                      //   } else {
                      //     this.setState({ feature: false });
                      //   }
                      // }}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={numColumns}
                      renderItem={({ item, index }) => this.renderProducts(item, index)}
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
