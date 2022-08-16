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
import { addToCart, addToFav, removeToFav } from '../api/product';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: this.props.categoryData,
        };
    }

    addToCart = async (item, index) => {
        try {
            const sendData = {
                productUnitId: item.productId,
                comboId: 0,
                qty: item.cart + 1,
            };
            await addToCart(sendData);
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

    removeFromCart = async (item, index) => {
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

    addFavorite = async (item, index) => {
        try {
            const sendData = {
                productId: item.productId,
                comboId: 0,
                vendorId: 4,
            };
            await addToFav(sendData);
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
    };

    removeFavToState = async (item, index) => {
        // let data = this.state.categoryData.data;
        // data[index].fav = 0;
        // this.setState({
        //     categoryData: {
        //         data,
        //         hostUrl: this.state.categoryData.hostUrl,
        //     },
        // });
        // let sendData = {
        //     wishlistId: 11,
        // };
        // this.props.dispatch(removeToFav(sendData));
        try {
            const sendData = {
                productId: item.productId,
                comboId: 0,
                vendorId: 4,
            };
            await removeToFav(sendData);
            const data = this.state.categoryData.data;
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
                            {item.ecom_aca_product_units[0].unitQty}{' '}
                            {item.ecom_aca_product_units[0].unitType}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                item.fav
                                    ? this.removeFavToState(item, index)
                                    : this.addFavorite(item, index);
                            }}>
                            <Image
                                resizeMode={'cover'}
                                source={item.fav ? images.heartFill : images.heart}
                                defaultSource={item.fav ? images.heartFill : images.heart}
                                style={styles.favIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: -5,
                        }}>
                        <Image
                            resizeMode={'cover'}
                            source={{
                                uri: item.images
                                    ? `${hostUrl + item.images}`
                                    : images.wine,
                            }}
                            defaultSource={images.wine}
                            style={{
                                height: 80,
                                width: 40,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: '#050505',
                                marginTop: 10,
                            }}>
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: '#000',
                            }}>
                            {item.shortDescription}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '700',
                                color: '#000',
                            }}>
                            ${item.ecom_aca_product_units[0].unitUserPrice}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                        }}>
                        {item.ecom_aca_product_units.savedPrices ? (
                            <ImageBackground
                                resizeMode={'cover'}
                                source={images.saveTemplate}
                                defaultSource={images.saveTemplate}
                                style={{
                                    width: 76,
                                    height: 19,
                                    marginTop: 5,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '500',
                                        color: '#fff',
                                        marginLeft: 5,
                                    }}>
                                    Save ${item.ecom_aca_product_units.savedPrices}
                                </Text>
                            </ImageBackground>
                        ) : (
                            <View />
                        )}
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            {item.cart ? (
                                <>
                                    <TouchableOpacity
                                        onPress={() => this.removeFromCart(item, index)}
                                        style={styles.carActionIcon}>
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
                                onPress={() => this.addToCart(item, index)}
                                style={styles.carActionIcon}>
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
        width: size,
        height: size + 50,
    },
    itemContainer: {
        width: 155,
        marginLeft: 20,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 1,
        borderTopWidth: 0,
        borderRadius: 200,
        margin: 3,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    item: {
        fontSize: 13,
        fontWeight: '400',
        color: '#000',
    },
    favIcon: {
        width: 20.57,
        height: 18,
    },
    carActionIcon: {
        alignSelf: 'center',
        backgroundColor: '#BABABA',
        borderRadius: 20,
        marginTop: -5,
        marginRight: 5,
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