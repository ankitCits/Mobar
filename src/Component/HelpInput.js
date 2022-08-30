import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FontFamily } from '../Theme/FontFamily';
import { screenWidth } from '../Theme/Matrices';
import { ThemeColors } from '../Theme/ThemeColors';

export default class HelpInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: this.props.visibility
        }
    }

    render() {
        const {
            editable = true,
            isPassword = false,
            isButton,
            error
        } = this.props
        return (
            <>
                {/* Input Icon */}
                <View style={this.props.multiline ? styles.sectionStyleDes : styles.sectionStyle}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={ThemeColors.CLR_DARK_GREY}
                        multiline={this.props.multiline}
                        numberOfLines={1}
                        keyboardType={this.props.keyboardType}
                        onChangeText={this.props.onChangeText}
                        onChange={this.props.onChange}
                        value={this.props.value}
                    />
                </View>
                {error &&
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    sectionStyle: {
        flexDirection: 'row',
        backgroundColor: ThemeColors.CLR_WHITE,
        borderWidth: 0,
        borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        height: 48,
        width: 324,
        borderRadius: 5,
        margin: 10,
        elevation: 4,
    },
    sectionStyleDes: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: ThemeColors.CLR_WHITE,
        borderWidth: 0,
        borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        height: 112,
        width: 324,
        borderRadius: 5,
        margin: 10,
        elevation: 4,
    },
    inputText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '400',
        fontSize: 15,
        flex: 1,
        padding: 10,
        color: ThemeColors.CLR_DARK_GREY
    },
    errorContainer: {
        width: screenWidth(80),
        marginLeft: 15,
    },
    errorText: {
        color: 'red',
    },
});
