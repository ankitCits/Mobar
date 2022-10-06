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
  Linking,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import HeaderSide from '../Component/HeaderSide';
export default class About extends Component {
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
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={'dark-content'}
        />
        <HeaderSide
          name={'About'}
          onClick={() => this.props.navigation.openDrawer()}
        />
        <ScrollView>
          <View>
            <View style={styles.helpBottom}>
              <TouchableOpacity
                style={styles.helpBottomList}
                onPress={async () =>
                  this.props.navigation.navigate('Info',{title:'About Us'})
                  //await Linking.openURL('https://www.mobar.sg/p/About-Us')
                }>
                <Text style={styles.helpBottomListText}>About Mybar</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color="#424242"
                  style={styles.imageStyle}
                />
              </TouchableOpacity>

              <View style={styles.underLine} />

              <TouchableOpacity
                style={styles.helpBottomList}
                onPress={async () =>
                  this.props.navigation.navigate('Info',{title:'Privacy Policy'})
                  //await Linking.openURL('https://www.mobar.sg')
                }>
                <Text style={styles.helpBottomListText}>Privacy Policy</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color="#424242"
                  style={styles.imageStyle}
                />
              </TouchableOpacity>

              <View style={styles.underLine} />

              <TouchableOpacity
                style={styles.helpBottomList}
                onPress={async () =>
                  this.props.navigation.navigate('Info',{title:'Term & Condition'})
                  //await Linking.openURL('https://www.mobar.sg/p/terms')
                }>
                <Text style={styles.helpBottomListText}>
                  Terms & Conditions
                </Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color="#424242"
                  style={styles.imageStyle}
                />
              </TouchableOpacity>

              <View style={styles.underLine} />

              <View style={styles.helpBottomListVersion}>
                <Text style={styles.helpBottomListTextVersion}>
                  App Version
                </Text>
                <Text>1.0.0</Text>
              </View>

              <View style={styles.underLine} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  helpBottom: {
    width: '94%',
    marginTop: '10%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: '20%',
    borderRadius: 10,
  },
  helpBottomList: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helpBottomListVersion: {
    margin: 16,
  },
  helpBottomListText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#4D4F50',
  },
  helpBottomListTextVersion: {
    fontSize: 16,
    color: '#4D4F50',
  },
  underLine: {
    backgroundColor: '#DADADA',
    height: 1,
  },
});
