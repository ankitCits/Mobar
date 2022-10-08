import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import { changePassword } from '../../Redux/actions/product';
import { ThemeColors } from '../../Theme/ThemeColors';
import { FontFamily } from '../../Theme/FontFamily';
import HeaderSide from '../Component/HeaderSide';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showToaster } from '../../api/func';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      currentPassword: '',
      password: '',
      confirmPassword: '',
      // currentPassword: 'Ds@123456',
      // password: 'As@123456',
      // confirmPassword: 'As@123456',
      loader: false,
    };
  }

  onProceed = async () => {
    this.setState({loader: true});
    if (
      this.state.currentPassword == '' ||
      this.state.currentPassword == null
      
    ) {
      showToaster('Current Password Required!','TOP');
      this.setState({loader: false});
      return;
    }

    if (this.state.password == '' || this.state.password == null) {
      showToaster('Password Required!','TOP');
      this.setState({loader: false});
      return;
    }

    if (
      this.state.confirmPassword == '' ||
      this.state.confirmPassword == null
    ) {
      showToaster('Confirm Password Required!','TOP');
      this.setState({loader: false});
      return;
    }

    if (this.state.confirmPassword != this.state.password) {
      showToaster('Password & Confirm Password Should be Same Required!','TOP');
      this.setState({loader: false});
      return;
    }
    
    var raw = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.password,
      confirmNewPassword: this.state.confirmPassword,
    };

    try {
      const response = await changePassword(raw);
      console.log("response",response);
      if (response.status == 'SUCCESS') {
          this.props.navigation.navigate('PasswordChanged');
      }
      this.setState({
          loader: false,
          currentPassword: null,
          password: null,
          confirmPassword: null,
      });
    } catch (error) {
      console.log("Password > Update PAssword > error",error);
      this.setState({
        loader: false,
        currentPassword: null,
        password: null,
        confirmPassword: null,
    });
    }
  };

  render() {
    return (
      <SafeAreaView
        style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={'dark-content'}
        />
        <HeaderSide
          name={'Change Password'}
          onClick={() => this.props.navigation.openDrawer()}
        />

        <View style={styles.ChangePasswordView}>
          <View style={styles.passwordContainer}>
            <View style={styles.passwordSubContainer}>
              <Text style={styles.InputHeader}>Current Password</Text>
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.textInput}
                placeholder=""
                underlineColorAndroid="transparent"
                placeholderTextColor="#707273"
                value={this.state.currentPassword}
                onChangeText={text => {
                  this.setState({currentPassword: text});
                }}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View>
            <View style={styles.passwordSubContainer}>
              <Text style={styles.InputHeader}>New Password</Text>
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.textInput}
                placeholder=""
                underlineColorAndroid="transparent"
                placeholderTextColor="#707273"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={text => {
                  this.setState({password: text});
                }}
              />
            </View>
          </View>

          <View>
            <View style={styles.passwordSubContainer}>
              <Text style={styles.InputHeader}>Confirm New Password</Text>
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={[styles.textInput,styles.container]}
                placeholder=""
                underlineColorAndroid="transparent"
                placeholderTextColor="#707273"
                secureTextEntry={this.state.visibility ? false : true}
                value={this.state.confirmPassword}
                onChangeText={text => { this.setState({confirmPassword: text});}}
              />
              <TouchableOpacity
                onPress={() => this.state.visibility
                    ? this.setState({visibility: false})
                    : this.setState({visibility: true})
                }>
                <Icon
                  name={this.state.visibility ? 'visibility' : 'visibility-off'}
                  size={20}
                  color="#707203"
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.save}
              onPress={() => this.onProceed()}>
              {this.state.loader ? (
                <ActivityIndicator size="small" color={ThemeColors.CLR_WHITE} />
              ) : (
                <Text style={styles.btnText}>
                  CHANGE PASSWORD
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// dispatcher functions
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

//getting props from redux
function mapStateToProps(state) {
  let redux = state;
  return {redux};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: ThemeColors.CLR_WHITE
  },
  ChangePasswordView: {
    width: '94%',
    marginTop: '13%',
    alignSelf: 'center',
    backgroundColor: ThemeColors.CLR_WHITE,
    height: 345,
    borderRadius:10,
    shadowColor:  ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 7,
  },
  passwordContainer:{
    marginTop: 20
  },
  
  passwordSubContainer:{
    marginLeft: 15
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#BCBCBC',
    height: 40,
    width: 320,
    borderRadius: 5,
    margin: 10,
  },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  InputHeader: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    color:'#B3B3B3'
  },
  textInput:{
    fontSize: 15,
    fontWeight: '400',
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    color:'#707273',
    width:"95%"
  },
  btnContainer:{
    marginTop: '35%'
  },
  btnText:{
    fontSize: 18,
    fontWeight: '700',
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    color:ThemeColors.CLR_WHITE
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
});
