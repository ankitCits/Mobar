import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { BASE_URL, MY_HEADER } from '../../config';
import { getAccessToken, setAccessToken } from '../../localstorage';
import { getAuthenticateUser, setUserDetail } from '../../Redux/actions/auth';
import Util from '../../utils';

import TextInputField from '../../Component/TextInputField';
import { FontFamily } from '../../Theme/FontFamily';
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyCheck: true,
      legalCheck: true,
      visibility: false,
      mobileNumber: null,
      password: null,
      loader: false,
      loggedIn: 0,
    };
  }

  componentDidMount() {
    this.checkCredentials();
  }

  checkCredentials = async () => {
    let token = await getAccessToken();
    if (token != null || token != undefined) {
      // setLoggedIn(1);
      this.setState({ loggedIn: 1 });
      console.log('=======xxxxxxxxxxxx>>>>>>', token);
    } else {
      this.setState({ loggedIn: -1 });
    }
  };
  async onProceed() {
    // this.props.navigation.navigate('Drawer');
    this.setState({ loader: true });
    // this.props.navigation.navigate('VerifyOtp')
    console.log(this.state.mobileNumber, ':', this.state.password);

    // check Not Blank
    if (this.state.mobileNumber == null) {
      ToastAndroid.showWithGravity(
        'Mobile number mandatory',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({ loader: false });
      return;
    }
    if (this.state.password == null) {
      ToastAndroid.showWithGravity(
        'Password mandatory',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({ loader: false });
      return;
    }

    // Not Start With Zero
    let zero = this.state.mobileNumber.startsWith('0');
    if (zero) {
      ToastAndroid.showWithGravity(
        'Mobile number should not start with a zero',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({ loader: false });
      return;
    }

    // Valid Mobile
    let isMobile = Util.validMobile(this.state.mobileNumber);
    console.log(isMobile);
    if (!isMobile) {
      ToastAndroid.showWithGravity(
        'Mobile number not valid!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({ loader: false });
      return;
    }

    let payload = {
      contact: `${this.state.mobileNumber}`,
      password: `${this.state.password}`,
      deviceInfo: 'vivo S1 pro',
      fcmToken: 'fcm token',
    };
    this.fetchLogin(payload);
  }

  fetchLogin(payload) {
    var raw = JSON.stringify({
      contact: `${this.state.mobileNumber}`,
      password: `${this.state.password}`,
      deviceInfo: 'vivo S1 pro',
      fcmToken: 'fcm token',
    });
    var requestOptions = {
      method: 'POST',
      headers: MY_HEADER,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/auth/sign-in`, requestOptions)
      .then(result => result.json())
      .then(response => {
        if (response.response) {
          console.log('getAuthenticateUser Action', response.response.token);
          this.setState({ loader: false });
          this.forWard(response);
        }
        if (response.errors) {
          this.setState({ loader: false });
          ToastAndroid.showWithGravity(
            response.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        this.setState({ loader: false });
        ToastAndroid.showWithGravity(
          'Error on SignIn Api',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        console.log('error', error);
      });
  }

  // Check Decision
  async forWard(response) {
    await setAccessToken(response.response.token);
    this.props.navigation.navigate('Drawer');
    return response;
  }

  render() {
    if (this.state.loggedIn == 1) {
      this.props.navigation.navigate('Drawer');
    }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}>
        <StatusBar
          animated={true}
          backgroundColor="#E5E5E5"
          barStyle={'dark-content'}
        />
        {this.state.loggedIn == 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size="large" color="#741728" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.createView}>
              <Text style={styles.createText}>Sign in</Text>
            </View>
            <View style={styles.viewInput}>
              {/* <View style={styles.sectionStyle}> */}
              <TextInputField
                placeholder="Mobile Number"
                keyboardType="numeric"
                iconName={'call'}
                onChangeText={text => {
                  this.setState({ mobileNumber: text });
                }}
                isPassword={false}
                visibility={false}
              />
              {/* </View> */}
              {/* <View style={styles.sectionStyle}> */}
              <TextInputField
                placeholder="Password"
                iconName={'lock'}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                isPassword={true}
                visibility={true}
              />
              {/* </View> */}

              <View style={styles.signup}>
                {this.state.loader ? (
                  <ActivityIndicator size="large" color="#741728" />
                ) : (
                  <TouchableOpacity
                    style={styles.signupInner}
                    onPress={() => this.onProceed()}>
                    <Text
                      style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={{ marginTop: '5%' }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ForgetPassword')
                  }>
                  <Text style={styles.forgetPass}>Forgot password</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.signin}>
                <Text style={{ fontSize: 17 }}>I’m a new user, </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('createAccount')
                  }>
                  <Text
                    style={{ fontSize: 17, color: '#741728', fontWeight: '700' }}>
                    {' '}
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.skip}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Drawer')
                  }>
                  <Text
                    style={{ fontSize: 17, color: '#741728', fontWeight: '700', textDecorationLine: 'underline' }}>
                    {' '}
                    Skip
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  createView: {
    marginTop: '25%',
    alignItems: 'center',
  },
  createText: {
    fontSize: 32,
    color: '#000',
    fontWeight: '500',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  viewInput: {
    flex: 1,
    alignItems: 'center',
    marginTop: '15%',
  },
  input: {
    height: 50,
    width: '80%',
    margin: 12,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#470000',
    shadowOpacity: 1,
    // elevation: 1,
    borderWidth: 1,
    flex: 1,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    left: '70%',
  },
  // sectionStyle: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  //   borderWidth: 0,
  //   borderColor: '#000',
  //   height: 44,
  //   width: 320,
  //   borderRadius: 5,
  //   margin: 10,
  //   elevation: 2,
  // },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  signup: {
    marginTop: '10%',
    width: '80%',
    height: 44,
  },
  signupInner: {
    backgroundColor: '#741728',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signin: {
    marginTop: '10%',
    width: '80%',
    height: 44,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  skip: {
    marginTop: '0%',
    width: '80%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  forgetPass: {
    color: '#3C3C3C',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: FontFamily.TAJAWAL_MEDIUM
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
