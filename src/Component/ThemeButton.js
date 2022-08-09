import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontFamily } from '../Theme/FontFamily';

export default class ThemeButton extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={innerStyle.btnContainer}>
                {this.props.isLoading ?
                    (<ActivityIndicator size="large" color="#741728" />)
                    :
                    (<TouchableOpacity
                        style={innerStyle.container}
                        onPress={this.props.onPress}>
                        <Text
                            style={innerStyle.title}>
                            {this.props.title}
                        </Text>
                    </TouchableOpacity>)
                }

            </View>
        );
    }
}
const innerStyle = StyleSheet.create({
    btnContainer: {
        marginTop: '10%',
        width: '80%',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#711323FC',
        height: 44,
        borderRadius: 10,
    },
    title: {
        color: '#FFFFFF',
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '700',
        fontSize: 23,
    }
});
