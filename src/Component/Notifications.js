import moment from 'moment';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../assets/images';
import { FontFamily } from '../Theme/FontFamily';

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("Notification > prop name", this.props.data);
  }

  render() {
    return (
      <>
        <View style={styles.container} key={this.props.index}>
          <View style={styles.header} key={this.props.index}>
            <Text style={styles.title}>{moment(this.props.data.createDate).format('DD-MM-YYYY')}</Text>
          </View>
          <View
            style={styles.body}>
              <View
              style={{
                flexDirection:'row',
                marginRight:5,
              }}
              >
              <Icon
                name={'check-circle'}
                size={25}
                color="#4FEA36" />
                </View>
            <View
              style={styles.notificationBox}>
              <Image
                resizeMode={'cover'}
                source={images.notification1}
                defaultSource={images.defaultCombo}
              />
              <ImageBackground
                style={styles.productImg2}
                resizeMode={'cover'}
                source={images.notification2}
                defaultSource={images.defaultCombo}>
                <View
                  style={styles.notificationBoxDetails}>
                  <Text
                    style={[styles.title, styles.titleColor]}>
                    {this.props.data.title}
                  </Text>

                  <TouchableOpacity
                  style={{
                    marginBottom:0
                  }}
                  >
                    <Icon
                      name={'close'}
                      size={20}
                      color="#969696"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.details}>
                  <Text style={styles.detailsText}>
                    {this.props.data.notification}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </>
    );
  }

}

const styles = StyleSheet.create({
  productImg2: {
    right: '18%',
    //height: 117,
    width: 300,
  },
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginHorizontal: 25,
  },
  header: {
    margin: '4%',
    //marginBottom:0
  },
  title: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '500',
    fontSize: 15,
    color: '#A1A1A1',
  },
  body: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  notificationBox: {
    flexDirection: 'row',
    margin: 5,
    width:320,
  },
  notificationBoxDetails: {
    marginHorizontal: 10,
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleColor: {
    color: '#4D4F50',
  },
  details: {
    marginHorizontal: '4%',
    width:300,
    marginBottom: '4%'
  },
  detailsText: {
    width:250,
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: '#969696',
    fontSize: 15,
    fontWeight: '400'
  }

});