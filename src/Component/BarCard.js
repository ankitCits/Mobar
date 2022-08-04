import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../assets/images';
class BarCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={innerStyle.container}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.props.navigation.navigate('BarList')}
                    style={{
                        marginTop: 20,
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity: 0.4,
                        shadowRadius: 15,
                        borderRadius: 15,
                        elevation: 5,
                        alignSelf: 'center',
                        width: 350,
                        margin: 10,
                    }}>
                    <ImageBackground
                        style={innerStyle.promotionsImg}
                        resizeMode={'cover'}
                        source={{
                            uri: `${this.props.hostUrl + this.props.item.images}`,
                        }}>
                        <View style={{ marginTop: '2%', marginRight: 10 }}>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'flex-end',
                                }}>
                                {/* <Icon name="favorite" size={28} color="#FF1405" /> */}
                                <Image
                                    resizeMode={'cover'}
                                    source={images.heart}
                                    defaultSource={images.heart}
                                />
                            </TouchableOpacity>

                            <View
                                style={{
                                    //   marginLeft:10,
                                    marginTop: 20,
                                    backgroundColor: '#26B90E',
                                    width: 68,
                                    height: 20,
                                    alignItems: 'center',
                                    //   borderRadius:10
                                    borderTopRightRadius: 8,
                                    borderBottomRightRadius: 8,
                                }}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        //   marginTop:2
                                    }}>
                                    50% Off
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View
                        style={{
                            margin: 15,
                        }}>
                        <Text
                            style={{
                                fontSize: 17,
                                color: '#3C3C3C',
                                fontWeight: '500',
                            }}>
                            {this.props.item.vendorShopName}
                        </Text>
                        <View
                            style={{
                                marginTop: 5,
                                // marginBottom: -10,
                                // alignSelf: 'flex-end',
                            }}>
                            <Text>{this.props.item.address}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '70%',
                                justifyContent: 'space-between',
                            }}>
                            <TouchableOpacity
                                style={{
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Icon
                                    name="directions-run"
                                    size={16}
                                    color="#808080"
                                    style={{ marginTop: 2 }}
                                />
                                <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>
                                    {this.props.item.distance.toFixed(2)}Km
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Icon
                                    name="fiber-manual-record"
                                    size={15}
                                    color="#26B90E"
                                    style={{ marginTop: 2 }}
                                />
                                <Text style={{ color: '#3C3C3C', marginLeft: 5 }}>
                                    open
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Icon
                                    name="star"
                                    size={16}
                                    color="#FAB914"
                                    style={{ marginTop: 2 }}
                                />
                                <Icon
                                    name="star"
                                    size={16}
                                    color="#FAB914"
                                    style={{ marginTop: 2 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
export default BarCard;
const innerStyle = StyleSheet.create({
    container: {
    },
    promotionsImg: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: 350,
        height: 223,
    },
});
