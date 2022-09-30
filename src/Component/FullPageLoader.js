import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemeColors } from '../Theme/ThemeColors'
export default class FullPageLoader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={innerStyle.container}>
        <ActivityIndicator size="large" color="#741728" />
      </View>
    );
  }
}
const innerStyle = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.CLR_WHITE,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.3,
    top: 0,
    justifyContent: "space-around",
  },
});
