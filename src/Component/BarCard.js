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
            console.log("BarCard > removeFavorite > WId", id);
            console.log("object before remove fav", this.state.data.ecom_ba_wishlist);
            const data = {
                wishlistId: id
            }
            try {
                const response = await removeToWishlist(data);
                this.setState({ isFavorite: false });
                this.state.data.ecom_ba_wishlist = null,
                    console.log("BarCard > removeFavorite > Response", response);
                console.log("object after remove fav", this.state.data.ecom_ba_wishlist);
            } catch (error) {
                console.log("BarCard > removeFavorite > Error", error);
            }
        }
    }

    addFavorite = async (id, index) => {
        const token = await getAccessToken();
        console.log("AddFavorites > BarCard >Token", token);
        if (token == null) {
            showAlert();
        } else {
            console.log("BarCard > addFav > ItemID", id);
            console.log("BarCard > addFav > this.state.data.ecom_ba_wishlist", this.state.data.ecom_ba_wishlist);

            const data = {
                productId: 0,
                comboId: 0,
                vendorId: id
            };
            try {
                const response = await addToWishlist(data);
                console.log("BarCard > addFavorite > response", response.result.data.wishlistId);
                this.state.data.ecom_ba_wishlist = {
                    "wishlistId": response.result.data.wishlistId,
                    "wishlistFor": "Bars"
                };
                this.setState({ isFavorite: true });
                console.log("object after add fav", this.state.data.ecom_ba_wishlist);
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
            <View>
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
                        defaultSource={images.promotions1}
                    >
                        <View style={styles.heartContainer}>
                            {/* <TouchableOpacity
                                style={styles.flexEnd}>
                                <Image
                                    resizeMode={'cover'}
                                    source={images.heart}
                                    defaultSource={images.heart}
                                />
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                onPress={() => {
                                    this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId
                                        ? this.removeFavorite(this.state.data.ecom_ba_wishlist.wishlistId)
                                        : this.addFavorite(this.state.data.vendorId, index); // pass vendor id 
                                }}
                            >
                                <View style={styles.favContainer}>
                                    <Image
                                        resizeMode={'cover'}
                                        source={this.state.isFavorite ? images.heartFill : images.heart}
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
                        </View>
                    </ImageBackground>
                    <View
                        style={styles.addressContainer}>
                        <Text style={styles.textTitle}>
                            {this.state.data.vendorShopName}
                        </Text>
                        <View>
                            {/* numberOfLines={2} ellipsizeMode='tail' */}
                            <Text style={styles.textAddress}>{this.state.data.address}</Text>
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.details}>
                                <StarRating isEdit={false} size={this.state.data.vendorRating} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.distanceContainer}>
                                <Icon
                                    name="directions-run"
                                    size={16}
                                    color={ThemeColors.CLR_WHITE}
                                    style={styles.bottomIcon}
                                />
                                <Text style={styles.textAddress}>
                                    {this.state.data.distance.toFixed(2)}
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
            </View>
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
        marginTop: '4%',
        marginRight: 15,
        fontSize: 15,
    },
    favContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: ThemeColors.CLR_WHITE,
        elevation: 4,
        alignSelf: 'flex-end',
        borderRadius: 25,
    },
    favIcon: {
        alignSelf: 'center',
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
