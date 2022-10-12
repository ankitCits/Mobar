import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import images from '../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';
import HTMLView from 'react-native-htmlview';

export default class VendorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hostUrl: props.hostUrl,
            index: props.index
        };
        console.log('VendorCard > ', props.items);
    }

    render() {
        const item = this.props.items;
        console.log("items images > ", item);

        return (
            <>
                <View style={styles.vendorContainer}>
                    <TouchableOpacity
                        key={this.state.index}
                        style={styles.vendorItem}
                        onPress={() =>
                            this.props.navigation.navigate('ProductDetailBars', { 'id': item.vendorId })
                        }>
                        <View style={styles.vendorImgContainer}>
                            <Image
                                style={styles.vendorImage}
                                resizeMode={'cover'}
                                source={{ uri: this.state.hostUrl + item.images }}
                                defaultSource={images.defaultImg}
                            />
                        </View>

                        <View style={styles.vendorDetails}>
                            <View
                                style={styles.vendorRow}>
                                <Icon name="wine-bar" size={20} color={ThemeColors.CLR_TAB} />
                                <Text
                                    style={styles.vendorTitle}>
                                    {item.vendorShopName}
                                </Text>
                            </View>

                            <View
                                style={styles.vendorRow}>
                                <Icon name="place" size={20} color={ThemeColors.CLR_TAB} />
                                <Text
                                    style={styles.vendorText}>
                                    {item.address}
                                </Text>
                            </View>

                            <View
                                style={styles.vendorRow}>
                                <Icon name="directions-run" size={20} color={ThemeColors.CLR_TAB} />
                                <Text
                                    style={styles.vendorText}>
                                    {item.distance.toFixed(1)}Km
                                </Text>
                            </View>
                        </View>
                        <View
                            style={styles.vendorProductStatus}>
                            <View
                                style={styles.vendorRow}>
                                <Icon
                                    name="fiber-manual-record"
                                    size={18}
                                    color={item.ecom_acc_vendor_product && item.ecom_acc_vendor_product.vendorProductStatus == 'Available' ? '#38C720' : '#FF2121'}
                                />
                                {item.ecom_acc_vendor_product && item.ecom_acc_vendor_product.vendorProductStatus == 'Available' ? <Text style={[styles.productStatusText, styles.open]}>Open</Text> : <Text style={[styles.productStatusText, styles.close]}>Closed</Text>}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    vendorItem: {
        flex: 1,
        flexDirection: 'row',
    },
    vendorContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
    },
    vendorImgContainer: { alignSelf: "flex-start", },
    vendorImage: {
        width: 95,
        height: 95,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: "center"
    },
    vendorDetails:
    {
        margin: 0,
        width: '50%',
        marginLeft: 5,
        paddingHorizontal: 5,
    },
    vendorRow: {
        flexDirection: 'row',
    },
    vendorTitle: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontSize: 16,
        fontWeight: '700',
        color: '#030303',
    },
    vendorText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4D4F50',
        fontFamily: FontFamily.TAJAWAL_REGULAR
    },
    vendorProductStatus: {
        margin: 10,
        flex: 1,
        justifyContent: 'center',
    },
    productStatusText: {
        fontSize: 14,
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontWeight: '500',
        marginLeft: 5,
    },
    open: {
        color: '#38C720',
    },
    close: {
        color: '#FF2121',
    },

});
