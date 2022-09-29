
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

export default class FullPageLoader extends React.Component {
    constructor(props) {
        super(props);
        console.log("Dimensions.get('window').width",Dimensions.get('window').width);
    }

    render() {
        return (
            <View style={[
            innerStyle.container, innerStyle.horizontal]}>
            <ActivityIndicator size="large" color="#741728" />
          </View>
            // <View style={{backgroundColor:'green'}}>
            //     <ActivityIndicator size="large" color="#741728" />
            // </View>
        );
    }
}
const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:'#fff',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      }
});
