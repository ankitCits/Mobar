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
import { FontFamily } from '../Theme/FontFamily';
import StarRating from './StarRatings';
class BarCard extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.props.navigation.navigate('BarList')}
                    style={innerStyle.container}>
                    <ImageBackground
                        style={innerStyle.promotionsImg}
                        source={{
                            uri: `${this.props.hostUrl + this.props.item.images}`,
                        }}>
                        <View style={innerStyle.heartContainer}>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'flex-end',
                                }}>
                                <Image
                                    resizeMode={'cover'}
                                    source={images.heart}
                                    defaultSource={images.heart}
                                />
                            </TouchableOpacity>
                            <View
                                  style={innerStyle.off}>
                                <Text
                                    style={{color: '#FFFFFF'}}>
                                    50% Off
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View
                     style={innerStyle.addressContainer}>
                        <Text
                            style={innerStyle.textTitle}>
                            {this.props.item.vendorShopName}
                        </Text>
                        <View>
                            <Text style={innerStyle.textAddress}>{this.props.item.address}</Text>
                        </View>
                        <View style={innerStyle.footer}>
                            <TouchableOpacity
                                style={innerStyle.details}>
                                <View style={{marginLeft:18}}>
                                    <StarRating isEdit={true} size={5} />
                                </View>
                                {/* <Icon
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
                                /> */}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={innerStyle.distanceContainer}>
                                <Icon
                                    name="directions-run"
                                    size={16}
                                    color="#FFFFFF"
                                    style={{ marginTop: 2 }}
                                />
                                <Text style={innerStyle.textAddress}>
                                    {this.props.item.distance.toFixed(2)}Km
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={innerStyle.openLink}>
                                <Icon
                                    name="fiber-manual-record"
                                    size={15}
                                    color="#26B90E"
                                    style={{ marginTop: 2 }}
                                />
                                <Text style={innerStyle.openText}>
                                    open
                                </Text>
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
        marginTop: 20,
        backgroundColor: '#8A87AC',
        alignSelf: 'center',
        margin: 10,    
    },
    off:{
        marginTop: 20,
        backgroundColor: '#26B90E',
        width: 68,
        height: 20,
        alignItems: 'center',
        borderRadius:10
    },
    textTitle:{
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '400',
        fontFamily:FontFamily.ROBOTO,
        marginBottom:5
    }, 
    addressContainer:{
        margin: 20,
    },
    heartContainer:{
        marginTop: '3%', 
        marginRight: '7%',
        fontSize:15
    },
    textAddress:{
        flexDirection:'row',
        fontFamily:FontFamily.ROBOTO,
        fontSize:13,
        fontWeight:'400',
        color:'#FFFFFF'
    },
    footer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    distanceContainer:{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    details:{
        marginTop: 10,
        marginLeft: -53,
        flexDirection: 'row',
    },
    openText:{
        fontFamily:FontFamily.TAJAWAL_BLACK,
        fontSize:15,
        fontWeight:'500',
        color:'#FFFFFF'
    },
    openLink:{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    promotionsImg: {
        width: 350,
        height: 223,
    },
});
