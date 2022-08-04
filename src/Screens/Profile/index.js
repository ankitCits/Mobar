import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import {getAccessToken} from '../../localstorage';
import {A_KEY, BASE_URL} from '../../config';
import {setUserDetail} from '../../Redux/actions/auth';
class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loader: false,
      loading: true,
      name: '',
      email: '',
      contact: '',
      gender: '',
    };
    this.getDetail = this.getDetail.bind(this);
  }

  componentDidMount() {
    this.getDetail();
  }

  getDetail = async () => {
    let token = await getAccessToken(token);
    if (!token) {
      return this.setState({loading: false});
    }
    fetch(`${BASE_URL}/users/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        Token: token,
        A_Key: A_KEY,
      },
      redirect: 'follow',
    })
      .then(result => result.json())
      .then(responseDetail => {
        if (responseDetail.response) {
          this.setState({loading: false});
          console.log('=========>>>', responseDetail.response.result);

          this.setState({
            data: responseDetail.response.result.profile,
            name: responseDetail.response.result.profile.name,
            email: responseDetail.response.result.profile.email,
            contact: responseDetail.response.result.profile.contact,
            gender: responseDetail.response.result.profile.gender,
          });
        }

        if (responseDetail.errors) {
          this.setState({loading: false});
          ToastAndroid.showWithGravity(
            responseDetail.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        this.setState({loading: false});
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        console.log('Error_On_Data_Fetch', error);
      });
  };

  onProceed = async () => {
    if ((this.state.name = '')) {
      ToastAndroid.showWithGravity(
        'Name Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }

    if ((this.state.email = '')) {
      ToastAndroid.showWithGravity(
        'Email Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }

    if ((this.state.contact = '')) {
      ToastAndroid.showWithGravity(
        'Contact Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }
    let token = await getAccessToken(token);
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    let raw = JSON.stringify({
      name: `${this.state.name}`,
      email: `${this.state.email}`,
      contact: this.state.contact,
      dateofbirth: `${this.state.data.dateofbirth}`,
      gender: `${this.state.gender}`,
      address: 'singapore merlion park fv',
      latitude: 1.28668,
      longitude: 103.853607,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/users/updateProfile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('+++++++++', result);
      })
      .catch(error => console.log('error', error));
  };


  changeDateFormat(inputDate){  // expects Y-m-d
    var splitDate = inputDate.split('-');
    if(splitDate.count == 0){
        return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2]; 

    return day + '-' + month + '-' + year;
}

  render() {
    console.log('======PROFILE>>>>', this.state.data);
    let viewData = this.state.data;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <StatusBar
          animated={true}
          backgroundColor="#84182B"
          barStyle={'light-content'}
        />

        {this.state.loading && this.state.data == null ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size="large" color="#741728" />
          </View>
        ) : (
          <ScrollView>
            <View
              style={{
                height: 220,
                backgroundColor: '#84182B',
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                elevation: 5,
              }}>
              <View style={{margin: 10}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.openDrawer()}>
                  <Icon name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.userView}>
                <Image
                  style={styles.userImg}
                  resizeMode={'cover'}
                  source={images.user}
                  defaultSource={images.user}
                />
                <View style={styles.userDetail}>
                  <Text style={styles.userName}>
                    {viewData ? this.state.name : ''}
                  </Text>
                </View>
                <View style={styles.userDetail}>
                  <Text style={styles.userMail}>
                    {viewData ? this.state.email : ''}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{margin: 10, alignItems: 'center'}}>
              <View style={{marginTop: '15%'}}>
                <View style={{marginLeft: 10}}>
                  <Text>Name</Text>
                </View>
                <View style={styles.sectionStyle}>
                  <Icon
                    name="person"
                    size={20}
                    color="#A39B9B"
                    style={styles.imageStyle}
                  />
                  <TextInput
                    style={{flex: 1}}
                    value={viewData ? this.state.name : ''}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#000"
                    onChangeText={text => {
                      this.setState({name: text});
                    }}
                  />
                </View>
              </View>

              <View style={{marginTop: 0}}>
                <View style={{marginLeft: 10}}>
                  <Text>Email</Text>
                </View>
                <View style={styles.sectionStyle}>
                  <Icon
                    name="mail"
                    size={20}
                    color="#A39B9B"
                    style={styles.imageStyle}
                  />
                  <TextInput
                    style={{flex: 1}}
                    value={viewData ? this.state.email : ''}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#000"
                    onChangeText={text => {
                      this.setState({email: text});
                    }}
                  />
                </View>
              </View>

              <View style={{marginTop: 0}}>
                <View style={{marginLeft: 10}}>
                  <Text>Phone No</Text>
                </View>
                <View style={styles.sectionStyle}>
                  <Icon
                    name="call"
                    size={20}
                    color="#A39B9B"
                    style={styles.imageStyle}
                  />
                  <TextInput
                    style={{flex: 1}}
                    value={viewData ? this.state.contact : ''}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#000"
                    onChangeText={text => {
                      this.setState({contact: text});
                    }}
                  />
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{marginTop: 0}}>
                  <View style={{marginLeft: 15}}>
                    <Text>Date of Birth</Text>
                  </View>
                  <View style={styles.sectionStyleNext}>
                    <Icon
                      name="event-note"
                      size={20}
                      color="#A39B9B"
                      style={styles.imageStyle}
                    />
                    <TextInput
                      style={{flex: 1, opacity: 0.5}}
                      placeholder={viewData ? this.changeDateFormat(viewData.dateofbirth) : ''}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#000"
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>
                </View>

                <View style={{marginTop: 0}}>
                  <View style={{marginLeft: 10}}>
                    <Text>Gender</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      height: 44,
                      width: 155,
                      margin: 10,
                    }}></View>

                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      height: 44,
                      width: 155,
                      marginLeft: 10,
                      borderColor: '#7B7B7B',
                      bottom: 55,
                    }}>
                    <Picker
                      style={{marginTop: -5}}
                      selectedValue={viewData ? this.state.gender : ''}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({gender: itemValue})
                      }>
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                  </View>
                </View>
              </View>

              {/* <View style={{marginTop: 0}}>
            <View style={{marginLeft: 10}}>
              <Text>Address</Text>
            </View>
            <View style={styles.sectionStyle}>
              <Icon
                name="location-on"
                size={20}
                color="#A39B9B"
                style={styles.imageStyle}
              />
              <TextInput
                style={{flex: 1}}
                placeholder={this.props.redux ? this.props.redux.address : 'Singapore'}
                underlineColorAndroid="transparent"
                placeholderTextColor="#000"
              />
            </View>
          </View> */}
              {viewData ? (
                this.state.name != this.state.data.name ||
                this.state.email != this.state.data.email ||
                this.state.contact != this.state.data.contact ||
                this.state.gender != this.state.data.gender ? (
                  <View style={{marginTop: 10, marginBottom: 10}}>
                    <TouchableOpacity
                      style={styles.save}
                      onPress={() =>
                        // this.props.navigation.navigate('MyBottomTabs')
                        {
                          console.log('EMAIL>>>>>', this.state.email);
                          this.setState({loader: true});
                          this.onProceed();
                        }
                      }>
                      {this.state.loader ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={{color: '#fff', fontSize: 15}}>Save</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                ) : null
              ) : null}
            </View>
          </ScrollView>
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
  let redux = state.auth.userData;
  return {redux};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

const styles = StyleSheet.create({
  userImg: {
    height: 80,
    width: 80,
  },
  userView: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  userDetail: {
    marginTop: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  userMail: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#7B7B7B',
    height: 44,
    width: 320,
    borderRadius: 5,
    margin: 10,
    // elevation: 5,
  },
  sectionStyleNext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#7B7B7B',
    height: 44,
    width: 155,
    borderRadius: 5,
    margin: 10,
    // elevation: 5,
  },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 20,
  },
});
