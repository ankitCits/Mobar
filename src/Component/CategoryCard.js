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

export default class CategoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: (this.props.item.ecom_ba_wishlist && this.props.item.ecom_ba_wishlist.wishlistId),
            data: this.props.item
        }
        //console.log("State Data",this.state.data);
    }

    removeFavorite = async (id) => {
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

    addFavorite = async (id, index) => {
        try {
            const data = {
                productId: id,
                comboId: 0,
                vendorId: 0
            };
            //console.log("CategoryCard > addFavorite > response",this.state.data.ecom_ba_wishlist);
            const response = await addToWishlist(data);
            //console.log("CategoryCard > addFavorite > response",response);
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

    render() {
        const {
            item,   
            hostUrl,
            navigation,
            index,
        } = this.props;
        //console.log("CCard > Item", item);
        return (
            <>
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        // console.log(hostUrl + item.images);
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
                        source={images.boxOuter}
                        defaultSource={images.boxOuter}>

                        <View style={styles.innerTop}>
                            {/* <TouchableOpacity onPress={() => console.log('nothing')}>
                                <Icon
                                    name={'favorite'}
                                    size={22}
                                    color="#FF1405"
                                    style={[styles.imageStyle]}
                                />
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                onPress={() => {
                                    this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId
                                        ? this.removeFavorite(this.state.data.ecom_ba_wishlist.wishlistId)
                                        : this.addFavorite(this.state.data.productId, index);
                                }}>
                                <Image
                                    resizeMode={'cover'}
                                    source={this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                    defaultSource={this.state.data.ecom_ba_wishlist ? images.heartFill : images.heart}
                                    style={styles.favIcon}
                                />
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
                        // source={images.product1}
                        />

                        <Image
                            style={styles.boxOuter}
                            resizeMode={'cover'}
                            source={images.boxInner}
                            defaultSource={images.boxInner}
                        />

                        <View style={styles.innerBottom}>
                            <View>
                                <Text style={styles.innerBottomText}>
                                    {this.state.data.name}
                                    {/* Ballantines Blended */}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText2}>
                                    Your Saving:{' '}
                                    {
                                        this.state.data.ecom_aca_product_units[0].unitDiscountPrice
                                    }
                                    {/* Your Saving: $19 */}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText3}>
                                    ${' '}
                                    {
                                        this.state.data.ecom_aca_product_units[0].unitUserPrice
                                    }
                                    {/* $ 89 */}
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
        width: 147,
        height: 169,
    },
    boxOuter: {
        bottom: 0,
        position: 'absolute',
    },
    productImg: {
        marginTop: '-40%',
        marginLeft: 10,
        position: 'relative',
        // backgroundColor: 'red',
        width: 60,
        height: 145,
        zIndex: 0,
        alignSelf: 'center'
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
        // width: '94%',
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
