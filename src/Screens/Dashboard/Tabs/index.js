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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import Header from '../../Component/Header';
import { getAccessToken } from '../../../localstorage';
// import images from '../../assets/images';
// import MyTabs from './Tabs';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width + 40;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const data2 = [
  {
    id: 1,
    name: 'React JS',
    url: 'https://icon-library.com/images/react-icon/react-icon-29.jpg',
  },
  {
    id: 2,
    name: 'JavaScript',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png',
  },
  {
    id: 3,
    name: 'Node JS',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
  },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          // borderWidth: 1,
          // padding: 20,
          // borderRadius: 20,
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 10,
        }}>
        <Image source={images.Dashboard} />
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <>
          <View style={{ alignSelf: 'center', marginTop: -5 }}>
            <TouchableOpacity
              style={styles.sectionStyle}
              onPress={() => this.props.navigation.navigate('Product')}>
              <Icon
                name="search"
                size={28}
                color="#A39B9B"
                style={styles.imageStyle}
              />
              <TextInput
                style={{ flex: 1 }}
                placeholder="Search for Drinks..."
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
              <TouchableOpacity>
                <Icon
                  name={'filter-list'}
                  size={22}
                  color="#A39B9B"
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginTop: -15 }}>
            <View style={{ marginVertical: 10 }}>
              <Carousel
                data={data2}
                renderItem={this.renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
              />
            </View>
          </View>



          {/* <View style={{marginLeft: 20, marginTop: 10}}>
            <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
              Categories
            </Text>
          </View> */}
        </>
        {/* <View style={{flex: 1}}>
          <MyTabs />
        </View> */}
      </SafeAreaView>
    );
  }
}

// dispatcher functions
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

//getting props from redux
function mapStateToProps(state) {
  let redux = state;
  return { redux };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

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
  Dashboard: {
    height: 170,
    width: 375,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
});
