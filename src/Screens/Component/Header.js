import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
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
      <View style={styles.container}>

        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => this.props.onClick()}>
            <Icon name={this.props.IconName} size={35} color={this.props.IconColor} />
          </TouchableOpacity>
          <View
            style={styles.location}>
            <Icon name="location-on" size={18} color="#4D4F50" />
            <Text style={styles.address}>
              {this.props.Address ? this.props.Address : ''}
            </Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
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

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flexDirection: 'row',
  },
  leftContainer: {
    width: '75%',
    flexDirection: 'row',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  address: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: '500',
    color: '#3C3C3C',
    fontFamily: 'Roboto-Medium'
  },
  rightContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

});

