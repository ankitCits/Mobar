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
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import images from '../../assets/images';
import { A_KEY, BASE_URL } from '../../config';
export default class ForgetPasswordOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      loader: false,
      timer: 0,
    };
  }

  onProceed = () => {
    if (this.state.password == null || this.state.password == '') {
      ToastAndroid.showWithGravity(
        'Please Enter OTP !',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }
    //console.log("ForgotPWd > onProceed > P_Token",this.props.route.params.response.response['password-token']);
    //console.log("ForgotPWd > onProceed > Pwd",this.state.password);
    this.setState({ loader: true });
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append(
      'P_Token',
      this.props.route.params.response.response['password-token']
    );
    var raw = JSON.stringify({
      code: Number(this.state.password),
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    //console.log("OnProceed > Verify Otp > RequestOption", requestOptions);
    fetch(`${BASE_URL}/password/verifyCode`, requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log("OnProceed > Verify Otp > Response", result);
        this.setState({ loader: false });
        if (result.response) {
          this.setState({ loader: false });
          this.props.navigation.navigate('ForgetEnterPassword', result);
          return;
        }
        if (result.errors) {
          console.log("OnProceed > Verify Otp > If Error", result.errors[0]);
          this.setState({ loader: false });
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        console.log("OnProceed > Verify Otp > If Error", error);
        this.setState({ loader: false });
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }

  resendOTP = () => {
    this.setState({ timer: 30 });
    this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: this.state.timer - 1 })),
      1000
    );
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append(
      'P_Token',
      this.props.route.params.response.response['password-token'],
    );

    var raw = '';
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/password/resendCode`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.response) {
          // this.setState({loader: false});
          ToastAndroid.showWithGravity(
            'OTP Resend Successfully !',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
          return result;
        }

        if (result.errors) {
          // this.setState({loader: false});
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        console.log('error', error);
        // this.setState({loader: false});
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };

  render() {
    //console.log('PROPS________', this.props.route.params);
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
        <ScrollView>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <Icon
                name="arrow-back"
                size={30}
                color="#424242"
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: 'center',
              marginTop: '10%',
            }}>
            <Image
              resizeMode={'cover'}
              source={images.forgot2}
              defaultSource={images.forgot2}
            />
          </View>
          <View style={styles.createView}>
            <Text style={styles.createText}>An OTP has sent to your mobile ending in XXXX-{String(this.props.route.params.mobileNo).slice(-4)}</Text>
          </View>
          <View style={styles.emailView}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#969696' }}>
              We have send OTP in your mobile number
            </Text>
          </View>
          <View style={styles.viewInput}>
            <View>
              <SmoothPinCodeInput
                password
                mask="﹡"
                cellSize={40}
                codeLength={6}
                cellSpacing={20}
                cellStyle={styles.otpCell}
                cellStyleFocused={styles.otpCellFocus}
                value={this.state.password}
                onTextChange={password => this.setState({ password })}
              />
            </View>

            <View style={styles.signup}>
              <TouchableOpacity
                style={[styles.signupInner, this.state.timer != 0 ? styles.disabled : styles.enable]}
                disabled={this.state.timer == 0 ? false : true}
                onPress={() => this.onProceed()}>
                {this.state.loader ? (
                  <ActivityIndicator size="small" color="#BE212F" />
                ) : (
                  <Text
                    style={[styles.confirmText, this.state.timer != 0 ? styles.disabledText : styles.enableText]}>
                    CONFIRM
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.signin}>
              <TouchableOpacity onPress={() => this.state.timer == 0 ? this.resendOTP() : ''}>
                <Text
                  style={{ fontSize: 17, color: '#969696', fontWeight: '400' }}>
                  {' '}
                  {this.state.timer != 0 ? `Otp resent in ${this.state.timer} secs` : 'Resent OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  createView: {
    marginTop: '15%',
    alignItems: 'center',
  },
  emailView: {
    marginTop: '2%',
    alignItems: 'center',
  },
  otpView: {
    marginTop: '5%',
    alignItems: 'center',
  },
  createText: {
    fontSize: 25,
    color: '#424242',
    fontWeight: '700',
  },
  viewInput: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
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
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#000',
    height: 44,
    width: 320,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
  },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  term: {
    //   flexDirection:'row',
    // alignItems: 'center',
    marginTop: '5%',
    // alignSelf:'flex-start',
  },
  termInner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  signup: {
    marginTop: '5%',
    width: '80%',
    height: 44,
  },
  signupInner: {
    backgroundColor: 'transparent',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    width: 180,
    alignSelf: 'center',
    borderRadius: 20,
  },
  confirmText: {
    fontSize: 18, fontWeight: '700'
  },
  disabledText: {
    color: '#969696'
  },
  enableText: { color: '#BE212F' },
  disabled: {
    borderColor: '#969696',
  },
  enable: {
    borderColor: '#C11331',
  },
  signin: {
    marginTop: '5%',
    width: '80%',
    height: 44,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  otpCell: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  otpCellFocus: {
    borderColor: '#741728',
    borderWidth: 1,
  },
});
