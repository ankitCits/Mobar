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
    Alert,
    Modal
} from 'react-native';
import images from '../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, updateToCart } from '../api/product';
import { addToWishlist, removeToWishlist } from '../api/wishlist';
import { getAccessToken } from '../localstorage';
import { showAlert } from '../api/auth';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';
import HTMLView from 'react-native-htmlview';
import CartModal from './CartModal';
import { is } from 'immer/dist/internal';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: this.props.categoryData,
            isFavorite: (this.props.item.ecom_ba_wishlist && this.props.item.ecom_ba_wishlist.wishlistId) ? true : false,
            data: this.props.item,
            cart: this.props.item.ecom_aca_product_units[0].ecom_ba_cart ? parseInt(this.props.item.ecom_aca_product_units[0].ecom_ba_cart.qty) : 0,
            selectedQty: {
                name: ' ',
                unit: '30ml',
                qty: 0
            },
            modalVisible: false
        };
    }

    addCart = async () => {

        const token = await getAccessToken();
        if (token == null) {
            showAlert();
        } else {
            console.log("Add Cart > product unit qty > ", this.state.data.ecom_aca_product_units[0].productUnitId);
            try {
                const sendData = {
                    productUnitId: this.state.data.ecom_aca_product_units[0].productUnitId,
                    comboId: 0,
                    qty: 1,
                };
                const response = await addToCart(sendData);
                this.setState({
                    modalVisible: true,
                    selectedQty: {
                        type: 1,
                        name: this.state.data.name,
                        unit: this.state.data.ecom_aca_product_units[0].unitQty + this.state.data.ecom_aca_product_units[0].unitType,
                        qty: this.state.cart + 1
                    }
                });
                // ToastAndroid.showWithGravity(
                //     'Product Added to Cart',
                //     ToastAndroid.LONG,
                //     ToastAndroid.BOTTOM,
                // );
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

    updateCart = async (cartType, isOpen) => {
        const token = await getAccessToken();
        console.log("updateCart > type > ", cartType);

        //return;
        if (token == null) {
            showAlert();
        } else {
            try {
                
                const sendData = {
                    cartId: this.state.data.ecom_aca_product_units[0].ecom_ba_cart.cartId,
                    type: cartType,//type 1 for add and 2 for substraction
                };
                const response = await updateToCart(sendData);
                // ToastAndroid.showWithGravity(
                //     'Product Added to Cart',
                //     ToastAndroid.LONG,
                //     ToastAndroid.BOTTOM,
                // );
                if (cartType == 2) {
                    let removeCart = this.state.cart;
                    removeCart = removeCart - 1;
                    this.setState({
                        modalVisible: true,
                        cart: removeCart,
                        selectedQty: {
                            type: cartType,
                            name: this.state.data.name,
                            unit: this.state.data.ecom_aca_product_units[0].unitQty + this.state.data.ecom_aca_product_units[0].unitType,
                            qty: removeCart
                        }
                    });
                } else {
                    const cart = this.state.cart + 1;
                    this.setState({
                        cart: cart,
                        modalVisible: true,
                        selectedQty: {
                            type: cartType,
                            name: this.state.data.name,
                            unit: this.state.data.ecom_aca_product_units[0].unitQty + this.state.data.ecom_aca_product_units[0].unitType,
                            qty: cart
                        }
                    });
                }
                if (!isOpen) {
                    this.setState({ modalVisible: true });
                }
                console.log("modal visible > ", this.state.modalVisible, this.state.selectedQty);
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
                // ToastAndroid.showWithGravity(
                //     error,
                //     ToastAndroid.LONG,
                //     ToastAndroid.BOTTOM,
                // );
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
                this.state.data.ecom_ba_wishlist = null;
                this.setState({ isFavorite: false });
                // ToastAndroid.showWithGravity(
                //     error,
                //     ToastAndroid.LONG,
                //     ToastAndroid.BOTTOM,
                // );
            }
        }
    };

    onCloseModal = (isClose) => {
        console.log("Collection > onCloseModal > is close > ", isClose);
        this.setState({ modalVisible: isClose })
    }

    render() {
        const {
            hostUrl,
            navigation,
            index
        } = this.props;
        return (
            <>
                <View style={styles.itemOuterContainer}>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProductDetailDrinks', { id: this.state.data.productId })}>
                            <View style={styles.topBar}>


                                <Text style={styles.item}>
                                 { 
                                        this.state.data.ecom_aca_product_units[0].unitQty + ' ' +
                                        this.state.data.ecom_aca_product_units[0].unitType}
                                </Text>

                                <TouchableOpacity
                                style={{
                                    margin:7,
                                }}
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
                                        defaultSource={images.defaultCategory}
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
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'flex-end',
                            }}

                            >
                                <View
                                    style={styles.savedPrices}>
                                    {this.state.data.ecom_aca_product_units[0].savedPrices ? (
                                        <ImageBackground
                                            resizeMode={'cover'}
                                            source={images.saveTemplate}
                                            defaultSource={images.saveTemplate}
                                            style={styles.savedPriceImg}>
                                            <Text
                                                style={styles.savedPriceText}>
                                                Save ${this.state.data.ecom_aca_product_units.savedPrices}
                                            </Text>
                                        </ImageBackground>
                                    ) : (<ImageBackground style={styles.savedPriceImg}>
                                        <Text
                                            style={styles.savedPriceText}></Text>

                                    </ImageBackground>)
                                    }
                                </View>
                                <View
                                    style={styles.cartRow}>
                                    {this.state.cart != 0 ? (
                                        <>
                                            <TouchableOpacity
                                                onPress={() => this.state.data.ecom_aca_product_units[0].ecom_ba_cart &&
                                                    this.state.cart > 0 ?
                                                    this.updateCart(2, false) : Alert.alert('', 'Work in progress')}
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
                                            ? this.updateCart(1, false) : this.addCart()}
                                        style={styles.cartActionIcon}>
                                        <Icon name="add" size={18} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View><Text>{this.state.modalVisible}</Text></View>

                {this.state.modalVisible &&
                    <CartModal props={this.props}
                        data={this.state.selectedQty}
                        navigation={this.props.navigation}
                        modalVisible={this.state.modalVisible}
                        onModalChange={(type, isOpen) =>
                            this.state.data.ecom_aca_product_units[0].ecom_ba_cart 
                                ?
                                this.updateCart(type, isOpen) : type == 1 ? this.addCart(): this.setState({modalVisible:false})}
                        onModalClose={this.onCloseModal} />
                }

                {/* {this.state.modalVisible &&

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.cartModalVisible}>
                        <TouchableWithoutFeedback
                            onPressOut={() => this.onCloseModal()}>
                            <View style={styles.centeredView}>
                                <View style={styles.cartModalContainer}>
                                    <View style={styles.cartModalHeader}>
                                        <Text
                                            style={styles.cartModalTitle}>
                                            Item added to cart successfully
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => this.onCloseModal()}>
                                            <Text><Icon name="close" size={28} color="#000" /></Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={styles.cartModalBody}>
                                        <Text
                                            style={styles.modalTextDetail}>
                                            {this.state.data.name} {this.state.data.ecom_aca_product_units[0].unitQty + this.state.data.ecom_aca_product_units[0].unitType}
                                        </Text>
                                        <View style={styles.modalCartQty}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // this.state.selectedQty.ecom_ba_cart ?
                                                    //   this.updateCart(this.state.selectedQty) :
                                                    //   this.setState({ cartModalVisible: false })
                                                }}
                                            >
                                                <Icon name="remove" size={20} color="#4D4F50" />
                                            </TouchableOpacity>
                                            <Text
                                                style={styles.modalTextDetail}>
                                                {' ' + this.state.this.state.cart + ' '}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => this.addCart(this.state.selectedQty.items, this.state.selectedQty.type, this.state.selectedQty.index)}
                                            >
                                                <Icon name="add" size={20} color="#4D4F50" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.save}
                                        onPress={() => {
                                            this.setState({ modalVisible: false })
                                            this.props.navigation.navigate('MyCard')
                                        }}>
                                        <Text style={{
                                            fontFamily: FontFamily.TAJAWAL_REGULAR,
                                            fontWeight: '700',
                                            fontSize: 18,
                                            color: ThemeColors.CLR_WHITE
                                        }}>
                                            VIEW CART
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                } */}
            </>
        );
    }
}
const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const styles = StyleSheet.create({
    itemOuterContainer: {
        flex: 1,
        //marginHorizontal: 12,
        alignItems: 'center'
    },
    itemContainer: {
        flexDirection: 'column',
        width: size - 22,
        //height: 200,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        borderTopWidth: 0,
        borderRadius: 20,
        // marginBottom: 10,
        marginVertical: 9,
        marginHorizontal: 0,
        backgroundColor: ThemeColors.CLR_WHITE,
        borderRadius: 10,
        //backgroundColor:"red"
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
        fontSize: 15,
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
        flex: 1,
        marginTop: 10,
        alignItems: 'flex-end',
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
        marginHorizontal: 5,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft:3
    },
    item: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontSize: 15,
        fontWeight: '400',
        color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR
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
    },
    // cart modal

    centeredView: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    cartModalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 4,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        opacity: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        //width: 400,
        //height: 280, 
    },
    cartModalHeader: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cartModalTitle: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '500',
        fontSize: 14,
        color: '#ACACAC'
    },
    cartModalBody: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    modalTextDetail: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '500',
        fontSize: 15,
        color: ThemeColors.CLR_SIGN_IN_TEXT_COLOR
    },
    modalCartQty: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    },
    save: {
        backgroundColor: '#851729',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
        alignSelf: 'center',
        width: 300,
    },

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