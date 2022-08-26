import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Util from '../../utils';
import { A_KEY, BASE_URL } from '../../config';
import DatePicker from 'react-native-date-picker';
import TextInputField from '../../Component/TextInputField';
import ThemeButton from '../../Component/ThemeButton';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyCheck: true,
      legalCheck: true,
      visibility: false,
      showDatePicker: false,
      mobileNumber: '',
      emailId: '',
      dateOfBirth: null,
      password: '',
      loader: false,
    };
    this.setDateInState = this.setDateInState.bind(this);
  }

  dateToUnix(dateSpace) {
    if (this.state.dateOfBirth == null || dateSpace == null) {
      return new Date();
    } else {
      var dateString = dateSpace; // Oct 23
      var dateParts = dateString.split('-');
      return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    }
  }

  maxDateTwelve() {
    return new Date(
      new Date().getFullYear() - 20,
      new Date().getMonth(),
      new Date().getDate(),
    );
  }

  setDateInState(value) {
    if (Platform.OS == 'android' && value == undefined) {
      this.setState({ showDatePicker: false });
    } else {
      var MyDate = value;
      var dateOfBirth = '';
      MyDate.setDate(MyDate.getDate());
      var tempoMonth = MyDate.getMonth() + 1;
      var tempoDate = MyDate.getDate();
      if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
      if (tempoDate < 10) tempoDate = '0' + tempoDate;
      dateOfBirth = tempoDate + '-' + tempoMonth + '-' + MyDate.getFullYear();
      this.setState({ dateOfBirth, showDatePicker: false });
    }
  }

  async onProceed() {
    // console.log(this.state.mobileNumber, ':', this.state.password, ':', this.state.emailId);
    // let FinalResponse = {
    //   mobileNumber: this.state.mobileNumber,
    // };
    //this.props.navigation.navigate('VerifyOtp',FinalResponse);
    //return;

    // check Not Blank
    if (this.state.mobileNumber == null) {
      ToastAndroid.showWithGravity(
        'Mobile number mandatory',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
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
    }

    // Not Start With Zero
    let zero = this.state.mobileNumber.startsWith('0');
    if (zero) {
      ToastAndroid.showWithGravity(
        'Mobile number should not start with a zero',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    if (this.state.emailId == null) {
      ToastAndroid.showWithGravity(
        'Email mandatory',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    // Valid Email
    let isEmail = Util.validEmail(this.state.emailId);
    if (!isEmail) {
      ToastAndroid.showWithGravity(
        'Email not valid!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }

    if (this.state.dateOfBirth == null) {
      ToastAndroid.showWithGravity(
        'Date Of Birth mandatory',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    if (this.state.password == null) {
      ToastAndroid.showWithGravity(
        'Password mandatory',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return;
    }

    this.sendCredentials();
  }

  sendCredentials() {
    this.setState({ loader: true });
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    var raw = JSON.stringify({
      email: `${this.state.emailId}`,
      contact: `${this.state.mobileNumber}`,
      password: `${this.state.password}`,
      dateofbirth: this.reformatDateString(`${this.state.dateOfBirth}`),
      isPolicyTerm: `${this.state.privacyCheck}`,
      isLegalAge: `${this.state.legalCheck}`,
      deviceInfo: 'vivo S1 pro',
      fcmToken: 'fcm token',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(`${BASE_URL}/auth/sign-up`, requestOptions)
      .then(result => result.json())
      .then(response => {
        console.log('getAuthenticateUser Action', response);
        if (response.response) {
          this.setState({ loader: false });
          let FinalResponse = {
            response: response.response,
            mobileNumber: this.state.mobileNumber,
          };
          // let MobileNumber = this.state.mobileNumber
          this.props.navigation.navigate('VerifyOtp', FinalResponse);
          return response;
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
        console.log('error', error);
        this.setState({ loader: false });
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  }

  reformatDateString = s => {
    var b = s.split(/\D/);
    return b.reverse().join('-');
  };
  render() {
    return (
      <SafeAreaView
        style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={ThemeColors.CLR_BG}
          barStyle={'dark-content'}
        />
        <View style={styles.container}>
          <View style={styles.createView}>
            <Text style={styles.createText}>Create an account</Text>
          </View>
          <View style={styles.viewInput}>
            <TextInputField
              placeholder="Mobile Number"
              iconName={'call'}
              onChangeText={text => {
                this.setState({ mobileNumber: text });
              }}
            />
            <TextInputField
              placeholder="Email Address"
              iconName={'mail'}
              onChangeText={text => {
                this.setState({ emailId: text });
              }}
            />

            <TouchableOpacity
              onPress={() => this.setState({ showDatePicker: true })}>
              <TextInputField
                placeholder="Date of Birth"
                iconName={'event-note'}
                value={this.state.dateOfBirth}
                editable={false}
              />
            </TouchableOpacity>

            <DatePicker
              modal
              mode={'date'}
              open={this.state.showDatePicker}
              date={new Date()}
              textColor={'#000'}
              onConfirm={date => {
                this.setDateInState(date);
              }}
              onCancel={() => {
                this.setState({ showDatePicker: false });
              }}
            />

            <TextInputField
              placeholder="Password"
              iconName={'lock'}
              onChangeText={text => {
                this.setState({ password: text });
              }}
              isPassword={true}
              visibility={true}
            />

            <View style={styles.term}>
              <View style={styles.termInner}>
                <TouchableOpacity
                  onPress={() =>
                    this.state.privacyCheck
                      ? this.setState({ privacyCheck: false })
                      : this.setState({ privacyCheck: true })
                  }>
                  <Icon
                    name={
                      this.state.privacyCheck
                        ? 'check-box'
                        : 'check-box-outline-blank'
                    }
                    size={20}
                    color="#309CFF"
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
                <Text style={styles.termText}>
                  {' '}
                  I agree with the{' '}
                  <Text
                    onPress={async () =>
                      await Linking.openURL('https://www.mobar.sg/p/terms')
                    }
                    style={styles.termWord}>
                    Terms
                  </Text>{' '}
                  and{' '}
                  <Text
                    onPress={async () =>
                      await Linking.openURL('https://mobar.sg/')
                    }
                    style={styles.termWord}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>

              <View style={styles.termInner}>
                <TouchableOpacity
                  onPress={() =>
                    this.state.legalCheck
                      ? this.setState({ legalCheck: false })
                      : this.setState({ legalCheck: true })
                  }>
                  <Icon
                    name={
                      this.state.legalCheck
                        ? 'check-box'
                        : 'check-box-outline-blank'
                    }
                    size={20}
                    color="#309CFF"
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
                <Text style={styles.termText}> I am of legal drinking age in Singapore </Text>
              </View>
            </View>

            <ThemeButton title={'Sign up'} isLoading={this.state.loader} onPress={() => this.onProceed()} />

            <View style={styles.signIn}>
              <Text style={styles.textMember}>I’m already a member, </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text
                  style={styles.signText}>
                  Sign in
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
  container: {
    flex: 1,
    backgroundColor: ThemeColors.CLR_BG,
  },
  createView: {
    marginTop: '15%',
    alignItems: 'center',
    marginRight: 8
  },
  createText: {
    fontSize: 32,
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    fontWeight: '500',
    fontFamily: FontFamily.TAJAWAL_LIGHT,
  },
  viewInput: {
    alignItems: 'center',
    marginTop: '10%',
  },
  imageStyle: {
    margin: 5,
  },
  term: {
    marginTop: '5%',
    marginRight: '10%',
    marginLeft: '7%'
  },
  termText: {
    fontFamily: FontFamily.TAJAWAL_LIGHT,
    fontWeight: '400',
    fontSize: 15,
    color: '#3C3C3C',
  },
  termWord: {
    color: '#751728'
  },
  textMember: {
    fontFamily: FontFamily.TAJAWAL_LIGHT,
    fontWeight: '700',
    fontSize: 18,
    color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR
  },
  termInner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  signIn: {
    marginTop: '10%',
    width: '80%',
    height: 44,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signText: {
    fontSize: 17,
    color: ThemeColors.CLR_ACTIVITY_INDICATOR,
    fontWeight: '700'
  }
});
