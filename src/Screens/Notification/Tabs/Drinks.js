import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import Notifications from '../../../Component/Notifications';
import { FontFamily } from '../../../Theme/FontFamily';
import { ThemeColors } from '../../../Theme/ThemeColors';
export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("Drink > prop name",this.props.data);
  }

  renderNotifications=(item,index)=>{
    return (
      <Notifications data={item} index={index} />
    )
  }

  render() {
    return (
      <SafeAreaView
        style={styles.container}>
        <>
        <View
            style={styles.title}>
            <Text
              style={styles.titleText}>
              Drinks
            </Text>
          </View>

          <FlatList
            data={this.props.data}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => this.renderNotifications(item, index)}
          />
        </>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.CLR_BG,
  },
  title: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  }, titleText: {
    fontStyle: FontFamily.TAJAWAL_REGULAR,
    fontSize: 20,
    fontWeight: '500',
    color: '#4D4F50',
  }
});
