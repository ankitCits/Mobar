import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Notifications from '../../../Component/Notifications';
import { FontFamily } from '../../../Theme/FontFamily';
import { ThemeColors } from '../../../Theme/ThemeColors';
export default class AllNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderNotifications = (item, index) => {
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
              All Notifications
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
