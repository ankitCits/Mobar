import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { BASE_URL, MY_HEADER } from '../../config';
import { setAccessToken } from '../../localstorage';
import Util from '../../utils';
import { FontFamily } from '../../Theme/FontFamily';
import TextInputField from '../../Component/TextInputField';
import ThemeButton from '../../Component/ThemeButton';
import { colors } from '../../Theme/colors';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyCheck: true,
      legalCheck: true,
      visibility: false,
      mobileNumber: '88392288',
      password: "Ds@123456",
      loader: false,
      loggedIn: -1
    };
  }

  componentDidMount() {
  }

  async onProceed() {
    this.setState({ loader: true });
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

    this.fetchLogin();
  }

  fetchLogin() {
    const postData = JSON.stringify({
      contact: `${this.state.mobileNumber}`,
      password: `${this.state.password}`,
      deviceInfo: 'vivo S1 pro',
      fcmToken: 'fcm token',
    });
    console.log("postData data stringy fy",postData)
    const requestOptions = {
      method: 'POST',
      headers: MY_HEADER,
      body: postData,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/auth/sign-in`, requestOptions)
      .then(result => result.json())
      .then(async response => {
        if (response.response) {
          console.log("response after login",response);
          console.log('getAuthenticateUser Action', response.response.token);
          this.setState({ loader: false });
          await setAccessToken(response.response.token);
          this.props.navigation.navigate('Drawer');
          return;
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

  render() {
    return (
      <SafeAreaView
        style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={colors.CLR_BG}
          barStyle={'dark-content'}
        />
        {this.state.loggedIn == 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size="large" color={colors.CLR_ACTIVITY_INDICATOR} />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.createView}>
              <Text style={styles.createText}>Sign in</Text>
            </View>
            <View style={styles.viewInput}>
              <TextInputField
                placeholder="Mobile Number"
                keyboardType="numeric"
                iconName={'call'}
                value={this.state.mobileNumber}
                onChangeText={text => {
                  this.setState({ mobileNumber: text });
                }}
              />
              <TextInputField
                placeholder="Password"
                iconName={'lock'}
                value={this.state.password}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                isPassword={true}
                visibility={true}
              />

              <ThemeButton
                title={'Sign in'}
                isLoading={this.state.loader}
                onPress={() => this.onProceed()}
              />

              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ForgetPassword')
                  }>
                  <Text style={styles.forgetPass}>Forgot password</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.signIn}>
                <Text style={styles.newUserText}>I’m a new user, </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('createAccount')
                  }>
                  <Text
                    style={styles.signUp}>
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
                    style={styles.skipText}>
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
  container:{
    flex: 1,
    backgroundColor: colors.CLR_BG
  },
  createView: {
    marginTop: '25%',
    alignItems: 'center',
  },
  createText: {
    fontSize: 32,
    color: colors.CLR_SIGN_IN_TEXT_COLOR,
    fontWeight: '500',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  viewInput: {
    alignItems: 'center',
    marginTop: '15%',
  },
  signIn: {
    marginTop: '10%',
    height: 44,
    flexDirection: 'row',
  },
  newUserText:{
    fontSize: 18,
    color: colors.CLR_SIGN_IN_TEXT_COLOR,
    fontWeight:'700', 
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  skip: {
    marginTop: '0%',
    width: '80%',
    justifyContent: 'center',
    flexDirection: 'row',
    color: colors.CLR_ACTIVITY_INDICATOR
  },
  skipText:{
    fontSize: 17, 
    color: '#741728', 
    fontWeight: '700', 
    textDecorationLine: 'underline'
  },
  signUp:{
    fontSize: 18, 
    color: colors.CLR_ACTIVITY_INDICATOR, 
    fontWeight: '700', 
    fontFamily: FontFamily.TAJAWAL_MEDIUM 
  },
  forgotPasswordContainer:{
    marginTop:'5%'
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
