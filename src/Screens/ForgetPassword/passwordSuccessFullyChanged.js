import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import images from '../../assets/images';
export default class PasswordSuccessFullyChanged extends Component {
  constructor(props) {
    super(props);
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
          <View style={styles.createView}>
            <Text style={styles.createText}>Password Changed!</Text>
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
            <Text style={{ fontSize: 20, fontWeight: '400', color: '#000', textAlign: 'center' }}>
              You have changed your password Successfully !
            </Text>
          </View>
          <View style={styles.viewInput}>

            <View style={styles.signup}>
              <TouchableOpacity
                style={styles.signupInner}
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text
                  style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
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
});
