import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import images from '../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const LoginButton = ({title, customHeigth, customWidth, props}) => {
  const navigation = useNavigation();

  return (
    <View style={innerStyle.emptyContainer}>
      <TouchableOpacity
        style={innerStyle.button}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={innerStyle.emptyText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const innerStyle = StyleSheet.create({
  emptyContainer: {
    // flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    // paddingTop: 10,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    color: '#fff',
  },
  button: {
    borderWidth: 1,
    // alignItems:'center'
    padding: 7.5,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
    backgroundColor: '#711323',
  },
});

export default LoginButton;
