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
import images from '../../assets/images';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          //   flex: 1,
          margin: 15,
          flexDirection: 'row',
          // justifyContent: 'center',
        }}>
        <View
          style={{
            width: '75%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => this.props.onClick()}>
            <Icon name={this.props.IconName} size={35} color={this.props.IconColor} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Icon name="location-on" size={18} color="#4D4F50" />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 13,
                fontWeight: '500',
                color: '#000',
              }}>
              {this.props.Address ? this.props.Address : '' }
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '25%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => this.props.onCard()}>
          <Image
              resizeMode={'cover'}
              source={images.cardBlank}
              defaultSource={images.cardBlank}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onNotification()}>
          <Image
              resizeMode={'cover'}
              source={images.notifiction}
              defaultSource={images.notifiction}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
