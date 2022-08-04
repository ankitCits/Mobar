import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CustomText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: this.props.visibility
        }
    }

    render() {
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
                        placeholderTextColor={'#A39B9B'}
                        secureTextEntry={!this.state.visibility ? false : true}
                    />
                    {/* Password icon */}
                    {this.props.isPassword
                        && <TouchableOpacity
                            onPress={() =>
                                this.state.visibility
                                    ? this.setState({ visibility: false })
                                    : this.setState({ visibility: true })
                            }>
                            <Icon
                                name={!this.state.visibility ? 'visibility' : 'visibility-off'}
                                size={22}
                                color="#A39B9B"
                                style={[innerStyle.imageStyle, { marginRight: 10 }]}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </>
        );
    }
}
const innerStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        margin: 5,
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#000',
        height: 44,
        width: 320,
        borderRadius: 10,
        margin: 10,
        elevation: 3,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
});
