import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions
} from 'react-native';
import images from '../assets/images';
import { FontFamily } from '../Theme/FontFamily';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CategoryCard extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {
            item,
            hostUrl,
            navigation,
        } = this.props
        return (
            <>
                <TouchableOpacity
                    onPress={() =>
                        console.log(hostUrl + item.images,)
                        //navigation.navigate('Product')
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

                        {/* <View style={{
                            position: 'absolute',
                            top: 0,
                            backgroundColor: 'red',
                            height: '55%',
                            width: '150%',
                            left: -10,
                            borderBottomRightRadius: 65,
                            borderBottomLeftRadius: 120,
                            
                        }}>
                        </View> */}

                        <View style={styles.innerTop}>
                            <TouchableOpacity
                                onPress={() => console.log('nothing')}>
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
                                uri: `${hostUrl + item.images}`,
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
                                    {item.ecom_ac_products[0].name}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText2}>
                                    Your Saving:{' '}
                                    {
                                        item.ecom_ac_products[0].ecom_aca_product_units[0].unitDiscountPrice
                                    }
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText3}>
                                    ${' '}
                                    {
                                        item.ecom_ac_products[0].ecom_aca_product_units[0].unitUserPrice
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
        // height: '100%',
        width: 70,
        // width: 70,
        alignSelf: 'center',
        // position: 'absolute'
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
        // marginTop: '45%',
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
