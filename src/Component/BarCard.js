import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showAlert } from '../api/auth';
import { addToWishlist, removeToWishlist } from '../api/wishlist';
import images from '../assets/images';
import { getAccessToken } from '../localstorage';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';
import StarRating from './StarRatings';
class BarCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.item,
            isFavorite: (this.props.item.ecom_ba_wishlist && this.props.item.ecom_ba_wishlist.wishlistId) ? true : false
        }
    }

    goToDetails = (item) => {
        console.log(item)
        this.props.navigation.navigate('ProductDetailBars', { 'id': item.vendorId });
    }

    removeFavorite = async (id) => {
        const token = getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            const data = {
                wishlistId: id
            }
            try {
                const response = await removeToWishlist(data);
                this.setState({ isFavorite: false });
                this.props.item.ecom_ba_wishlist = null;
                console.log("BarCard > removeFavorite > Response", response);
            } catch (error) {
                this.setState({ isFavorite: false });
                this.props.item.ecom_ba_wishlist = null;
                console.log("BarCard > removeFavorite > Error", error);
            }
        }
    }

    addFavorite = async (id, index) => {
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            const data = {
                productId: 0,
                comboId: 0,
                vendorId: id
            };
            try {
                const response = await addToWishlist(data);
                console.log("BarCard > addFavorite > response", response.result.data.wishlistId);
                this.props.item.ecom_ba_wishlist = {
                    "wishlistId": response.result.data.wishlistId,
                    "wishlistFor": "Bars"
                };
                this.setState({ isFavorite: true });
            } catch (error) {
                console.log("BarCard > addFavorite > Catch", error);
            }
        }
    }

    render() {
        const {
            navigation,
            hostUrl,
            item,
            index
        } = this.props;
        return (
            <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onPress={() => this.goToDetails(this.state.data)}
                    style={styles.container}>
                    <ImageBackground
                        style={styles.promotionsImg}
                        source={{
                            uri: `${hostUrl + this.state.data.images}`,
                        }}
                        defaultSource={images.defaultBar}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.props.item.ecom_ba_wishlist && this.props.item.ecom_ba_wishlist.wishlistId
                                    ? this.removeFavorite(this.props.item.ecom_ba_wishlist.wishlistId)
                                    : this.addFavorite(this.props.item.vendorId, index); // pass vendor id 
                            }}
                            style={styles.heartContainer}
                        >
                            <View style={styles.favContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    source={this.props.item.ecom_ba_wishlist ? images.heartFill : images.heart}
                                    defaultSource={this.state.isFavorite ? images.heartFill : images.heart}
                                    // source={this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                    // defaultSource={this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                    style={styles.favIcon}
                                />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.off}>
                            <Text style={styles.offText}>
                                50% Off
                            </Text>
                        </View>
                    </ImageBackground>
                    <View
                        style={styles.addressContainer}>
                        <Text style={styles.textTitle}>
                            {this.props.item.vendorShopName}
                        </Text>
                        <View>
                            {/* numberOfLines={2} ellipsizeMode='tail' */}
                            <Text style={styles.textAddress}
                                numberOfLines={1}
                            >{this.props.item.address}</Text>
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.details}>
                                <StarRating isEdit={false} size={this.props.item.vendorRating} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.distanceContainer}>
                                <Icon
                                    name="directions-run"
                                    size={16}
                                    style={styles.bottomIcon}
                                />
                                <Text style={styles.textAddress}>
                                    {this.props.item.distance.toFixed(1)}Km
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.openLink}>
                                <Icon
                                    name="fiber-manual-record"
                                    size={15}
                                    color="#26B90E"
                                    style={styles.bottomIcon}
                                />
                                <Text style={styles.openText}>
                                    Open
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </TouchableOpacity>
        );
    }
}

export default BarCard;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        //backgroundColor: '#8A87AC',
        backgroundColor: ThemeColors.CLR_WHITE,
        // margin: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 4,

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
    offText: {
        color: ThemeColors.CLR_DARK_GREY
    },
    textTitle: {
        fontSize: 20,
        color: ThemeColors.CLR_DARK_GREY,
        fontWeight: '400',
        fontFamily: FontFamily.ROBOTO_REGULAR,
        // marginBottom: 5
    },
    addressContainer: {
        margin: 12,
        // overflow: 'hidden',
        // width: '70%',
    },
    heartContainer: {
        marginTop: 15,
        marginRight: 15,
        // fontSize: 15,
    },
    favContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        backgroundColor: ThemeColors.CLR_WHITE,
        elevation: 4,
        alignSelf: 'flex-end',
        borderRadius: 25,
    },
    favIcon: {
        alignSelf: 'center',
        height: 20,
        width: 22
    },
    textAddress: {
        flexDirection: 'row',
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontSize: 13,
        fontWeight: '400',
        color: ThemeColors.CLR_DARK_GREY,
    },
    // distance:{
    //     flexDirection: 'row',
    //     fontFamily: FontFamily.ROBOTO_REGULAR,
    //     fontSize: 13,
    //     fontWeight: '400',
    //     color: ThemeColors.CLR_DARK_GREY,
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     //width:'90%',
    //     backgroundColor:'red'   
    // },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    distanceContainer: {
        marginTop: 10,
        flexDirection: 'row',
    },
    bottomIcon: {
        marginTop: 2
    },
    details: {
        marginTop: 10,
    },
    openText: {
        fontFamily: FontFamily.TAJAWAL_BLACK,
        fontSize: 15,
        fontWeight: '500',
        color: ThemeColors.CLR_DARK_GREY
    },
    openLink: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    promotionsImg: {
        //width: '100%',
        height: 220,
    },
});
