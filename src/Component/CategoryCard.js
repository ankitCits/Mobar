import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ToastAndroid,
} from 'react-native';
import images from '../assets/images';
import { addToWishlist, removeToWishlist } from '../api/wishlist';
import { getAccessToken } from '../localstorage';
import { showAlert } from '../api/auth';
import { ThemeColors } from '../Theme/ThemeColors';
import { screenHeight, screenWidth } from '../Theme/Matrices';

export default class CategoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: (this.props.item.ecom_ba_wishlist && this.props.item.ecom_ba_wishlist.wishlistId),
            data: this.props.item,
            images: [
                { innerBox: images.boxInnerOrange, outerBox: images.boxOuterOrange },
                { innerBox: images.boxInnerRed, outerBox: images.boxOuterRed },
                { innerBox: images.boxInnerPurple, outerBox: images.boxOuterPurple },
            ],
        }


    }

    removeFavorite = async (id) => {
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            try {
                const data = {
                    wishlistId: id
                }
                const response = await removeToWishlist(data);
                this.state.data.ecom_ba_wishlist.wishlistId = null;
                this.setState({ isFavorite: false })
            } catch (error) {
                console.log("CategoryCard > removeFavorite > Catch", error);
            }
        }
    }

    addFavorite = async (id, index) => {
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            try {
                const data = {
                    productId: id,
                    comboId: 0,
                    vendorId: 0
                };
                const response = await addToWishlist(data);
                this.state.data.ecom_ba_wishlist = {
                    "wishlistId": response.result.data.wishlistId,
                    "wishlistFor": "Drinks"
                }
                this.setState({ isFavorite: true })
                console.log();

            } catch (error) {
                console.log("CategoryCard > addFavorite > Catch", error);
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    }

    randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    render() {
        const {
            item,
            hostUrl,
            navigation,
            index,
        } = this.props;
        const currImage = this.state.images[index % 3]
        return (
            <>
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        navigation.navigate('ProductDetailDrinks', { id: this.state.data.productId });
                    }}
                    style={{
                        marginTop: 28,
                        marginBottom: 30,
                        marginLeft: 10,
                    }}>

                    <ImageBackground
                        key={index}
                        style={styles.boxInner}
                        resizeMode={'cover'}
                        source={currImage.outerBox}
                        defaultSource={currImage.outerBox}>

                        <View style={styles.innerTop}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId
                                        ? this.removeFavorite(this.state.data.ecom_ba_wishlist.wishlistId)
                                        : this.addFavorite(this.state.data.productId, index);
                                }}>
                                <View style={styles.favContainer}>
                                    <Image
                                        resizeMode={'contain'}
                                        source={this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                        defaultSource={this.state.data.ecom_ba_wishlist ? images.heartFill : images.heart}
                                        style={styles.favIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 12 }}>
                                {this.state.data.ecom_aca_product_units[0].unitQty + this.state.data.ecom_aca_product_units[0].unitType}
                            </Text>
                        </View>

                        <Image
                            style={styles.productImg}
                            resizeMode={'cover'}
                            defaultSource={images.product1}
                            source={{ uri: hostUrl + this.state.data.images }}
                        />

                        <Image
                            style={styles.boxOuter}
                            resizeMode={'cover'}
                            source={currImage.innerBox}
                            defaultSource={currImage.innerBox}
                        />

                        <View style={styles.innerBottom}>
                            <View>
                                <Text style={styles.innerBottomText}>
                                    {this.state.data.name}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText2}>
                                    Your Saving:{' '}
                                    {
                                        this.state.data.ecom_aca_product_units[0].unitDiscountPrice
                                    }
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText3}>
                                    ${' '}
                                    {
                                        this.state.data.ecom_aca_product_units[0].unitUserPrice
                                    }
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </>
        );
    }
}
const styles = StyleSheet.create({
    boxInner: {
        // width: screenWidth(37.5),
        // height: screenHeight(26),
        width: 147,
        height: 180,
        //height: 169,
    },
    boxOuter: {
        bottom: 0,
        position: 'absolute',
    },
    productImg: {
        marginTop: '-40%',
        marginLeft: 10,
        position: 'relative',
        width: 60,
        height: 145,
        zIndex: 0,
        alignSelf: 'center'
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
    innerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '94%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
        position: 'relative',
    },
    innerBottom: {
        alignItems: 'center',
        marginTop: '-10%',
    },
    innerBottomText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '400',
        height: 20,
    },
    innerBottomText2: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400',
    },
    innerBottomText3: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});
