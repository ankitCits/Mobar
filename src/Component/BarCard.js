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

    goToDetails = (item) => {
        console.log(item)
        this.props.navigation.navigate('ProductDetailBars', { 'id': item.vendorId });
    }

    render() {
        const {
            navigation,
            hostUrl,
            item,
            index
        } = this.props;
        return (
            <View>
                <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onPress={() => this.goToDetails(item)}
                    style={styles.container}>
                    <ImageBackground
                        style={styles.promotionsImg}
                        source={{
                            uri: `${hostUrl + item.images}`,
                        }}
                        defaultSource={images.promotions1}
                    >
                        <View style={styles.heartContainer}>
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
                            <View style={styles.off}>
                                <Text style={{ color: '#FFFFFF' }}>
                                    50% Off
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View
                        style={styles.addressContainer}>
                        <Text style={styles.textTitle}>
                            {item.vendorShopName}
                        </Text>
                        <View>
                            <Text style={styles.textAddress}>{item.address}</Text>
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.details}>
                                <StarRating isEdit={false} size={item.vendorRating} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.distanceContainer}>
                                <Icon
                                    name="directions-run"
                                    size={16}
                                    color="#FFFFFF"
                                    style={{ marginTop: 2 }}
                                />
                                <Text style={styles.textAddress}>
                                    {item.distance.toFixed(2)}Km
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.openLink}>
                                <Icon
                                    name="fiber-manual-record"
                                    size={15}
                                    color="#26B90E"
                                    style={{ marginTop: 2 }}
                                />
                                <Text style={styles.openText}>
                                    Open
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

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#8A87AC',
        margin: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    off: {
        marginTop: 20,
        backgroundColor: '#26B90E',
        width: 68,
        height: 20,
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    textTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '400',
        fontFamily: FontFamily.ROBOTO_REGULAR,
        // marginBottom: 5
    },
    addressContainer: {
        margin: 12,
    },
    heartContainer: {
        marginTop: '3%',
        marginRight: '7%',
        fontSize: 15
    },
    textAddress: {
        flexDirection: 'row',
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontSize: 13,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    distanceContainer: {
        marginTop: 10,
        flexDirection: 'row',
    },
    details: {
        marginTop: 10,
    },
    openText: {
        fontFamily: FontFamily.TAJAWAL_BLACK,
        fontSize: 15,
        fontWeight: '500',
        color: '#FFFFFF'
    },
    openLink: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    promotionsImg: {
        width: 350,
        height: 220,
    },
});
