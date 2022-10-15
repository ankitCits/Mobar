import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import images from '../assets/images';
import LinearGradient from 'react-native-linear-gradient';
class ComboOfferCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: [
                { color: ['#fff', '#FFC599', '#FFAE57'] },
                { color: ['#fff', '#C599FF', '#E957FF'] },
                { color: ['#fff', '#FFFF99', '#F8FF57'] },
                { color: ['#fff', '#FF9999', '#FF5757'] },
            ]
        }
    }
    // https://mycolor.space/gradient3?ori=to+right+top&hex=%23D16BA5&hex2=%2386A8E7&hex3=%235FFBF1&submit=submit
    render() {
        const {
            item,
            hostUrl,
            index
        } = this.props;
        const currColor = this.state.colors[index % 4]
        return (
            <>
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        this.props.navigation.navigate('ComboDetails', { comboId: item.comboId })
                    }}
                    style={{
                        marginTop: 28,
                        marginRight: 10,
                        marginHorizontal: 10,
                        marginBottom: 30,
                    }}>
                    {/* <ImageBackground
                        style={{ alignSelf: 'center', }}
                        resizeMode={'cover'}
                        source={images.combo}
                        defaultSource={images.combo}
                    > */}
                    <LinearGradient colors={currColor.color}>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <View style={{
                                marginTop: 20,
                            }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 10
                                    }}>
                                    <Image
                                        resizeMode={'cover'}
                                        source={images.king}
                                        defaultSource={images.king}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 14,
                                            fontWeight: '400',
                                            color: '#4D4F50',
                                        }}>
                                        Top of the week
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        margin: 10,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: '500',
                                            color: '#4D4F50',
                                        }}>
                                        {item.name}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        marginLeft: 10,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: '500',
                                            color: '#4D4F50',
                                        }}>
                                        ${item.comboPrice}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        marginLeft: 10,
                                        marginTop: 10,
                                        right: 5,
                                    }}>
                                    <Image
                                        resizeMode={'cover'}
                                        source={images.Fivestar}
                                        defaultSource={images.Fivestar}
                                    />
                                </View>

                            </View>

                            <View>
                                {item.images == '' || item.images == null ? (
                                    <Image
                                        resizeMode={'cover'}
                                        source={images.MixCombo}
                                        defaultSource={images.MixCombo}
                                        style={{
                                            width: 200,
                                            height: 160,
                                        }}
                                    />
                                ) : (
                                    <Image
                                        resizeMode={'cover'}
                                        source={{
                                            uri: `${hostUrl + item.images}`,
                                        }}
                                        style={{
                                            width: 180,
                                            height: 160,
                                        }}
                                    />
                                )}
                            </View>
                        </View>
                    </LinearGradient>
                    {/* </ImageBackground> */}

                </TouchableOpacity>
            </>
        );
    }
}
export default ComboOfferCard;
