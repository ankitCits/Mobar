import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import images from '../assets/images';
class ComboOfferCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            item,
            hostUrl,
            navigation,
            index
        } = this.props
        return (
            <>
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        navigation.navigate('Product', { categoryIdx: { key: 3 } })
                    }}
                    style={{
                        marginTop: 28,
                        marginBottom: 30,
                    }}>
                    <ImageBackground
                        style={{ alignSelf: 'center', }}
                        resizeMode={'cover'}
                        source={images.combo}
                        defaultSource={images.combo}
                    >
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
                    </ImageBackground>

                </TouchableOpacity>
            </>
        );
    }
}
export default ComboOfferCard;
const styles = StyleSheet.create({

});
