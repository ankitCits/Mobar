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
export default class passwordSuccessFullyChanged extends Component {
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
          <View style={styles.createView}>
            <Text style={styles.createText}>Password Changed !</Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              marginTop: '10%',
            }}>
            <Image
              resizeMode={'cover'}
              source={images.forgot4}
              defaultSource={images.forgot4}
            />
          </View>
          <View style={styles.emailView}>
            <Text style={{fontSize: 20, fontWeight: '400', color: '#000',textAlign:'center'}}>
            You have changed your password Successfully !
            </Text>
          </View>
          <View style={styles.viewInput}>

            <View style={styles.signup}>
              <TouchableOpacity
                style={styles.signupInner}
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text
                  style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>
                  LOGIN
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
    marginTop: '10%',
    alignItems: 'center',
  },
  otpView: {
    marginTop: '5%',
    alignItems: 'center',
  },
  createText: {
    fontSize: 25,
    color: '#7C7C7C',
    fontWeight: '500',
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
    backgroundColor: '#AF1731',
    height: 41,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 300,
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
