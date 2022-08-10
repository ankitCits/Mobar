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
