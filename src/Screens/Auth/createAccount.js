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
  ToastAndroid,
  Linking,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Util from '../../utils';
import { A_KEY, BASE_URL, MY_HEADER } from '../../config';
import DatePicker from 'react-native-date-picker';
import TextInputField from '../../Component/TextInputField';
import ThemeButton from '../../Component/ThemeButton';
import { FontFamily } from '../../Theme/FontFamily';
export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyCheck: true,
      legalCheck: true,
      visibility: false,
      showDatePicker: false,
      mobileNumber: null,
      emailId: null,
      dateOfBirth: null,
      password: null,
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
    console.log(this.state.mobileNumber, ':', this.state.password);
    
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
    console.log(isEmail);
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
    this.props.navigation.navigate('VerifyOtp', FinalResponse);
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
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}>
        <StatusBar
          animated={true}
          backgroundColor="#E5E5E5"
          barStyle={'dark-content'}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.createView}>
            <Text style={styles.createText}>Create an account</Text>
          </View>
          <View style={styles.viewInput}>
            <View style={styles.sectionStyle}>

              <TextInputField
                placeholder="Mobile Number"
                iconName={'call'}
                onChangeText={text => {
                  this.setState({ mobileNumber: text });
                }}
                isPassword={false}
                visibility={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInputField
                placeholder="Email Address"
                iconName={'mail'}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                isPassword={false}
                visibility={false}
              />

            </View>

            <TouchableOpacity
              onPress={() => this.setState({ showDatePicker: true })}>
              <View style={styles.sectionStyle}>
                <Icon
                  name="event-note"
                  size={22}
                  color="#741728"
                  style={styles.imageStyle}
                />
                <TextInput
                  style={{
                    flex: 1,
                    // color:
                    // this.state.dateOfBirth == null ? '#A39B9B' : '#741728',
                  }}
                  placeholder="Date of Birth"
                  placeholderTextColor="#A39B9B"
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                  value={this.state.dateOfBirth}
                />
              </View>
            </TouchableOpacity>

            <DatePicker
              modal
              mode={'date'}
              open={this.state.showDatePicker}
              date={new Date()}
              onConfirm={date => {
                console.log('=====>>>', date);
                // this.setState({dateofbirth:date})
                this.setDateInState(date);
              }}
              onCancel={() => {
                this.setState({ showDatePicker: false });
              }}
            />

            {/* {this.state.showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.dateToUnix(this.state.dateOfBirth)}
                mode={'date'}
                maximumDate={this.maxDateTwelve()}
                onChange={(event, value) => {
                  this.setDateInState(event, value);
                }}
              />
            )} */}
            <View style={styles.sectionStyle}>
              {/* <Icon
                name="lock"
                size={22}
                color="#741728"
                style={styles.imageStyle}
              />
              <TextInput
                style={{
                  flex: 1,
                  // color: this.state.password == null ? '#A39B9B' : '#741728',
                }}
                placeholder="Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#A39B9B"
                secureTextEntry={this.state.visibility ? false : true}
                onChangeText={text => {
                  this.setState({password: text});
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  this.state.visibility
                    ? this.setState({visibility: false})
                    : this.setState({visibility: true})
                }>
                <Icon
                  name={this.state.visibility ? 'visibility' : 'visibility-off'}
                  size={22}
                  color="#A39B9B"
                  style={styles.imageStyle}
                /> </TouchableOpacity>
                */}
              <TextInputField
                placeholder="Password"
                iconName={'lock'}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
                isPassword={true}
                visibility={true}
              />

            </View>
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
                    style={{ color: '#751728' }}>
                    Terms
                  </Text>{' '}
                  and{' '}
                  <Text
                    onPress={async () =>
                      await Linking.openURL('https://mobar.sg/')
                    }
                    style={{ color: '#751728' }}>
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

            {/* <View style={styles.signup}>
              <TouchableOpacity
                style={styles.signupInner}
                onPress={() => this.onProceed()}>
                {this.state.loader ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
                    Sign up
                  </Text>
                )}
              </TouchableOpacity>
            </View> */}

            <ThemeButton title={'Sign Un'} isLoading={this.state.loader} />

            <View style={styles.signin}>
              <Text style={styles.textMember}>I’m already a member, </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text
                  style={{ fontSize: 17, color: '#741728', fontWeight: '700' }}>
                  {' '}
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
  createView: {
    marginTop: '15%',
    alignItems: 'center',
    marginRight: 8
  },
  createText: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '500',
    fontFamily: FontFamily.TAJAWAL_LIGHT,
  },
  viewInput: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
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
    marginTop: '5%',
    marginRight: '10%',
    marginLeft: '7%'
  },
  termText: {
    fontFamily: FontFamily.TAJAWAL_LIGHT,
    fontWeight: '400',
    fontSize: 15,
    color: '#3C3C3C',
    alignContent: 'flex-start'
  },
  textMember: {
    fontFamily: FontFamily.TAJAWAL_LIGHT,
    fontWeight: '700',
    fontSize: 18,
    color: '#000000'
  },
  termInner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  signin: {
    marginTop: '10%',
    width: '80%',
    height: 44,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
