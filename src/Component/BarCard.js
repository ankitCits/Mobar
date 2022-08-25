import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addToWishlist, removeToWishlist } from '../api/wishlist';
import images from '../assets/images';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';
import StarRating from './StarRatings';
class BarCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.item,
            isFavorite: (this.props.item.ecom_ba_wishlist && this.props.item.ecom_ba_wishlist.wishlistId)
        }
    }

    goToDetails = (item) => {
        console.log(item)
        this.props.navigation.navigate('ProductDetailBars', { 'id': item.vendorId });
    }

    removeFavorite = async (id)=>{
        console.log("BarCard > removeFavorite > WId",id);
        console.log("object before remove fav",this.state.data.ecom_ba_wishlist); 
        const data ={
            wishlistId:id
        }
        try{
        const response = await removeToWishlist(data);
        this.setState({ isFavorite: false });
        this.setState(data.ecom_ba_wishlist = null);
        console.log("BarCard > removeFavorite > Response",response);
        console.log("object after remove fav",this.state.data.ecom_ba_wishlist); 
        }catch(error){
            console.log("BarCard > removeFavorite > Error",error);
        }
    }

    addFavorite = async (id,prodId=0,comboId=0)=>{
        console.log("object before add fav",this.state.data.ecom_ba_wishlist); 
        console.log("BarCard > addFav > ItemID",id);
        const data = {
            productId:prodId,
            comboId:comboId,
            vendorId:id
        };
        try{
        const response = await addToWishlist(data);
        console.log("BarCard > addFavorite > response",response.result.data.wishlistId);
        this.setState({ isFavorite: true });
        //this.setState(data.ecom_ba_wishlist={wishlistId : response.result.data.wishlistId,data,wishlistFor : response.result.data.ecom_ba_wishlist.wishlistFor});
        this.state.data.ecom_ba_wishlist = {
             "wishlistId": response.result.data.wishlistId,
             "wishlistFor": "Bars"
        };
        console.log("object after add fav",this.state.data.ecom_ba_wishlist); 

        }catch(error){
            console.log("BarCard > addFavorite > Catch",error);
        }
    }

    render() {
        const {
            navigation,
            hostUrl,
            item,
            index
        } = this.props;
        return (
            <View>
                <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onPress={() => this.goToDetails(item)}
                    style={styles.container}>
                    <ImageBackground
                        style={styles.promotionsImg}
                        source={{
                            uri: `${hostUrl + item.images}`,
                        }}
                        defaultSource={images.promotions1}
                    >
                        <View style={styles.heartContainer}>
                            {/* <TouchableOpacity
                                style={styles.flexEnd}>
                                <Image
                                    resizeMode={'cover'}
                                    source={images.heart}
                                    defaultSource={images.heart}
                                />
                            </TouchableOpacity> */}
                               <TouchableOpacity
                                onPress={() => {
                                    this.state.data.ecom_ba_wishlist && this.state.data.ecom_ba_wishlist.wishlistId
                                        ? this.removeFavorite(this.state.data.ecom_ba_wishlist.wishlistId)
                                        : this.addFavorite(this.state.data.vendorId); // pass vendor id 
                                }}
                                >
                                <Image
                                    resizeMode={'cover'}
                                    source={this.state.data.ecom_ba_wishlist ? images.heartFill : images.heart}
                                    defaultSource={this.state.data.ecom_ba_wishlist ? images.heartFill : images.heart}
                                    style={styles.flexEnd}
                                />
                            </TouchableOpacity>
                            <View style={styles.off}>
                                <Text style={styles.offText}>
                                    50% Off
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View
                        style={styles.addressContainer}>
                        <Text style={styles.textTitle}>
                            {item.vendorShopName}
                        </Text>
                        <View>
                            <Text style={styles.textAddress}>{item.address}</Text>
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.details}>
                                <StarRating isEdit={false} size={item.vendorRating} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.distanceContainer}>
                                <Icon
                                    name="directions-run"
                                    size={16}
                                    color={ThemeColors.CLR_WHITE}
                                    style={styles.bottomIcon}
                                />
                                <Text style={styles.textAddress}>
                                    {item.distance.toFixed(2)}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.openLink}>
                                <Icon
                                    name="fiber-manual-record"
                                    size={15}
                                    color="#26B90E"
                                    style={styles.bottomIcon}
                                />
                                <Text style={styles.openText}>
                                    Open
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default BarCard;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#8A87AC',
        margin: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
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
    offText:{ 
        color: ThemeColors.CLR_WHITE 
    },
    textTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '400',
        fontFamily: FontFamily.ROBOTO_REGULAR,
        // marginBottom: 5
    },
    addressContainer: {
        margin: 12,
    },
    heartContainer: {
        marginTop: '3%',
        //marginRight: '5%',
        fontSize: 15
    },
    flexEnd:{
        alignItems: 'flex-end',
        //alignContent:'flex-end',
        alignSelf:'flex-end'
    },
    textAddress: {
        flexDirection: 'row',
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontSize: 13,
        fontWeight: '400',
        color: '#FFFFFF'
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
    bottomIcon:{ 
        marginTop: 2 
    },
    details: {
        marginTop: 10,
    },
    openText: {
        fontFamily: FontFamily.TAJAWAL_BLACK,
        fontSize: 15,
        fontWeight: '500',
        color: '#FFFFFF'
    },
    openLink: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    promotionsImg: {
        width: 350,
        height: 220,
    },
});
