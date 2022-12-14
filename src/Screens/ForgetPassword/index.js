import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { retrieveAccount } from '../../api/auth';
import { showToaster } from '../../api/func';
import images from '../../assets/images';
import TextInputField from '../../Component/TextInputField';
import { A_KEY, BASE_URL } from '../../config';
import Util from '../../utils';
export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
      loader: false,
      mobileError: null,
      formError: null,

    };
  }

  onProceed = async () => {
    let zero = this.state.contact && this.state.contact.startsWith('0');
    if (this.state.contact == null || this.state.contact.trim() == '') {
      this.setState({ mobileError: '* Mobile number mandatory', loader: false });
      return;
    } else if (zero) {
      this.setState({ mobileError: '* Mobile number should not start with a zero', loader: false });
      return;
    } else if (!Util.validMobile(this.state.contact)) {
      this.setState({ mobileError: '* Mobile number not valid!', loader: false });
      return;
    } else {
      this.setState({ mobileError: null });
    }
    
    console.log(this.state.mobileError);
    this.setState({ loader: true });


    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);

    // try {
    //   const result = await retrieveAccount({
    //     contact: Number(this.state.contact),
    //   });
    //   console.log("ForgotPassword > OnProceed > response", result);
    //   this.setState({loader: false});
    //   const FinalResponse = {
    //     response: result.response,
    //   };
    //   console.log("ForgotPassword > Final Response",FinalResponse);
    //   this.props.navigation.navigate('forgetPasswordOtp', {response:FinalResponse,mobileNo:this.state.contact});
    // } catch (error) {
    //   this.setState({loader: false});
    //   console.log("ForgotPassword > OnProceed > Catch", error);
    // }
    var raw = JSON.stringify({
      contact: Number(this.state.contact),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(`${BASE_URL}/password/retrieveAccount`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({ loader: false });

        if (result.response) {
          this.setState({ loader: false });
          let FinalResponse = {
            response: result.response,
          };
          console.log("Forgot Password > Final Response", FinalResponse);
          this.props.navigation.navigate('forgetPasswordOtp', { response: FinalResponse, mobileNo: this.state.contact });
          return result;
        }

        if (result.errors) {
          this.setState({ formError: result.errors[0].msg, loader: false });
        }


      })
      .catch(error => {
        console.log('error', error);
        this.setState({ loader: false });
        showToaster(error,'TOP');
      });
  };



  handleUserInput = (name, value) => {
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }


  validateField = (fieldName) => {
    switch (fieldName) {
      case 'contact':
        let zero = this.state.contact && this.state.contact.startsWith('0');
        if (this.state.contact == null || this.state.contact.trim() == '') {
          this.setState({ mobileError: '* Mobile number mandatory', loader: false });
          return;
        } else if (zero) {
          this.setState({ mobileError: '* Mobile number should not start with a zero', loader: false });
          return;
        } else if (!Util.validMobile(this.state.contact)) {
          this.setState({ mobileError: '* Mobile number not valid!', loader: false });
          return;
        } else {
          this.setState({ mobileError: null });
        }
        break;
      default:
        break;
    }


  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
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
              source={images.forgot1}
              defaultSource={images.defaultImg}
            />
          </View>
          <View style={styles.createView}>
            <Text style={styles.createText}>Forgot your Password?</Text>
          </View>
          <View style={styles.emailView}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#969696' }}>
              Enter your registered mobile number to receive OTP
            </Text>
          </View>
          <View style={styles.viewInput}>
            {/* <View style={styles.sectionStyle}> */}
            {/* <TextInput
                style={{ flex: 1, padding: 10 }}
                placeholder="Mobile Number"
                underlineColorAndroid="transparent"
                placeholderTextColor="#A39B9B"
                keyboardType="numeric"
                value={this.state.contact}
                onChangeText={text => this.handleUserInput('contact', text)}
                error={this.state.mobileError}
              /> */}
            <TextInputField
              placeholder="Mobile Number"
              keyboardType="numeric"
              iconName={'call'}
              value={this.state.contact}
              onChangeText={text => this.handleUserInput('contact', text)}
              error={this.state.mobileError}
            />
            {/* </View> */}

            {
              this.state.formError && <Text style={styles.errorText}>
                {this.state.formError}
              </Text>
            }

            <View style={styles.signup}>
              <TouchableOpacity
                style={styles.signupInner}
                onPress={() =>
                  this.onProceed()
                }>
                {this.state.loader ? (
                  <ActivityIndicator size="small" color="#BE212F" />
                ) : (
                  <Text
                    style={{ color: '#BE212F', fontSize: 18, fontWeight: '700' }}>
                    SEND
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.signin}>
              <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Text
                  style={{ fontSize: 17, color: '#969696', fontWeight: '400' }}>
                  {' '}
                  Cancel
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
    marginTop: '5%',
    marginLeft: '5%',
    alignItems: 'center',
    width: '90%',
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
    // resizeMode: 'stretch',
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
    borderColor: '#C11331',
    width: 180,
    alignSelf: 'center',
    borderRadius: 20,
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
  errorText: {
    color: 'red',
    marginTop: 10
  }
});
