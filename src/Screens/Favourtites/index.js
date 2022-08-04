import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
import MyTabs from './Tabs';
export default class Favourites extends Component {
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
        <View
          style={{
            backgroundColor: '#fff',
            height: 60,
          }}>
          <View
            style={{margin: 12, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MyBottomTabs')}>
              {/* <Icon name="arrow-back" size={28} color="#4D4F50" /> */}
            </TouchableOpacity>

            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 20, color: '#4D4F50', fontWeight: '500'}}>
                Favourites
              </Text>
            </View>
          </View>
        </View>

        <View style={{alignSelf: 'center', marginTop: -5}}>
          <View style={styles.sectionStyle}>
            <Icon
              name="search"
              size={28}
              color="#A39B9B"
              style={styles.imageStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="Search for Drinks..."
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity>
              <Icon
                name={'filter-list'}
                size={22}
                color="#A39B9B"
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:1,marginTop:10}}>
          <MyTabs />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderWidth: 0,
    borderColor: '#000',
    height: 40,
    width: 360,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
  },
  imageStyle: {
    margin: 5,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});


