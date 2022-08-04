import React, {Component} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import images from '../../assets/images';
export default class ForgetEnterPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

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
        <ScrollView>
          <View style={{marginLeft: 10}}>
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
              source={images.forgot3}
              defaultSource={images.forgot3}
            />
          </View>
          <View style={styles.createView}>
            <Text style={styles.createText}>Create a New Password</Text>
          </View>
          <View style={styles.viewInput}>
            <View style={styles.sectionStyle}>
              <TextInput
                style={{flex: 1,padding:10}}
                placeholder="New Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#828282"
              />
            </View>

            <View style={styles.sectionStyle}>
              <TextInput
                style={{flex: 1,padding:10}}
                placeholder="Confirm Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#828282"
              />
            </View>

            <View style={styles.signup}>
              <TouchableOpacity
                style={styles.signupInner}
                onPress={() =>
                  this.props.navigation.navigate('passwordSuccessFullyChanged')
                }>
                <Text
                  style={{color: '#BE212F', fontSize: 18, fontWeight: '700'}}>
                  CREATE
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signin}>
              <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Text
                  style={{fontSize: 17, color: '#969696', fontWeight: '400'}}>
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
    marginTop: '10%',
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
});
