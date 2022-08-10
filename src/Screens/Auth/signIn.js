import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { setAccessToken } from '../../localstorage';
import { FontFamily } from '../../Theme/FontFamily';
import { colors } from '../../Theme/colors';
import Util from '../../utils';
import TextInputField from '../../Component/TextInputField';
import ThemeButton from '../../Component/ThemeButton';
import { singIn } from '../../api/auth';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyCheck: true,
      legalCheck: true,
      visibility: false,
      mobileNumber: null,
      password: null,
      // mobileNumber: '88392288',
      // password: "Ds@123456",
      loader: false,
    };
  }

  componentDidMount() {
  }

  async onProceed() {
    this.setState({ loader: true });
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
    if (!isMobile) {
      ToastAndroid.showWithGravity(
        'Mobile number not valid!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({ loader: false });
      return;
    }

    this.processLogin();
  }

  async processLogin() {
    const postData = {
      contact: `${this.state.mobileNumber}`,
      password: `${this.state.password}`,
      deviceInfo: 'vivo S1 pro',
      fcmToken: 'fcm token',
    }
    try {
      const resp = await singIn(postData)
      await setAccessToken(resp);
      this.setState({ loader: false });
      this.props.navigation.replace('Drawer');
      return;
    } catch (error) {
      this.setState({ loader: false });
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
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
                onPress={() => this.props.navigation.navigate('createAccount')}>
                <Text
                  style={styles.signUp}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.skip}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Drawer')}>
                <Text
                  style={styles.skipText}>
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container: {
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
  newUserText: {
    fontSize: 18,
    color: colors.CLR_SIGN_IN_TEXT_COLOR,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  skip: {
    marginTop: '0%',
    width: '80%',
    justifyContent: 'center',
    flexDirection: 'row',
    color: colors.CLR_ACTIVITY_INDICATOR
  },
  skipText: {
    fontSize: 17,
    color: '#741728',
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  signUp: {
    fontSize: 18,
    color: colors.CLR_ACTIVITY_INDICATOR,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_MEDIUM
  },
  forgotPasswordContainer: {
    marginTop: '5%'
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
