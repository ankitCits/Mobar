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
            index
        } = this.props;
        return (
            <>
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        // console.log(hostUrl + item.images);
                        navigation.navigate('ProductDetailDrinks');
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
                            <TouchableOpacity onPress={() => console.log('nothing')}>
                                <Icon
                                    name={'favorite'}
                                    size={22}
                                    color="#FF1405"
                                    style={[styles.imageStyle]}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 12 }}>
                                {item.ecom_aca_product_units[0].unitQty + item.ecom_aca_product_units[0].unitType}
                            </Text>
                        </View>

                        <Image
                            style={styles.productImg}
                            resizeMode={'cover'}
                            defaultSource={images.product1}
                            source={{ uri: hostUrl + item.images }}
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
                                    {item.name}
                                    {/* Ballantines Blended */}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText2}>
                                    Your Saving:{' '}
                                    {
                                        item.ecom_aca_product_units[0].unitDiscountPrice
                                    }
                                    {/* Your Saving: $19 */}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.innerBottomText3}>
                                    ${' '}
                                    {
                                        item.ecom_aca_product_units[0].unitUserPrice
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
        height:20,
        
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
