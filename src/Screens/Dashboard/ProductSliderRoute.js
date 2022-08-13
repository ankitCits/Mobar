import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ScrollView,
} from 'react-native';
import CategoryCard from '../../Component/CategoryCard';

export default class ProductSliderRoute extends Component {
    constructor(props) {
        super(props);
    }

    renderProducts = (item, index) => {
        return (
            <>
                <CategoryCard navigation={this.props.navigation} item={item} index={index} hostUrl={this.props.hostUrl} />
            </>
        );
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
                        <Text style={styles.whiskeyText}>{this.props.route.name}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Product', { category: this.props.route })}>
                            <Text style={styles.ViewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: '0%' }}>
                        <FlatList
                            nestedScrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={this.props.route.ecom_ac_products}
                            initialNumToRender={5}
                            maxToRenderPerBatch={10}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => this.renderProducts(item, index)}
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
