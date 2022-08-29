import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
import MyTabs from './Tabs';
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <HeaderSide
          name={'Notification'}
          onClick={() => this.props.navigation.pop()}
        />
        <>
          <View style={{ flex: 1, marginTop: 0 }}>
            <MyTabs />
          </View>
        </>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
