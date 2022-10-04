import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import images from '../assets/images'
const NoContentFound = ({ title, customHeigth, customWidth }) => (
  <View style={innerStyle.emptyContainer}>
    <Image
      source={images.noContentFound}
      style={{ height: customHeigth ? customHeigth : 100, width: customWidth ? customWidth : 100 }}
    />
    <Text style={innerStyle.emptyText}>{title}</Text>
  </View>
)
const innerStyle = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 18,
    paddingTop: 10,
    fontFamily: 'Poppins-Medium'
  }
})

export default NoContentFound
