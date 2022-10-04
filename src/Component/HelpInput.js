import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FontFamily } from '../Theme/FontFamily';
import { screenWidth } from '../Theme/Matrices';
import { ThemeColors } from '../Theme/ThemeColors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HelpInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: this.props.visibility
        }
    }

    render() {
        const {
            page,
            error,
            icon
        } = this.props
        return (
            <>
                <View style={[this.props.multiline ? styles.sectionStyleDes : styles.sectionStyle, page == 'Profile' ? styles.isProfile : '']}>
                    {page == 'Profile' ?
                        <Icon
                            name={icon}
                            size={20}
                            color="#AEAEAF"
                            style={styles.imageStyle}
                        /> : null
                    }
                    <TextInput
                        style={[page == 'Profile' ? styles.profileText : styles.inputText]}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={ThemeColors.CLR_DARK_GREY}
                        multiline={this.props.multiline}
                        numberOfLines={3}
                        keyboardType={this.props.keyboardType}
                        onChangeText={this.props.onChangeText}
                        onChange={this.props.onChange}
                        value={this.props.value}
                    />
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    sectionStyle: {
        flexDirection: 'row',
        backgroundColor: ThemeColors.CLR_WHITE,
        borderWidth: 0,
        borderRadius: 5,
        borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        height: 48,
        width: 324,
        zIndex: 1,
        margin: 10,
        elevation: 4,
    },
    isProfile: {
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        paddingLeft: 10,
        borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    },
    profileText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontSize: 18,
        fontWeight: '500',
        color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        marginLeft: 5,
        width: "100%",
    },
    sectionStyleDes: {
        flexDirection: 'row',
        backgroundColor: 'red',
        backgroundColor: ThemeColors.CLR_WHITE,
        borderWidth: 0,
        borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        width: 324,
        borderRadius: 5,
        margin: 10,
        zIndex: 1,
        elevation: 4,
    },
    inputText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '400',
        fontSize: 15,
        flex: 1,
        padding: 10,
        color: ThemeColors.CLR_DARK_GREY,

    },
    errorContainer: {
        width: screenWidth(80),
        marginLeft: 15,
        marginBottom: 5,

    },
    errorText: {
        color: 'red',
    },
});
