import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ImageBackground,
} from 'react-native';
import { addToCart, fetchComboProducts } from '../../api/product';
import images from '../../assets/images';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderSide from '../Component/HeaderSide';
import { addToWishlist, removeToWishlist } from '../../api/wishlist';
import { isLoggedIn, showAlert, showToaster } from '../../api/func';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';

export default class ComboList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoader:false,
            hostUrl: ''
        };
    }


    componentDidMount() {
        this.getComboData();
    }

    getComboData = async () => {
        try {
            this.setState({isLoader:true});
            const data = await fetchComboProducts();
            this.setState({ data: data.response.result.comboDatas, hostUrl: data.response.result.hostUrl });
            this.setState({isLoader:false});
        } catch (error) {
            console.log("ComboList > getComboData > catch >", error);
            showToaster(error,'TOP');
        }
    }

    removeFavorite = async (id, index) => {
        if (await isLoggedIn()) {
            try {
                const data = {
                    wishlistId: id
                }
                await removeToWishlist(data);
                this.state.data[index].ecom_ba_wishlist = null;
                this.setState({ data: this.state.data })
            } catch (error) {
                this.state.data[index].ecom_ba_wishlist = null;
                this.setState({ data: this.state.data })
            }
        } else {
            showAlert();
        }
    }

    addToFavorite = async (comboId, index) => {
        if (await isLoggedIn()) {
            try {
                const data = {
                    productId: 0,
                    comboId: comboId,
                    vendorId: 0
                };
                const res = await addToWishlist(data);
                this.state.data[index].ecom_ba_wishlist = res.result.data;
                this.setState({ data: this.state.data })
            } catch (error) {
                console.log("ComboList > addToFavorite >  catch > ", error);
            }
        } else {
            showAlert();
        }

    }

    addCart = async (comboId) => {
        if (await isLoggedIn()) {
            try {
                const cartItem = {
                    productUnitId: 0,
                    comboId: comboId,
                    qty: 1,
                };
                await addToCart(cartItem);
                showToaster('Item added to cart successfully','TOP');
            } catch (error) {
                console.log("Combo list > addCart > catch", error);
                showToaster(error,'TOP')
            }
        } else {
            showAlert();
        }
    }

    goToDetails = (id) => {
        this.props.navigation.navigate('ComboDetails', { comboId: id });
    }

    renderComboItems = (item, index) => {
        return (
            <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => this.goToDetails(item.comboId)}
                style={styles.subContainer}>
                <ImageBackground
                    style={styles.promotionsImg}
                    //sa
                    source={
                        {
                            uri: `${this.state.hostUrl + item.images}`,
                        }
                    }
                    defaultSource={images.defaultCombo}
                >
                    <TouchableOpacity
                        onPress={() => {
                            item.ecom_ba_wishlist && item.ecom_ba_wishlist.wishlistId ?
                                this.removeFavorite(item.ecom_ba_wishlist.wishlistId, index) :
                                this.addToFavorite(item.comboId, index);
                        }}
                        style={styles.heartContainer}
                    >
                        <View style={styles.favContainer}>
                            <Image
                                resizeMode={'contain'}
                                source={item.ecom_ba_wishlist && item.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                defaultSource={item.ecom_ba_wishlist && item.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                style={styles.favIcon}
                            />
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
                <View
                    style={styles.addressContainer}>
                    <Text style={styles.textTitle}>
                        {item.name}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                    >
                        <Text style={styles.textAddress}
                            numberOfLines={2}
                        >
                            ${item.comboPrice}
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.addCart(item.comboId, index)}
                            style={styles.cartActionIcon}>
                            <Icon name="add" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.textAddress}
                            numberOfLines={2}
                        >{item.comboQty + item.comboQtyType}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <HeaderSide
                    name={'Combo'}
                    onClick={() => this.props.navigation.pop()}
                />
                {this.state.isLoader ?
                    (<ThemeFullPageLoader />) :
                    (
                        <>
                            <View style={styles.container}>
                                <FlatList
                                    data={this.state.data}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => this.renderComboItems(item, index)}
                                />
                            </View>
                        </>)
                }
            </SafeAreaView>)
    }
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    subContainer: {
        margin: 20,
        backgroundColor: ThemeColors.CLR_WHITE,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
    },
    addressContainer: {
        margin: 12,
    },
    heartContainer: {
        marginTop: 15,
        marginRight: 15,
        alignSelf:'flex-end'
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
    cartActionIcon: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#BABABA',
        borderRadius: 20,
        marginRight: 5,
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
        height: 210,
    },
});