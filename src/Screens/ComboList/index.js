import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { fetchComboProducts } from '../../api/product';
import images from '../../assets/images';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderSide from '../Component/HeaderSide';

export default class ComboList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            hostUrl:''
        };
    }

componentDidMount(){
    this.getComboData();
}

    getComboData = async () => {
    try{
        const data = await fetchComboProducts();
        //console.log("ComboList > getComboData > response >",data.response.result.hostUrl);
        this.setState({data:data.response.result.comboDatas,hostUrl:data.response.result.hostUrl})
        console.log("state data",this.state.data);
    }catch(error){
        console.log("ComboList > getComboData > catch >",error);
        ToastAndroid.showWithGravity(
            error,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
        );
    }
}

renderComboItems=(items,index)=>{
    return (
        <ComboCard item={items} index={index} url={this.state.hostUrl} />
    )
}

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <HeaderSide
                    name={'Combo Products'}
                    onClick={() => this.props.navigation.pop()}
                />
                <>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => this.renderComboItems(item, index)}
                    />
                </View>
                </>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaContainer:{
        flex:1,
        backgroundColor: '#fff',
      },
    container:{
        flex:1,
        flexDirection:'column',
      },
      subContainer: {
        margin: 20,
        //backgroundColor: '#8A87AC',
        backgroundColor: ThemeColors.CLR_WHITE,
        // margin: 10,
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
        // marginBottom: 5
    },
    addressContainer: {
        margin: 12,
        // overflow: 'hidden',
        // width: '70%',
    },
    heartContainer: {
        marginTop: 15,
        marginRight: 15,
        // fontSize: 15,
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
    // distance:{
    //     flexDirection: 'row',
    //     fontFamily: FontFamily.ROBOTO_REGULAR,
    //     fontSize: 13,
    //     fontWeight: '400',
    //     color: ThemeColors.CLR_DARK_GREY,
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     //width:'90%',
    //     backgroundColor:'red'   
    // },
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
        //width: '100%',
        height: 220,
    },
});

const ComboCard=({item,index,url})=>{
    return (
        <TouchableOpacity
                key={index}
                activeOpacity={1}
                //onPress={() => this.goToDetails(this.state.data)}
                style={styles.subContainer}>
                <ImageBackground
                    style={styles.promotionsImg}
                    source={
                        {
                        uri: `${url + item.images}`,
                    }
                }
                    defaultSource={images.promotions1}
                >
                    <TouchableOpacity
                        // onPress={() => {
                        //     this.props.item.ecom_ba_wishlist && this.props.item.ecom_ba_wishlist.wishlistId
                        //         ? this.removeFavorite(this.props.item.ecom_ba_wishlist.wishlistId)
                        //         : this.addFavorite(this.props.item.vendorId, index); // pass vendor id 
                        // }}
                        style={styles.heartContainer}
                    >
                        <View style={styles.favContainer}>
                            <Image
                                resizeMode={'contain'}
                                source={images.heartFill}
                                defaultSource={images.heart}
                                //source={this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                // defaultSource={this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId ? images.heartFill : images.heart}
                                style={styles.favIcon}
                            />
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
                <View
                    style={styles.addressContainer}>
                    <Text style={styles.textTitle}>
                        {/* {this.props.item.vendorShopName} */}
                        {item.name}
                    </Text>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between'
                    }}
                    >
                         <Text style={styles.textAddress}
                            numberOfLines={2}
                        >
                             ${item.comboPrice} 
                            </Text>
                            <TouchableOpacity
                                    // onPress={() => this.state.data.ecom_aca_product_units[0].ecom_ba_cart &&
                                    //     this.state.cart
                                    //     ? this.updateCart(this.state.data.ecom_aca_product_units[0].ecom_ba_cart, 1, index) : this.addCart(this.state.data.ecom_aca_product_units[0].productUnitId, index)}
                                    style={styles.cartActionIcon}>
                                    <Icon name="add" size={18} color="#fff" />
                                </TouchableOpacity>
                            {/* <HTMLView value={item.comboContent} /> */}
                    </View>
                    <View>
                        {/* numberOfLines={2} ellipsizeMode='tail' */}
                        <Text style={styles.textAddress}
                            numberOfLines={2}
                        >{item.comboQty+item.comboQtyType}</Text>
                    </View>
                    {/* <View style={styles.footer}>
                    </View> */}
                </View>
        </TouchableOpacity>
    );
}