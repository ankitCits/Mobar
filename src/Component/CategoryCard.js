import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import images from '../assets/images';
import { FontFamily } from '../Theme/FontFamily';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CategoryCard extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <TouchableOpacity
                    onPress={() =>
                        console.log(
                            this.props.hostUrl + this.props.item.images,
                        )
                        // this.props.navigation.navigate('Product')
                    }
                    style={{
                        marginTop: 28,
                        marginBottom: 30,
                        marginLeft: 10,
                    }}>
                    <ImageBackground
                        style={styles.boxInner}
                        resizeMode={'cover'}
                        source={images.boxOuter}
                        defaultSource={images.boxOuter}>

                        <View style={styles.innerTop}>
                            <TouchableOpacity
                                onPress={() =>
                                    // console.log(
                                    //     this.props.hostUrl + this.props.item.images,
                                    // )
                                    console.log('nothing')
                                }>
                                <Icon
                                    name={'favorite'}
                                    size={22}
                                    color="#FF1405"
                                    style={styles.imageStyle}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 12 }}>
                                300ml
                            </Text>
                        </View>
                        <Image
                            style={styles.productImg}
                            resizeMode={'cover'}
                            source={{
                                uri: `${this.props.hostUrl + this.props.item.images}`,
                            }}
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
                                    {this.props.item.ecom_ac_products[0].name}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText2}>
                                    Your Saving:{' '}
                                    {
                                        this.props.item.ecom_ac_products[0].ecom_aca_product_units[0].unitDiscountPrice
                                    }
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText3}>
                                    ${' '}
                                    {
                                        this.props.item.ecom_ac_products[0].ecom_aca_product_units[0].unitUserPrice
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
    productImg: {
        marginTop: '-30%',
        marginRight: 10,
        height: 70,
        width: 70,
        alignSelf: 'center',
    },
    innerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '94%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
    },
    boxInner: {
        width: 147,
        height: 169,
    },
    boxOuter: {
        bottom: 0,
        position: 'absolute',
    },
    innerBottom: {
        alignItems: 'center',
        marginTop: '25%',
    },
    innerBottomText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '400',
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
