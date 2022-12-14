import React, {Component} from 'react';
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
import {connect} from 'react-redux';
import {A_KEY, BASE_URL} from '../../config';
import NoContentFound from '../../Component/NoContentFound';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import styles from './styles';
import ProductCard from '../../Component/ProductCard';
import {fetchProductData} from '../../api/product';
import {showToaster} from '../../api/func';
import {connectActionSheet} from '@expo/react-native-action-sheet';
const numColumns = 2;
const options = ['Sort By Price', 'Sort By Unit Quantity', 'Cancel'];
const cancelButtonIndex = 2;
class Product extends Component {
  constructor(props) {
    super(props);
    // console.log('Product')
    this.state = {
      feature: true,
      featureValue: 0,
      loader: true,
      categoryList: null,
      categoryData: null,
      itemIndex:
        this.props.route.params && this.props.route.params.categoryIdx.key
          ? this.props.route.params.categoryIdx.key
          : 0,
      innerLoader: false,
      searchText: '',
      sort: 'DESC',
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
          this.setState({categoryList: result.response.result});
          this.getProductList();
        }
        if (result.errors) {
          this.setState({loader: false});
          showToaster(result.errors[0].msg, 'TOP');
        }
      })
      .catch(error => {
        this.setState({loader: false});
        showToaster('Network Error!', 'TOP');
        console.log('error', error);
      });
  };

  getProductList = async (text = '', byPrice = '', byName = '') => {
    this.setState({loader: true});
    try {
      const postData = {
        Keyword: text,
        categorys: [
          this.state.categoryList.data[this.state.itemIndex].categoryId,
        ],
        srotByPrice: byPrice,
        srotByName: byName,
      };
      const prodData = await fetchProductData(postData);
      this.setState({
        categoryData: {
          data: prodData.response.result.data,
          hostUrl: prodData.response.result.hostUrl,
        },
      });
      this.setState({loader: false});
    } catch (error) {
      this.setState({loader: false});
      console.log('Product > getProductList > Catch', error);
      this.setState({loader: false});
      showToaster('Network Error!', 'TOP');
    }
  };

  renderCategories = (item, index) => (
    <TouchableOpacity
      style={{
        margin: 10,
        marginLeft: 15,
        marginBottom: 0,
      }}
      onPress={() => {
        item.name != 'Combo'
          ? this.setState({itemIndex: index, sort: 'DESC'}, () => {
              this.getProductList();
            })
          : '';
      }}>
      <View
        style={{
          shadowColor: '#fff',
          shadowOffset: {width: 1, height: 0},
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
          height: 48,
          width: 48,
          backgroundColor:
            index == this.state.itemIndex && item.name != 'Combo'
              ? '#B01732'
              : '#fff',
          borderRadius: 5,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode={'stretch'}
          source={{
            uri: `${
              item.name == 'Combo'
                ? ''
                : this.state.categoryList.hostUrl + item.images
            }`,
          }}
          defaultSource={item.defaultImg}
          style={{
            alignSelf: 'center',
            // marginTop: index == this.state.itemIndex ? 5 : 10,
            height: 35,
            width: 35,
            borderRadius: 2,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: '500',
          color: index != this.state.itemIndex ? '#7B7B7B' : '#711323',
          textAlign: 'center',
        }}>
        {item.name == 'Combo' ? '' : item.name}
      </Text>
    </TouchableOpacity>
  );

  renderProducts = (item, index) => {
    return (
      <ProductCard
        navigation={this.props.navigation}
        item={item}
        index={index}
        categoryData={this.state.categoryData}
        hostUrl={this.state.categoryData.hostUrl}
      />
    );
  };

  sortBy = type => {
    //console.log("state before set",this.state.sort);
    //this.setState({sort:'ASC'});
    console.log('state sort', this.state.sort);
    if (type == 'Price') {
      this.state.sort == 'ASC'
        ? this.setState({sort: 'DESC'})
        : this.setState({sort: 'ASC'});
      this.getProductList('', this.state.sort, '');
    } else {
      this.state.sort == 'ASC'
        ? this.setState({sort: 'DESC'})
        : this.setState({sort: 'ASC'});
      this.getProductList('', '', this.state.sort);
    }
    // this.props.showActionSheetWithOptions(
    //   {
    //     options,
    //     cancelButtonIndex,
    //   },
    //   (buttonIndex) => {
    //     console.log("buttonIndex > ",buttonIndex);
    //     if (buttonIndex === 0) { // short by Price or DESC
    //       this.getProductList('','DESC','');
    //     } else if (buttonIndex === 1) { // short by Unit Qty or ASC
    //       this.getProductList('','','ASC');
    //     }
    //   }
    // );
  };

  onSearch = text => {
    this.getProductList(text, '', '');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          onClick={() => this.props.navigation.pop()}
          onCard={() => this.props.navigation.navigate('MyCard')}
          onNotification={() => this.props.navigation.navigate('Notification')}
          IconName="arrow-back"
          Image="Default"
          IconColor="#4D4F33"
          Address={
            this.props.redux &&
            this.props.redux.auth.userData &&
            this.props.redux.auth.userData.result &&
            this.props.redux.auth.userData.result.profile
              ? this.props.redux.auth.userData.result.profile.address
              : 'Duxten Road, 338750'
          }
          // Address={
          //     this.props.redux.auth.userData
          //         ? this.props.redux.auth.userData.address
          //         : 'Duxten Road, 338750'
          // }
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={styles.sectionStyle}>
            <Icon
              name="search"
              size={28}
              color="#A39B9B"
              style={styles.imageStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="Search for Drinks..."
              underlineColorAndroid="transparent"
              onChangeText={this.onSearch}
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
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.state.categoryData && this.state.categoryData.data.length > 0
                ? this.sortBy('Price')
                : '';
            }}
            style={styles.filterView}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon name="swap-vert" size={26} color="#4D4F50" />
              <Text style={styles.filterInnerText}>Sort By Price</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.state.categoryData && this.state.categoryData.data.length > 0
                ? this.sortBy('Alphabetic')
                : '';
            }}
            style={styles.filterView}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon name="swap-vert" size={26} color="#4D4F50" />
              <Text style={styles.filterInnerText}>Sort By A to Z</Text>
            </View>
          </TouchableOpacity>
        </View>

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
                  renderItem={({item, index}) =>
                    this.renderCategories(item, index)
                  }
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
                    renderItem={({item, index}) =>
                      this.renderProducts(item, index)
                    }
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
  return {redux};
}

const connectedApp = connectActionSheet(Product);

export default connect(mapStateToProps, mapDispatchToProps)(connectedApp);
