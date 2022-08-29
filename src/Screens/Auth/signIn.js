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
import { ThemeColors } from '../../Theme/ThemeColors';
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
      mobileError: null,
      passwordError: null,
      // mobileNumber: '99887766',
      // password: "Ankit@2261",
      formError: null,
      loader: false,
    };
  }

  componentDidMount() {
  }

  async onProceed() {
    this.setState({ loader: true });
    this.validateField('mobileNumber');
    this.validateField('password');
    if (this.state.mobileError == null && this.state.passwordError == null) {
      this.processLogin();
    }
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
      this.setState({ formError: null, loader: false });
      this.props.navigation.replace('Drawer');
      return;
    } catch (error) {
      this.setState({ formError: error, loader: false });
    }
  }


  handleUserInput = (name, value) => {
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  validateField = (fieldName) => {
    switch (fieldName) {
      case 'mobileNumber':
        let zero = this.state.mobileNumber && this.state.mobileNumber.startsWith('0');
        if (this.state.mobileNumber == null || this.state.mobileNumber.trim() == '') {
          this.setState({ mobileError: '* Mobile number mandatory', loader: false });
          return;
        } else if (zero) {
          this.setState({ mobileError: '* Mobile number should not start with a zero', loader: false });
          return;
        } else if (!Util.validMobile(this.state.mobileNumber)) {
          this.setState({ mobileError: '* Mobile number not valid!', loader: false });
          return;
        } else {
          this.setState({ mobileError: null });
        }
        break;
      case 'password':
        if (this.state.password == null || this.state.password.trim() == '') {
          this.setState({ passwordError: '* Password mandatory', loader: false });
          return;
        } else {
          this.setState({ passwordError: null });
        }
        break;
      default:
        break;
    }

  }

  render() {
    return (
      <SafeAreaView
        style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor='#F4F4F4'
          barStyle={'dark-content'}
        />

        <View>
          <View style={styles.createView}>
            <Text style={styles.createText}>Sign in</Text>
          </View>
          <View style={styles.viewInput}>
            <TextInputField
              placeholder="Mobile Number"
              keyboardType="numeric"
              iconName={'call'}
              value={this.state.mobileNumber}
              onChangeText={text => this.handleUserInput('mobileNumber', text)}
              error={this.state.mobileError}
            />
            <TextInputField
              placeholder="Password"
              iconName={'lock'}
              value={this.state.password}
              onChangeText={text => this.handleUserInput('password', text)}
              isPassword={true}
              visibility={true}
              error={this.state.passwordError}
            />

            {
              this.state.formError && <Text style={styles.errorText}>
                {this.state.formError}
              </Text>
            }

            <ThemeButton
              title={'Sign in'}
              isLoading={this.state.loader}
              onPress={() => this.onProceed()}
            />

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgetPassword')
                  //this.props.navigation.navigate('ForgetEnterPassword')
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
    backgroundColor: '#F4F4F4',// ThemeColors.CLR_BG
  },
  createView: {
    marginTop: '25%',
    alignItems: 'center',
  },
  createText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 32,
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    fontWeight: '500',

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
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  skip: {
    marginTop: '0%',
    width: '80%',
    justifyContent: 'center',
    flexDirection: 'row',
    color: ThemeColors.CLR_ACTIVITY_INDICATOR
  },
  skipText: {
    fontSize: 17,
    color: '#741728',
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  signUp: {
    fontSize: 18,
    color: ThemeColors.CLR_ACTIVITY_INDICATOR,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  forgotPasswordContainer: {
    marginTop: '5%'
  },
  forgetPass: {
    color: '#3C3C3C',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  errorText: {
    color: 'red',
    marginTop: 10
  }
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
