import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
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
import { addToWishlist, removeToWishlist } from '../../api/wishlist';
import { isLoggedIn, showAlert, showToaster } from '../../api/func';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextPropTypes } from 'deprecated-react-native-prop-types';
import { fetchVendorForComboProduct } from '../../api/vendor';
import { connect } from 'react-redux';
import VendorCard from '../../Component/VendorCard';

class ComboDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comboId: props.route.params.comboId,
            data: null,
            vendorData: [],
            hostUrl: ''
        };
    }
    componentDidMount() {
        this.getComboDetailsById();
        this.getVendorForCombo();
    }

    getComboDetailsById = async () => {
        try {
            const data = {
                comboId: this.state.comboId,
                latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : '',
                longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : '',
            }
            const res = await fetchComboDetailsById(data);
            this.setState({ data: res.response.result.comboDatas, hostUrl: res.response.result.hostUrl })
            console.log("state product > ",this.state.data.ecom_ac_products);
        } catch (error) {
            console.log("ComboDetails > getComboDetailsById > catch >", error);
            showToaster(error, 'TOP');
        }
    }

    getVendorForCombo = async () => {
        try {
            const data = {
                comboId: this.state.comboId,
                latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : '',
                longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : '',
            }
            const res = await fetchVendorForComboProduct(data);
            this.setState({ vendorData: res.response.result.vendorDatas });
        } catch (error) {
            console.log("ComboDetails > getVendorForCombo > catch > ", error);
        }
    }

    removeFavorite = async (id) => {
        if (await isLoggedIn()) {
            try {
                const data = {
                    wishlistId: id
                }
                await removeToWishlist(data);
                this.state.data.ecom_ba_wishlist = null;
                this.setState({ data: this.state.data })
            } catch (error) {
                console.log("Combo Details > removeFavorite > catch > ", error);
                showToaster(error);
            }
        } else {
            showAlert();
        }
    }

    addToFavorite = async (comboId) => {
        if (await isLoggedIn()) {
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
                showToaster(error);
            }
        } else {
            showAlert();
        }
    }

    addCart = async () => {
        if (await isLoggedIn()) {
            try {
                const cartItem = {
                    productUnitId: 0,
                    comboId: this.state.comboId,
                    qty: 1,
                };
                await addToCart(cartItem);
                showToaster('Item added to cart successfully', 'TOP');
            } catch (error) {
                console.log("Combo Details > addCart > catch", error);
                showToaster(error, 'TOP');
            }
        } else {
            showAlert();
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
                                            defaultSource={images.defaultCombo}
                                        >
                                            <View
                                                style={styles.headerContainer}>
                                                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                                    <Icon name="arrow-back" size={28} color="#fff" />
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
                                                <View style={styles.priceContainer}>
                                                    <Text
                                                        style={styles.priceText}>
                                                        ${this.state.data.comboPrice}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View>
                                                <View style={styles.quantity}>
                                                    <Text
                                                        style={styles.qtyText}>
                                                        {this.state.data.comboQty + this.state.data.comboQtyType}
                                                    </Text>
                                                </View>
                                            </View>
                                            {
                                                this.state.data.ecom_ac_products.length > 0 &&
                                                this.state.data.ecom_ac_products.map((item, index) =>
                                                (
                                                <View
                                                style={{
                                                    flexDirection:'row',
                                                    backgroundColor:ThemeColors.CLR_WHITE,
                                                    borderRadius:10,
                                                    elevation:5,
                                                    padding:5,
                                                    marginVertical:10,

                                                }}
                                                 key={index}>
                                                    <View
                                                    style={{
                                                        margin:5,
                                                        borderTopLeftRadius:10,
                                                        borderTopRightRadius:10,
                                                    }}>
                                                        <Image
                                                            style={{
                                                                width: 65,
                                                                height: 65
                                                            }}
                                                            source={{
                                                                uri: this.state.hostUrl + item.images
                                                            }}
                                                            defaultSource={images.defaultImg}
                                                        />
                                                    </View>
                                                    <View>
                                                    <View>
                                                       <Text style={{
                                                        fontSize:17,
                                                        fontWeight:'700'
                                                       }}>{item.name}</Text> 
                                                    </View>
                                                    <View style={{
                                                        width:'95%'
                                                    }}>
                                                    <HTMLView value={item.shortDescription} />
                                                    </View>
                                                    </View>
                                                </View>
                                                ))
                                            }
                                            {/* <HTMLView value={this.state.data.comboContent} /> */}
                                            <View style={styles.cartBtnContainer}>

                                                <TouchableOpacity
                                                    style={styles.cartContainer}
                                                    onPress={() => this.addCart()}
                                                >
                                                    <Text
                                                        style={styles.cartText}
                                                    >
                                                        ADD TO CART
                                                    </Text>
                                                    <View

                                                        style={styles.cartIcon}>
                                                        <Image
                                                            resizeMode={'cover'}
                                                            source={images.cart}
                                                            defaultSource={images.cart}
                                                            style={styles.cartImage}
                                                        />
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.favContainer}
                                                    onPress={() => {
                                                        this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ?
                                                            this.removeFavorite(this.state.data.ecom_ba_wishlist.wishlistId)
                                                            : this.addToFavorite(this.state.data.comboId);
                                                    }}
                                                >
                                                    <Image
                                                        resizeMode={'cover'}
                                                        source={this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                                        defaultSource={this.state.isFavorite ? images.heartFill : images.heart}
                                                        style={styles.favIcon}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.redeem}>
                                    <View style={styles.redeemContainer}>
                                        <Text
                                            style={styles.redeemHeader}>
                                            Redeemable in Bars
                                        </Text>

                                        <Text
                                            style={styles.redeemText}>
                                            Select your nearest bar and redeem your drink
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.vendor}>
                                        {this.state.vendorData && this.state.vendorData.length > 0 ?
                                            this.state.vendorData.map((item, index) => {
                                                return (
                                                    <VendorCard navigation={this.props.navigation} items={item} index={index} hostUrl={this.state.hostUrl} />

                                                )
                                            }) :
                                            null}
                                    </View>
                                </View>
                            </ScrollView>
                        </>
                    )}
            </SafeAreaView>
        )
    }

}

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

export default connect(mapStateToProps, mapDispatchToProps)(ComboDetails);

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
        alignSelf: 'center',
        marginLeft: 75,
        backgroundColor: ThemeColors.CLR_WHITE,
        elevation: 4,
        borderRadius: 25,
    },
    favIcon: {
        alignSelf: 'center',
    },
    cartContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#AD1832',
        width: 192,
        borderRadius: 30,
    },
    cartMargin: {
        //margin: 40,
    },
    cartBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop:10,
    },
    cartText: {
        fontSize: 15,
        alignSelf: 'center',
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        color: ThemeColors.CLR_WHITE,
        marginHorizontal: 5,
        fontWeight: '700',
    },
    cartIcon: {
        backgroundColor: '#D46679',
        width: 75,
        height: 44,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: ThemeColors.CLR_WHITE
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
    cardBody: {
        paddingVertical: 2,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }, priceContainer: {
        alignSelf: 'center'
    },
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
    redeem: {
        margin: 0,
        marginTop: 20
    },
    redeemContainer: {
        margin: 15
    },
    redeemHeader: {
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontSize: 15,
        fontWeight: '500',
        color: '#4D4F50',
    },
    redeemText: {
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontSize: 12,
        fontWeight: '400',
        color: '#ACACAC',
        marginTop: 5,
    },
    vendor: {
        backgroundColor: ThemeColors.CLR_WHITE,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 2,
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


