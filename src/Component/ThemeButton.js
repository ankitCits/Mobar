import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from 'react-native-reanimated';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';

export default class ThemeButton extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={innerStyle.btnContainer}>
                <TouchableOpacity
                    style={[innerStyle.container, this.props.isDisabled ? innerStyle.disabled : innerStyle.enable]}
                    onPress={this.props.onPress}
                    disabled={this.props.isDisabled}
                >
                    {this.props.isLoading ?
                        (
                            <ActivityIndicator size="small" color="#ffffff" />
                        )
                        :
                        (
                            <Text
                                style={innerStyle.title}>
                                {this.props.title}
                            </Text>
                        )
                    }
                </TouchableOpacity>
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
        height: 44,
        borderRadius: 10,
    },
    disabled: {
        backgroundColor: '#969696',
    },
    enable: {
        backgroundColor: '#711323FC'
    },
    title: {
        color: ThemeColors.CLR_WHITE,
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '700',
        fontSize: 23,
    }
});
