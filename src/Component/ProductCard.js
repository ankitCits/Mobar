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
    ToastAndroid
} from 'react-native';
import images from '../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, addToFav, removeToFav } from '../api/product';
import { addToWishlist, removeToWishlist } from '../api/wishlist';
import { getAccessToken } from '../localstorage';
import { showAlert } from '../api/auth';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: this.props.categoryData,
            isFavorite:false,
            data:this.props.item,
        };
    }

    addCart = async (item, index) => {
        // console.log("ProductCard >  addToCart > Item", item.ecom_aca_product_units[0].productUnitId);
        // console.log("ProductCard >  addToCart > Item", item.cart);
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            try {
                const sendData = {
                    productUnitId: item.productId,
                    comboId: 0,
                    qty: item.cart + 1,
                };
                const response = await addToCart(sendData);
                const data = this.state.categoryData.data;
                data[index].cart = data[index].cart + 1;
                this.setState({
                    categoryData: {
                        data,
                        hostUrl: this.state.categoryData.hostUrl,
                    },
                });
            } catch (error) {
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    }

    removeFromCart = async (item, index) => {
        console.log("ProductCard > removeCart > Item",item);
        return;
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            try {
                const sendData = {
                    productUnitId: item.productId,
                    comboId: 0,
                    qty: item.cart - 1,
                };
                await removeFromCart(sendData);
                const data = this.state.categoryData.data;
                data[index].cart = data[index].cart - 1;
                this.setState({
                    categoryData: {
                        data,
                        hostUrl: this.state.categoryData.hostUrl,
                    },
                });
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
        //console.log("AddFavorite State Token",this.state.token);
        const token =  await getAccessToken();
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
                console.log("Product Card > addFavorite",wishlistData);
                this.state.data.ecom_ba_wishlist = wishlistData.result.data;
                this.setState({ isFavorite: true });
                const data = this.state.categoryData.data;
                data[index].fav = 1;
                this.setState({
                    categoryData: {
                        data,
                        hostUrl: this.state.categoryData.hostUrl,
                    },
                });
            } catch (error) {
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    };

    removeFavorite = async (prodId, index) => {
        const token =  await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            console.log("ProductCard > RemoveFavorite > item", prodId);
            try {
                const sendData = {
                    productId: prodId,
                    comboId: 0,
                    vendorId: 4,
                };
                const responseData = await removeToWishlist(sendData);
                //console.log("ProductCard > removeFavorite > response", responseData);
                const data = this.state.categoryData.data;
                this.state.data.ecom_ba_wishlist = null;
                //console.log("this.state.data.ecom_ba_wishlist on after remove", this.state.data.ecom_ba_wishlist);
                this.setState({ isFavorite: false });
                data[index].fav = 0;
                this.setState({
                    categoryData: {
                        data,
                        hostUrl: this.state.categoryData.hostUrl,
                    },
                });
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
                                    resizeMode={'cover'}
                                    source={this.state.isFavorite ? images.heartFill : images.heart}
                                    defaultSource={this.state.isFavorite ? images.heartFill : images.heart}
                                    style={styles.favIcon}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.itemDetails}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetailDrinks', { id: item.productId })}>
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
                            {this.state.data.name}
                        </Text>
                        <Text
                            style={styles.prodDesText}>
                            {this.state.data.shortDescription}
                        </Text>
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
                          ): (  <ImageBackground></ImageBackground> )
                          }
                        <View
                            style={styles.cartRow}>
                            {this.state.data.cart ? (
                                <>
                                    <TouchableOpacity
                                        onPress={() => this.removeFromCart(this.state.data, index)}
                                        style={styles.cartActionIcon}>
                                        <Icon
                                            name="remove"
                                            size={18}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                    <Text
                                        style={styles.cartQty}>
                                        {item.cart}
                                    </Text>
                                </>
                            ) : null}
                            <TouchableOpacity
                                onPress={() => this.addCart(this.state.data, index)}
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
        //width: size,
        //height: size + 50,
        flex:1,
    },
    itemContainer: {
        width: 155,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        borderTopWidth: 0,
        borderRadius: 20,
        marginTop: 20,
        marginBottom:10,
        alignSelf:'center',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    itemDetails:{
        alignItems: 'center',
    },
    favContainer:{
        width:30,
        height:30,
        justifyContent:'center',
        backgroundColor:ThemeColors.CLR_WHITE,
        elevation:4,
        borderRadius:25,
    },
    favIcon:{
        alignSelf:'center',
    },
    prodImage:{
        height: 80,
        width: 40,
    },
    prodName:{
        fontSize: 16,
        fontWeight: '500',
        color: '#050505',
        fontFamily:FontFamily.TAJAWAL_REGULAR,
        marginTop: 10,
    },
    prodDesText:{
        fontFamily:FontFamily.TAJAWAL_REGULAR,
        fontSize: 15,
        fontWeight: '400',
        color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    },
    priceText:{
        fontFamily:FontFamily.TAJAWAL_REGULAR,
        fontSize: 20,
        fontWeight: '700',
        color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    },
    savedPrices:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    savedPriceImg:{
        width: 76,
        height: 19,
        marginTop: 5,
    },
    savedPriceText:{
        fontFamily:FontFamily.TAJAWAL_REGULAR,
        fontSize: 13,
        fontWeight: '500',
        color: ThemeColors.CLR_WHITE,
        marginLeft: 5,
    },
    cartRow:{
        flexDirection: 'row',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    item: {
        fontFamily:FontFamily.TAJAWAL_REGULAR,
        fontSize: 15,
        fontWeight: '400',
        color: '#000',
    },
    cartActionIcon: {
        alignSelf: 'center',
        backgroundColor: '#BABABA',
        borderRadius: 20,
        marginBottom: 5,
        marginRight: 8,
    },
    cartQty: {
        fontSize: 16,
        fontWeight: '700',
        alignItems: 'center',
        marginTop: -5,
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