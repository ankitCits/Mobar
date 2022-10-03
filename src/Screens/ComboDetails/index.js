import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid,
    ImageBackground,
    ScrollView,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { addToCart, fetchComboDetailsById, } from '../../api/product';
import images from '../../assets/images';
import ThemeFullPagerLoader from '../../Component/ThemeFullPageLoader';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAccessToken } from '../../localstorage';
import { showAlert } from '../../api/auth';
import { addToWishlist, removeToWishlist } from '../../api/wishlist';

export default class ComboDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comboId: props.route.params.comboId,
            data: null,
            hostUrl: ''
        };
    }


    componentDidMount() {
        this.getComboDetailsById();
    }

    getComboDetailsById = async () => {
        try {
            const data = {
                comboId: this.state.comboId,
                latitude: 1.28668,
                longitude: 103.853607
            }
            const res = await fetchComboDetailsById(data);
            this.setState({ data: res.response.result.comboDatas, hostUrl: res.response.result.hostUrl })
        } catch (error) {
            console.log("ComboDetails > getComboDetailsById > catch >", error);
            ToastAndroid.showWithGravity(
                error,
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
        }
    }

    removeFavorite = async (id) => {
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
            return;
        } else {
            try {
                const data = {
                    wishlistId: id
                }
                await removeToWishlist(data);
                this.state.data.ecom_ba_wishlist = null;
                this.setState({ data: this.state.data })
            } catch (error) {
                console.log("Combo Details > removeFavorite > catch > ", error);
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    }

    addToFavorite = async (comboId) => {
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
            return;
        } else {
            try {
                const data = {
                    productId: 0,
                    comboId: comboId,
                    vendorId: 0
                };
                const res = await addToWishlist(data);
                this.state.data.ecom_ba_wishlist = res.result.data;
                this.setState({ data: this.state.data })
            } catch (error) {
                console.log("Combo Details > add wishlist > catch > ", error);
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }
        }
    }

    addCart = async () => {
        const token = await getAccessToken();
        if (token == null) {
            showAlert();
            return;
        } else {
            try {
                const cartItem = {
                    productUnitId: 0,
                    comboId: this.state.comboId,
                    qty: 1,
                };
                await addToCart(cartItem);
                ToastAndroid.showWithGravity(
                    'Item added to cart successfully',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                );
            } catch (error) {
                console.log("Combo Details > addCart > catch", error);
                ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                );
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                {this.state.data == null ? (
                    <ThemeFullPagerLoader />
                ) :
                    (
                        <>
                            <ScrollView>
                                <View style={styles.container}>
                                    <View>
                                        <ImageBackground
                                            style={styles.productImg}
                                            resizeMode={'cover'}
                                            source={{
                                                uri:
                                                    this.state.hostUrl +
                                                    this.state.data.images,
                                            }}
                                            defaultSource={images.promotions1}
                                        >
                                            <View
                                                style={styles.headerContainer}>
                                                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                                    <Icon name="arrow-back" size={28} color="#fff" />
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ?
                                                            this.removeFavorite(this.state.data.ecom_ba_wishlist.wishlistId)
                                                            : this.addToFavorite(this.state.data.comboId);
                                                    }}>
                                                    <View style={styles.favContainer}>
                                                        <Image
                                                            resizeMode={'cover'}
                                                            source={this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                                            defaultSource={this.state.isFavorite ? images.heartFill : images.heart}
                                                            style={styles.favIcon}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.cardContainer}>
                                        <View style={styles.cardHeader}>
                                            <View>
                                                <Text
                                                    style={styles.cardTitle}>
                                                    {this.state.data.name}
                                                </Text>
                                            </View>

                                            <View style={styles.cardBody}>
                                                <Text
                                                    style={styles.priceText}>
                                                    ${this.state.data.comboPrice}
                                                </Text>
                                            </View>

                                            <View>
                                                <View style={styles.quantity}>
                                                    <Text
                                                        style={styles.qtyText}>
                                                        {this.state.data.comboQty + this.state.data.comboQtyType}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ paddingLeft: 2, }}>
                                                <HTMLView value={this.state.data.comboContent} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.body}>
                                        <Text
                                            style={styles.bodyText}>
                                            Products
                                        </Text>
                                    </View>
                                    {
                                        this.state.data.ecom_ac_products.map((item, index) => (
                                            (
                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => {
                                                        this.props.navigation.navigate('ProductDetailDrinks', { id: item.productId });
                                                    }}>
                                                    <View
                                                        style={styles.productView}
                                                    >
                                                        <View style={styles.productInnerView}>
                                                            <Image
                                                                key={index}
                                                                style={styles.prodImg}
                                                                resizeMode={'cover'}
                                                                source={{
                                                                    uri: `${this.state.hostUrl + item.images}`,
                                                                }}
                                                                defaultSource={images.product2}
                                                            />
                                                        </View>
                                                        <View style={styles.prodDetailContainer}>
                                                            <View>
                                                                <Text
                                                                    style={styles.prodText}>
                                                                    {item.name}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.comboQty}>
                                                                <Text
                                                                    style={styles.prodQtyText}>
                                                                    Qty not available
                                                                </Text>
                                                            </View>

                                                            <View
                                                                style={styles.prodPriceContainer}>
                                                                <Text
                                                                    style={styles.prodPriceText}>
                                                                    price not available
                                                                </Text>
                                                                <Text
                                                                    style={styles.prodDisPrice}>
                                                                    {/* $dPrice */}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() => { this.addCart() }}
                                                            key={index}
                                                            style={styles.cart}>
                                                            <Icon name="add" size={18} color="#fff" key={index} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        ))
                                    }
                                </View>
                            </ScrollView>
                        </>
                    )}
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ThemeColors.CLR_WHITE,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    productImg: {
        height: 250,
    },
    headerContainer: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    favContainer: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        backgroundColor: ThemeColors.CLR_WHITE,
        elevation: 4,
        borderRadius: 25,
    },
    favIcon: {
        alignSelf: 'center',
    },
    cardContainer: {
        backgroundColor: ThemeColors.CLR_WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 20,
        padding: 5
    },
    cardHeader: {
        margin: 15
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#3C3C3C',
    },
    cardBody: { paddingVertical: 5, },
    priceText: {
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontSize: 18,
        fontWeight: '700',
        color: ThemeColors.CLR_DARK_GREY,
    },
    comboQty: {
        fontSize: 14,
        color: '#4D4F50',
        fontWeight: '400',
        marginHorizontal: 5,
    },
    quantity: {
        paddingBottom: 5,
    },
    qtyText: {
        color: '#424242',
        fontSize: 14,
        fontWeight: '500',
    },
    body: {
        margin: 15
    },
    bodyText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#3C3C3C',
    },
    productView: {
        backgroundColor: ThemeColors.CLR_WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        borderRadius: 12,
        elevation: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 15,
    },
    productInnerView: {
        backgroundColor: '#fff',
        height: 100,
        width: '26%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    prodImg: {
        width: 75,
        height: 75,
    },
    prodDetailContainer: { margin: 5, width: '60%' },
    prodText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4D4F50',
        paddingHorizontal: 5,
    },
    prodQtyText: {
        fontSize: 14,
        color: '#4D4F50',
        fontWeight: '400',
    },
    prodPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    prodPriceText: {
        fontSize: 18,
        color: '#424242',
        fontWeight: '700',
    },
    prodDisPrice: {
        fontSize: 15,
        color: '#969696',
        textDecorationLine: 'line-through',
    },
    cart: {
        backgroundColor: '#BABABA',
        padding: 2,
        margin: 10,
        alignSelf: 'flex-end',
        borderRadius: 20,
    }
});


