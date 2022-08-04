import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default class ThemeFullPageLoader extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View
                style={innerStyle.container}>
                <ActivityIndicator size="large" color="#741728" />
            </View>
        );
    }
}
const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    }
});
