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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import { newPasswordChange } from '../../api/auth';
import { ThemeColors } from '../../Theme/ThemeColors';
import { FontFamily } from '../../Theme/FontFamily';
import TextInputField from '../../Component/TextInputField';
import { ActivityIndicator } from 'react-native-paper';
export default class ForgetEnterPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      passwordError:null,
      confirmPwdError:null,
      p_c_token: '',//this.props.route.params.response['password-create-token'],
      formError:null,
      loader: false,
    };
  }

  onPasswordChange = async () => {
    this.setState({ loader: true });
    this.validateField('newPassword');
    this.validateField('confirmPassword');
    if(this.state.passwordError == null && this.state.confirmPwdError == null){
      const data = {
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword,
        p_c_token: this.state.p_c_token
      }
      console.log("ForgotEnterPassword > onPasswordChange > PostData", data);
      try {
        const result = await newPasswordChange(data);
        this.setState({ loader: false });
        console.log("ForgotEnterPassword > onPasswordChange > response", result);
        this.setState({ loader: false,formError:null });
        this.props.navigation.navigate('PasswordSuccessFullyChanged');
      }
      catch (error) {
        console.log("ForgotEnterPassword > onPasswordChange > Catch", error);
        //this.props.navigation.navigate('PasswordSuccessFullyChanged');
        this.setState({ loader: false,formError:'Network Error!' });
      }
    }
   
  }

  handleUserInput = (name, value) => {
    console.log("Name And Value",name,value);
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  validateField = (fieldName) => {
    switch (fieldName) {
      case 'newPassword':
        if (this.state.newPassword == null || this.state.newPassword.trim() == '') {
          this.setState({ passwordError: '* Password mandatory', loader: false });
          return;
        }else{
          this.setState({ passwordError: null, loader: false });
        }  
        break;
      case 'confirmPassword':
        if (this.state.confirmPassword == null || this.state.confirmPassword.trim() == '') {
          this.setState({ confirmPwdError: '* Confirm Password mandatory', loader: false });
          return;
        }else{
          this.setState({ confirmPwdError: null, loader: false });
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
          backgroundColor={ThemeColors.CLR_BG}
          barStyle={'dark-content'}
        />
        <ScrollView>
          <View style={styles.back}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <Icon
                name="arrow-back"
                size={30}
                color={ThemeColors.CLR_DARK_GREY}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View
            style={styles.logo}>
            <Image
              resizeMode={'cover'}
              source={images.forgot3}
              defaultSource={images.forgot3}
            />
          </View>
          <View style={styles.createView}>
            <Text style={styles.createText}>Create a New Password</Text>
          </View>
          <View style={styles.viewInput}>
            <View style={styles.sectionStyle}>
              {/* <TextInput
                style={styles.input}
                placeholder="New Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#828282"
              /> */}
              <TextInputField
                placeholder="Password"
                iconName={'lock'}
                value={this.state.newPassword}
                // onChangeText={text => {
                //   this.setState({ newPassword: text });
                // }}
                isPassword={true}
                visibility={true}
                onChangeText={text => this.handleUserInput('newPassword', text)}
                error={this.state.passwordError}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInputField
                placeholder="Confirm Password"
                iconName={'lock'}
                value={this.state.confirmPassword}
                // onChangeText={text => {
                //   this.setState({ confirmPassword: text });
                // }}
                isPassword={true}
                visibility={true}
                onChangeText={text => this.handleUserInput('confirmPassword', text)}
                error={this.state.confirmPwdError}
              />
               {
              this.state.formError && <Text style={styles.errorText}>
                {this.state.formError}
              </Text>
            }
            </View>

            <View style={styles.signup}>
              <TouchableOpacity
                style={styles.signupInner}
                onPress={() => this.onPasswordChange()}>
                {this.state.loader ?
                  (
                    <ActivityIndicator size="small" color='#C11331' />
                  ) :
                  (<Text
                    style={styles.btnText}>
                    CREATE
                  </Text>)
                }
              </TouchableOpacity>
            </View>

            <View style={styles.cancel}>
              <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Text
                  style={styles.cancelText}>
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
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  back: { margin: 10 },
  logo: {
    alignSelf: 'center',
    marginTop: '14%',
  },
  createView: {
    marginTop: '10%',
    alignItems: 'center',
  },
  createText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 25,
    color: ThemeColors.CLR_DARK_GREY,
    fontWeight: '700',
  },
  viewInput: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 7,
    height: 55,
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 15,
    fontWeight: '500',
  },
  btnText: {
    color: '#BE212F',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  cancelText: {
    fontSize: 17,
    color: '#4D4F50',
    fontWeight: '500',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  sectionStyle: {
    //flexDirection: 'row',
    alignContent: 'center',
    height: 75,
    //width: 320,
  },
  imageStyle: {
    margin: 5,
  },
  signup: {
    marginTop: '13%',
    marginLeft:15,
    width: '80%',
    height: 44,
  },
  signupInner: {
    backgroundColor: 'transparent',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#C11331',
    width: 200,
    alignSelf: 'center',
    borderRadius: 20,
  },
  cancel: {
    marginTop: '7%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom:20,
  }
});
