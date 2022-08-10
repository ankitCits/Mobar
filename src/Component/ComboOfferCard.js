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
                        navigation.navigate('Product');
                    }}
                    style={{
                        marginTop: 28,
                        marginBottom: 30,
                        marginLeft: 10,
                    }}>


                    <ImageBackground
                        key={index}
                        style={{ alignSelf: 'center', }}
                        resizeMode={'cover'}
                        source={images.combo}
                        defaultSource={images.combo}
                    >
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 20,
                            }}>
                            <View style={{
                                marginTop: 20,
                            }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Image
                                        key={index}
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
                                        marginTop: 10,
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
                                        marginTop: 5,
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
                                        marginTop: 5,
                                        right: 5,
                                    }}>
                                    <Image
                                        key={index}
                                        resizeMode={'cover'}
                                        source={images.Fivestar}
                                        defaultSource={images.Fivestar}
                                    />
                                </View>

                            </View>

                            <View>
                                {item.images == '' || item.images == null ? (
                                    <Image
                                        key={index}
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
                                        key={index}
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
