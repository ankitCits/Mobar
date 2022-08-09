import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ScrollView,
} from 'react-native';
import images from '../../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];
export default class ProductSliderRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        marginVertical: 15,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styles.whiskeyText}>{this.props.routes.title}</Text>
                        <TouchableOpacity>
                            <Text style={styles.ViewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: '0%' }}>
                        <FlatList
                            nestedScrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={DATA}
                            initialNumToRender={5}
                            maxToRenderPerBatch={10}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <>
                                    <View
                                        key={index.toString()}
                                        style={{ marginTop: 28, marginBottom: 30, marginLeft: 10 }}>
                                        <ImageBackground
                                            style={styles.boxInner}
                                            resizeMode={'cover'}
                                            source={images.boxOuter}
                                            defaultSource={images.boxOuter}>
                                            <View style={styles.innerTop}>
                                                <TouchableOpacity>
                                                    <Icon
                                                        name={'favorite'}
                                                        size={22}
                                                        color="#FF1405"
                                                        style={styles.imageStyle}
                                                    />
                                                </TouchableOpacity>
                                                <Text style={{ color: '#fff', fontSize: 12 }}>300ml</Text>
                                            </View>
                                            <Image
                                                style={styles.productImg}
                                                resizeMode={'cover'}
                                                source={images.product1}
                                                defaultSource={images.product1}
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
                                                        Ballantines Blended
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.innerBottomText2}>
                                                        Your Saving: $19
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.innerBottomText3}>$ 89</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                </>
                            )}
                        />
                    </View>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    whiskeyText: {
        fontSize: 18,
        fontWeight: '500',
    },
    ViewAll: {
        fontSize: 13,
        fontWeight: '400',
        color: '#711323',
    },
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
