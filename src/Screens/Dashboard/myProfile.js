import React, {Component} from 'react';
import {Text, 
  View,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View style={{
          flex:1,
          margin:15
        }}>
          <Text>Profile</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  graphIcon: {
    height: 150,
    width: '100%',
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
  }
});