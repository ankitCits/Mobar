import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { fetchVendorList } from '../../api/vendor';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import BarCard from '../../Component/BarCard';
import NoContentFound from '../../Component/NoContentFound';
class BarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      data: [],
      hostUrl: '',
      loader: false,
      searchString: ''
    };
  }

  componentDidMount() {
    this.onFetch();
  }


  onFetch = async () => {
    try {
      this.setState({ loader: true })

      const postData = {
        "type": "", // featured
        Keyword: this.state.searchString,
        latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : 1.28668,
        longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : 103.853607,
      }
      const res = await fetchVendorList(postData);
      this.setState({ hostUrl: res.response.result.hostUrl, data: res.response.result.vendorList, loader: false })
    } catch (error) {
      this.setState({ loader: false });
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      console.log('Error_On_Data_Fetch getDetail', error);
    }
  }

  onSearch = (text) => {
    console.log(text)
    this.setState({ searchString: text });
    this.onFetch();
  }


  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            height: 165,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              height: 60,
            }}>
            <View
              style={{ margin: 12, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyBottomTabs')}>
                <Icon name="arrow-back" size={28} color="#4D4F50" />
              </TouchableOpacity>

              <View style={{ marginLeft: 20 }}>
                <Text
                  style={{ fontSize: 20, color: '#4D4F50', fontWeight: '500' }}>
                  Bars
                </Text>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#fff' }}>
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
                  placeholder="Search for Bars..."
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
          </View>

          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                margin: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="place"
                  size={20}
                  color="#4D4F50"
                  style={styles.imageStyle}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    color: '#3C3C3C',
                  }}>
                  {
                    this.props.redux.auth.userData
                      ? this.props.redux.auth.userData.address
                      : 'Duxten Road, 338750'
                  }
                </Text>
              </View>

              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    color: '#A1172F',
                  }}>
                  Change
                </Text>
                <Icon
                  name="edit"
                  size={12}
                  color="#A39B9B"
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <ScrollView>
          <View style={styles.container}>
            {
              this.state.loader ? (
                <ThemeFullPageLoader />
              ) : (
                <>
                  {
                    this.state.data.length > 0 && this.state.data.map((item, index) => (
                      <BarCard navigation={this.props.navigation} index={index} item={item} hostUrl={this.state.hostUrl} />
                    ))
                  }
                  {
                    this.state.data.length == 0 &&
                    <NoContentFound title="No Data Found" />
                  }
                </>
              )
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
function mapStateToProps(state) {
  let redux = state;
  return { redux };
}
export default connect(mapStateToProps, mapDispatchToProps)(BarList);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  promotions2Img: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: 338,
    height: 181,
  },
  promotions1Img: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: 350,
    height: 200,
  },
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
});
