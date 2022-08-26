import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily } from '../Theme/FontFamily';
import { screenWidth } from '../Theme/Matrices';
import { ThemeColors } from '../Theme/ThemeColors';
import ThemeButton from './ThemeButton';

export default class TextInputField extends React.Component {
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
            error
        } = this.props
        return (
            <>
                {/* Input Icon */}
                <View style={[innerStyle.sectionStyle, innerStyle.shadowProp]}>
                    {this.props.iconName && <Icon
                        name={this.props.iconName}
                        size={22}
                        color="#741728"
                        style={[innerStyle.imageStyle, { marginLeft: 10 }]}
                    />
                    }
                    {/* Input box */}
                    <TextInput
                        style={innerStyle.container}
                        placeholder={this.props.placeholder}
                        underlineColorAndroid="transparent"
                        keyboardType={this.props.keyboardType}
                        onChangeText={this.props.onChangeText}
                        onChange={this.props.onChange}
                        placeholderTextColor={'#A39B9B'}
                        secureTextEntry={!this.state.visibility ? false : true}
                        value={this.props.value}
                        editable={editable}
                    />
                    {/* Password icon */}
                    {isPassword &&
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ visibility: !this.state.visibility })
                            }}>
                            <Icon
                                name={!this.state.visibility ? 'visibility' : 'visibility-off'}
                                size={22}
                                color="#A39B9B"
                                style={[innerStyle.imageStyle, { marginRight: 10 }]}
                            />
                        </TouchableOpacity>
                    }

                </View>
                {error &&
                    <View style={innerStyle.errorContainer}>
                        <Text style={innerStyle.errorText}>{error}</Text>
                    </View>
                }
            </>
        );
    }
}
const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
        color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '500',
        size: 17,
    },
    imageStyle: {
        margin: 5,
    },
    sectionStyle: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ThemeColors.CLR_WHITE,
        borderWidth: 0,
        borderColor: ThemeColors.CLR_WHITE,
        height: 44,
        width: 320,
        borderRadius: 10,
        margin: 10,
        // marginBottom: 0,
        elevation: 5,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    errorContainer: {
        // padding: 5,
        width: screenWidth(80),
    },
    errorText: {
        color: 'red'
    }
});
