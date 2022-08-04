import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class HeaderSide extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: 60,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
        }}>
        <View style={{margin: 12, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.props.onClick()}>
            <Icon name="arrow-back" size={28} color="#4D4F50" />
          </TouchableOpacity>

          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 20, color: '#4D4F50', fontWeight: '500'}}>
              {this.props.name}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
