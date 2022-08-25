import React, { Component, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { A_KEY, BASE_URL } from '../../config';
import { setAccessToken } from '../../localstorage';
import { FontFamily } from '../../Theme/FontFamily';
import ThemeButton from '../../Component/ThemeButton';

export default class VerifyOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      loader: false,
      timer:0,
    };
  }

  VerifyOtp = () => {
    if (this.state.password == null || this.state.password == '') {
      ToastAndroid.showWithGravity(
        'Please Enter OTP !',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    this.setState({ loader: true });
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append(
      'Otp_Token',
      this.props.route.params.response['otp-token'],
    );

    var raw = JSON.stringify({
      code: Number(this.state.password),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/auth/verifyCode`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.response) {
          this.setState({ loader: false });
          this.forWard(result);

        }

        if (result.errors) {
          this.setState({ loader: false });
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
          return;
        }
      })
      .catch(error => {
        console.log('error', error);
        this.setState({ loader: false });
        ToastAndroid.showWithGravity(
          'Network Issue !',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        return;
      });
  };

  // Check Decision
  async forWard(result) {
    await setAccessToken(result.response.token);
    this.props.navigation.navigate('Drawer');
    return result;
  }

  componentDidUpdate(){
    if(this.state.timer === 0){
      clearInterval(this.interval);
    }
  }

  resendOtp = () => {
    this.setState({timer : 30});
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: this.state.timer - 1 })),
      1000
    );
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append(
      'Otp_Token',
      this.props.route.params.response['otp-token'],
    );


    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/auth/resendOtp`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("varify Otp > ResendOtp > response",result);
        if (result.response) {
          ToastAndroid.showWithGravity(
            'OTP Resend Successfully !',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }

        if (result.errors) {
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        console.log('error', error);
        ToastAndroid.showWithGravity(
          'Network Issue !',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };

  render() {
    //console.log('===>>Verify,', this.props.route.params);
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
        <View style={{ flex: 1, marginTop: 15 }}>
          <View style={{ marginLeft: 10, }}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <Icon
                name="arrow-back"
                size={30}
                color="#424242"
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.createView}>
            <Text style={styles.createText}>Verify your Account</Text>
          </View>
          <View style={styles.emailView}>
            <Text style={styles.textDetail}>
              An OTP has been sent to your mobile
            </Text>
            <Text style={styles.textDetail}>
              number ending in{' '}
              <Text style={{ fontSize: 17, fontWeight: '700', color: '#969696' }}>
                xxxxx-{String(this.props.route.params.mobileNumber).slice(-4)}
              </Text>
            </Text>
          </View>
          {/* <View style={styles.otpView}>
            <Text style={styles.textDetail}>Enter OTP</Text>
          </View> */}
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

            <ThemeButton title={'Confirm'} isLoading={this.state.loader} isDisabled={this.state.timer != 0 ? true : false} onPress={() => this.VerifyOtp()} />

            <View style={styles.signin}>
              <TouchableOpacity onPress={() => this.state.timer == 0 ? this.resendOTP():'' }>
                <Text
                  style={styles.textDetail}>
                  {' '}
                   {this.state.timer != 0 ?  `Otp resent in ${this.state.timer} secs`:'Request New OTP'}
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
  createView: {
    marginTop: '45%',
    alignItems: 'center',
  },
  emailView: {
    marginTop: '4%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  otpView: {
    marginTop: '7%',
    marginBottom: -15,
    alignItems: 'center',
  },
  createText: {
    fontSize: 32,
    color: '#424242',
    fontFamily: FontFamily.TAJAWAL_MEDIUM,
    fontWeight: '500',
  },
  viewInput: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  textDetail: {
    fontSize: 17,
    fontWeight: '500',
    color: '#969696',
    fontFamily: FontFamily.TAJAWAL_BLACK
  },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
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
    borderColor: '#FFFFFF',
    fontSize: 30,
    fontWeight: '500',
    borderWidth: 1,
    color: '#000000',
    fontFamily: FontFamily.TAJAWAL_BLACK
  },
});
