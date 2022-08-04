import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {A_KEY, BASE_URL} from '../../config';
import {getAccessToken} from '../../localstorage';
import HeaderSide from '../Component/HeaderSide';
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      currentPassword: null,
      password: null,
      confirmPassword: null,
      loader: false,
    };
  }

  onProceed = async () => {
    this.setState({loader: true});
    if (
      this.state.currentPassword == '' ||
      this.state.currentPassword == null
    ) {
      ToastAndroid.showWithGravity(
        'Current Password Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }

    if (this.state.password == '' || this.state.password == null) {
      ToastAndroid.showWithGravity(
        'Password Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }

    if (
      this.state.confirmPassword == '' ||
      this.state.confirmPassword == null
    ) {
      ToastAndroid.showWithGravity(
        'Confirm Password Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }

    if (this.state.confirmPassword != this.state.password) {
      ToastAndroid.showWithGravity(
        'Password & Confirm Password Should be Same Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }

    let token = await getAccessToken(token);
    console.log('=============>>>>>>>>>>>>>>>>>>>>>>>>>>,', token);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    var raw = JSON.stringify({
      currentPassword: this.state.currentPassword,
      newPassword: this.state.password,
      confirmNewPassword: this.state.confirmPassword,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/users/changePassword`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.response) {
          ToastAndroid.showWithGravity(
            'Password Successfully Changed.',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );

          this.setState({
            loader: false,
            currentPassword: null,
            password: null,
            confirmPassword: null,
          });
        }
        if (result.errors) {
          this.setState({loader: false});
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          loader: false,
        });
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };

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
        <HeaderSide
          name={'Change Password'}
          onClick={() => this.props.navigation.openDrawer()}
        />

        <View style={styles.ChangePasswordView}>
          <View style={{marginTop: 10}}>
            <View style={{marginLeft: 15}}>
              <Text style={styles.InputHeader}>Current Password</Text>
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={{flex: 1}}
                placeholder=""
                underlineColorAndroid="transparent"
                placeholderTextColor="#707273"
                onChangeText={text => {
                  this.setState({currentPassword: text});
                }}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <View style={{marginLeft: 15}}>
              <Text style={styles.InputHeader}>New Password</Text>
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={{flex: 1}}
                placeholder=""
                underlineColorAndroid="transparent"
                placeholderTextColor="#707273"
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({password: text});
                }}
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <View style={{marginLeft: 15}}>
              <Text style={styles.InputHeader}>Confirm New Password</Text>
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={{flex: 1}}
                placeholder=""
                underlineColorAndroid="transparent"
                placeholderTextColor="#707273"
                secureTextEntry={this.state.visibility ? false : true}
                onChangeText={text => {
                  this.setState({confirmPassword: text});
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
                  size={20}
                  color="#A39B9B"
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginTop: '10%', marginBottom: 10}}>
            <TouchableOpacity
              style={styles.save}
              // onPress={()=>this.props.navigation.navigate('MyBottomTabs')}
              onPress={() => this.onProceed()}>
              {this.state.loader ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{color: '#fff', fontSize: 15}}>
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
  ChangePasswordView: {
    height: 300,
    width: '94%',
    marginTop: '10%',
    // alignItems:'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: 300,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#7B7B7B',
    height: 44,
    width: 320,
    borderRadius: 5,
    margin: 10,
    // marginTop:5,
    // elevation: 5,
  },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  InputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
});
