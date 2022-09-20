// Used in Product > index.js

import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    ToastAndroid,
    Alert
} from 'react-native';
import images from '../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, addToFav, removeToFav, updateToCart } from '../api/product';
import { addToWishlist, removeToWishlist } from '../api/wishlist';
import { getAccessToken } from '../localstorage';
import { showAlert } from '../api/auth';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';
// import { screenHeight, screenWidth } from '../Theme/Matrices';
import HTMLView from 'react-native-htmlview';
import { createToken } from '@stripe/stripe-react-native';
// import { numberOfLines } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: this.props.categoryData,
            isFavorite: (this.props.item.ecom_ba_wishlist && this.props.item.ecom_ba_wishlist.wishlistId) ? true : false,
            data: this.props.item,
            cart: this.props.item.ecom_aca_product_units[0].ecom_ba_cart ? parseInt(this.props.item.ecom_aca_product_units[0].ecom_ba_cart.qty) : 0,
        };
    }

    addCart = async (productUnitId, index) => {
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            try {
                const sendData = {
                    productUnitId: productUnitId,
                    comboId: 0,
                    qty: 1,
                };
                const response = await addToCart(sendData);
                // const cart = this.state.data.item.ecom_aca_product_units[0].ecom_ba_cart.qty;
                // this.props.item.ecom_aca_product_units[0].ecom_ba_cart.qty = cart -1;
                this.setState({ cart: this.state.cart + 1 });
            } catch (error) {
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    }

    updateCart = async (item, type, index) => {
        console.log("ProductCart > updateCart > id", item, type, index);
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            try {
                const sendData = {
                    cartId: item.cartId,
                    type: type,//type 1 for add and 2 for substraction
                };
                const response = await updateToCart(sendData);
                if (type == 2) {
                    let removeCart = this.state.cart;
                    removeCart = removeCart - 1;
                    this.setState({ cart: removeCart });
                } else {
                    const cart = this.state.cart + 1;
                    console.log("after update", cart);
                    this.setState({ cart: cart });
                }
            } catch (error) {
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    }

    removeCart = async (cartId, index) => {
        console.log("ProductCard > removeCart > id", cartId, index);
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            try {
                const response = await removeFromCart(cartId);
                // const cart = this.state.data.ecom_aca_product_units[0].ecom_ba_cart.qty;
                // this.state.data.ecom_aca_product_units[0].ecom_ba_cart.qty = cart - 1;
                this.setState({ cart: this.state.cart - 1 });

            } catch (error) {
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    }

    addFavorite = async (productId, index) => {
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            try {
                const sendData = {
                    productId: productId,
                    comboId: 0,
                    vendorId: 4,
                };
                const wishlistData = await addToWishlist(sendData);
                this.state.data.ecom_ba_wishlist = wishlistData.result.data;
                this.setState({ isFavorite: true });
            } catch (error) {
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    };

    removeFavorite = async (wishListId, index) => {
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            try {
                const sendData = {
                    wishlistId: wishListId
                };
                const responseData = await removeToWishlist(sendData);
                this.state.data.ecom_ba_wishlist = null;
                this.setState({ isFavorite: false });
            } catch (error) {
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    };

    render() {
        const {
            item,
            hostUrl,
            navigation,
            index
        } = this.props;
        //console.log("ProductCard > Item",item);
        return (
            <View style={styles.itemOuterContainer}>
                <View style={styles.itemContainer}>
                    <View style={styles.topBar}>
                        <Text style={styles.item}>
                            {this.state.data.ecom_aca_product_units[0].unitQty}{' '}
                            {this.state.data.ecom_aca_product_units[0].unitType}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.state.isFavorite
                                    ? this.removeFavorite(this.state.data.ecom_ba_wishlist.wishlistId, index)
                                    : this.addFavorite(this.state.data.productId, index);
                            }}>
                            <View style={styles.favContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    source={this.state.isFavorite ? images.heartFill : images.heart}
                                    defaultSource={this.state.isFavorite ? images.heartFill : images.heart}
                                    style={styles.favIcon}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.itemDetails}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetailDrinks', { id: this.state.data.productId })}>
                            <Image
                                resizeMode={'cover'}
                                source={{
                                    uri: this.state.data.images
                                        ? `${hostUrl + this.state.data.images}`
                                        : images.wine,
                                }}
                                defaultSource={images.wine}
                                style={styles.prodImage}
                            />
                        </TouchableOpacity>
                        <Text
                            style={styles.prodName}>
                            {this.state.data.name.substring(0, 16)}
                        </Text>
                        {/* <Text
                            style={styles.prodDesText}
                             >
                            {this.state.data.shortDescription = this.state.data.shortDescription.substring(3, 1) + '.'}
                         </Text> */}
                        <View style={styles.oneLine}>
                            <HTMLView value={this.state.data.shortDescription.substring(0, 20) + '..'} />
                        </View>

                        <Text
                            style={styles.priceText}>
                            ${this.state.data.ecom_aca_product_units[0].unitUserPrice}
                        </Text>
                    </View>
                    <View
                        style={styles.savedPrices}>
                        {this.state.data.ecom_aca_product_units.savedPrices ? (
                            <ImageBackground
                                resizeMode={'cover'}
                                source={images.saveTemplate}
                                defaultSource={images.saveTemplate}
                                style={styles.savedPriceImg}>
                                <Text
                                    style={styles.savedPriceText}>
                                    Save $50{this.state.data.ecom_aca_product_units.savedPrices}
                                </Text>
                            </ImageBackground>
                        ) : (<ImageBackground></ImageBackground>)
                        }
                        <View
                            style={styles.cartRow}>
                            {this.state.cart != 0 ? (
                                <>
                                    <TouchableOpacity
                                        onPress={() => this.state.data.ecom_aca_product_units[0].ecom_ba_cart &&
                                            this.state.cart > 0 ?
                                            this.updateCart(this.state.data.ecom_aca_product_units[0].ecom_ba_cart, 2, index) : Alert.alert('', 'Work in progress')}
                                        style={styles.cartActionIcon}>
                                        <Icon
                                            name="remove"
                                            size={18}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                    <Text
                                        style={styles.cartQty}>
                                        {this.state.cart}
                                    </Text>
                                </>
                            ) : null}
                            <TouchableOpacity
                                onPress={() => this.state.data.ecom_aca_product_units[0].ecom_ba_cart &&
                                    this.state.cart 
                                    ? this.updateCart(this.state.data.ecom_aca_product_units[0].ecom_ba_cart, 1, index) : this.addCart(this.state.data.ecom_aca_product_units[0].productUnitId, index)}
                                style={styles.cartActionIcon}>
                                <Icon name="add" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const styles = StyleSheet.create({
    itemOuterContainer: {
        flex: 1,
        marginHorizontal: 16,
        // flexDirection: 'row',
        // alignContent: 'flex-start',
        // alignItems: 'flex-start',
        // backgroundColor: 'red',

    },
    itemContainer: {
        flexDirection: 'column',
        width: size - 28,
        height: 200,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        borderTopWidth: 0,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 10,
        // alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,

    },
    itemDetails: {
        alignItems: 'center',
    },
    oneLine: {
        marginLeft: 5,
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
    prodImage: {
        marginTop: -40,
        height: 80,
        width: 40,
    },
    prodName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#050505',
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        marginTop: 10,
        marginHorizontal: 10
    },
    prodDesText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontSize: 15,
        fontWeight: '400',

        color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    },
    priceText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontSize: 20,
        fontWeight: '700',
        color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    },
    savedPrices: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    savedPriceImg: {
        width: 76,
        height: 19,
        marginTop: 5,
    },
    savedPriceText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontSize: 13,
        fontWeight: '500',
        color: ThemeColors.CLR_WHITE,
        marginLeft: 5,
    },
    cartRow: {
        flexDirection: 'row',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    item: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontSize: 15,
        fontWeight: '400',
        color: '#000',
    },
    cartActionIcon: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#BABABA',
        borderRadius: 20,
        marginBottom: 5,
        marginRight: 8,
    },
    cartQty: {
        fontSize: 16,
        fontWeight: '700',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: -2,
        marginRight: 5,
    }
});

// dispatcher functions
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

//getting props from redux
function mapStateToProps(state) {
    let redux = state;
    return { redux };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);