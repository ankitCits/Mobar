import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Text,
    ScrollView,
    ImageBackground,
    RefreshControl,
    PermissionsAndroid,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../Component/Header';
import { A_KEY, BASE_URL } from '../../config';
import { ThemeColors } from '../../Theme/ThemeColors';
import { TabView, TabBar } from 'react-native-tab-view';

import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { getAccessToken } from '../../localstorage';
import PageHeader from './PageHeader';
import ComboOfferCard from '../../Component/ComboOfferCard';
import BarCard from '../../Component/BarCard';
import ProductSliderRoute from './ProductSliderRoute';
import { FontFamily } from '../../Theme/FontFamily';

import { setUserDetail, setUserLocationDetail } from '../../Redux/actions/auth';
import { getUserDetails } from '../../api/auth';
import images from '../../assets/images';
import Geolocation from 'react-native-geolocation-service';
import { inviteShare } from '../../api/common';
import { isLoggedIn, showToaster } from '../../api/func';


const LazyPlaceholder = ({ route }) => (
    <View style={styles.container}>
        <ThemeFullPageLoader />
    </View>
);

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            drinkObj: {},
            hostUrl: null,
            index: 0,
            inviteShareImg: null,
            routes: [],
            refreshing: false,
            locationPermission: false,
            position: {
                longitude: 0,
                latitude: 0,
                isLocation: false
            },
            subscribe: null,
        };

    }

    async componentDidMount() {
        this.state._unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.getReferralImage();
            this.getDetail();
            this.getTabDetail();
        });
        await this.requestLocationPermission();
        this.getReferralImage();
    }

    componentWillUnmount() {
        this.state._unsubscribe();
    }

    async getReferralImage() {
        try {
            const res = await inviteShare();
            this.setState({ inviteShareImg: res.response.result.pageData.images })
        } catch (error) {
            console.log("dashboard > getReferralImage > catch > getReferralImage", error);
        }
    }

    // async componentDidMount() {
    // this.getDetail();
    // this.getTabDetail();
    // await this.requestLocationPermission();
    // }

    componentDidUpdate() {
        // if (this.prevState.position.isLocation !== this.state.position.isLocation) {
        //     this.getTabDetail();
        //   }
    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission Required",
                    message: "App Require to access your current location",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({ locationPermission: true });
                this.getLatLong();
            } else {
                Alert.alert('Alert', 'Location Permission Denied.')
            }
        } catch (err) {
            console.warn(err);
        }
    };

    getLatLong = async () => {
        Geolocation.getCurrentPosition((position) => {
            this.setState({ position: { longitude: position.coords.longitude, latitude: position.coords.latitude, isLocation: true } });
            this.props.dispatch(setUserLocationDetail(this.state.position));
            this.getTabDetail();
        }, (error) => {
            console.log(JSON.stringify(error));
            Alert.alert('Alert', 'Unable to retrieve your location')
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
            forceRequestLocation: true,
            showLocationDialog: true,
        });
    }

    onRefresh = async () => {
        await this.getTabDetail();
    }

    getDetail = async () => {
        console.log('getDetail')
        const token = await isLoggedIn();
        if (!token) {
            return this.setState({ loader: false });
        }
        const postData = {
            token
        }
        try {
            const responseDetail = await getUserDetails(postData);
            this.props.dispatch(setUserDetail(responseDetail.response));
        } catch (error) {
            this.setState({ loader: false });
            showToaster(error, 'TOP');
            console.log('Error_On_Data_Fetch getDetail', error);
        }
    }

    getTabDetail = async () => {
        console.log('getTabDetail')
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        const token = await getAccessToken();
        if (token) {
            myHeaders.append('Token', token);
        }
        let raw = JSON.stringify({
            vendorId: 4,
            latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : '',
            longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : '',
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/home/homelists`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.response) {
                    const categories = result.response.result.drinkCategory;
                    categories.forEach((element, index) => {
                        categories[index].key = index;
                    });
                    this.setState({
                        loader: false,
                        routes: categories,
                        drinkObj: result.response.result,
                        hostUrl: result.response.result.hostUrl
                    })
                }
                if (result.errors) {
                    this.setState({ loader: false });
                    showToaster(result.errors[0].msg, 'TOP');
                }
            })
            .catch(error => {
                this.setState({ loader: false });
                showToaster('Network Error!', 'TOP');
                console.log('Error_On_Data_Fetch getTabDetail', error);
            });
    };


    _handleIndexChange = index => this.setState({ index });

    _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

    _renderScene = ({ route, jumpTo }) => {
        return (<ProductSliderRoute route={route} hostUrl={this.state.hostUrl} navigation={this.props.navigation} />);
    };

    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                <View style={styles.container}>
                    {
                        this.state.loader ? (
                            <ThemeFullPageLoader />
                        ) : (
                            <>
                                {/* Header */}
                                <Header
                                    onClick={() => this.props.navigation.openDrawer()}
                                    onCard={() => this.props.navigation.navigate('MyCard')}
                                    onNotification={() => this.props.navigation.navigate('Notification')}
                                    IconName="account-circle"
                                    IconColor="#711323"
                                    Address={
                                        this.props.redux && this.props.redux.auth.userData && this.props.redux.auth.userData.result && this.props.redux.auth.userData.result.profile
                                            ? this.props.redux.auth.userData.result.profile.address
                                            : 'Duxten Road, 338750'
                                    }
                                    // Address={
                                    //     this.props.redux.auth.userData
                                    //         ? this.props.redux.auth.userData.address
                                    //         : 'Duxten Road, 338750'
                                    // }
                                    Image={
                                        this.props.redux && this.props.redux.auth.userData && this.props.redux.auth.userData.result && this.props.redux.auth.userData.result.profile
                                            ? this.props.redux.auth.userData.result.hostUrl + this.props.redux.auth.userData.result.profile.profilePic
                                            : 'Default'}
                                />
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                                    }
                                    showsVerticalScrollIndicator={false}
                                    style={{
                                        flex: 1,
                                    }}>
                                    {/* Search & Slider */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <PageHeader {...this.props} />
                                    </View>

                                    <View style={{
                                        flexDirection: 'column',
                                        marginHorizontal: 15,
                                    }}>
                                        {/* Tab Header */}
                                        {this.state.drinkObj.drinkCategory && this.state.drinkObj.drinkCategory.length > 0 ?
                                            <View style={{ flexDirection: 'row', height: 330 }}>
                                                <TabView
                                                    lazy
                                                    navigationState={this.state}
                                                    renderScene={this._renderScene}
                                                    renderLazyPlaceholder={this._renderLazyPlaceholder}
                                                    onIndexChange={this._handleIndexChange}
                                                    initialLayout={{ width: Dimensions.get('window').width }}
                                                    renderTabBar={props => (
                                                        <TabBar
                                                            {...props}
                                                            indicatorStyle={{ backgroundColor: ThemeColors.CLR_WHITE }}
                                                            tabStyle={{ backgroundColor: ThemeColors.CLR_WHITE, width: 'auto' }}
                                                            style={{ backgroundColor: ThemeColors.CLR_WHITE, }}
                                                            scrollEnabled={true}
                                                            renderLabel={({ route }) => (
                                                                <>
                                                                    <Text
                                                                        style={[styles.label,
                                                                        route.key === props.navigationState.routes[this.state.index].key
                                                                            ? styles.selectedTabText : styles.tabText
                                                                        ]}>
                                                                        {route.name}
                                                                    </Text>
                                                                    {route.key === props.navigationState.routes[this.state.index].key &&
                                                                        <View style={styles.selectedTabBorder} />
                                                                    }
                                                                </>
                                                            )}
                                                            labelStyle={styles.noLabel}
                                                        />
                                                    )}
                                                />
                                            </View>
                                            :
                                            <ThemeFullPageLoader />
                                        }

                                        {/* Combo Offer */}
                                        {this.state.drinkObj.comboDatas && this.state.drinkObj.comboDatas.length > 0
                                            ?
                                            <View>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',

                                                    }}>
                                                    <Text style={styles.sectionTitle}>Combos</Text>
                                                    <TouchableOpacity>
                                                        <Text style={styles.ViewAll}
                                                            onPress={() => this.props.navigation.navigate('ComboList')}>
                                                            View All
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <ScrollView
                                                    horizontal={true}
                                                    nestedScrollEnabled={true}>
                                                    {
                                                        this.state.drinkObj.comboDatas.map((item, index) => (
                                                            <ComboOfferCard navigation={this.props.navigation} index={index} item={item} hostUrl={this.state.hostUrl} />
                                                        ))
                                                    }
                                                </ScrollView>
                                            </View>
                                            :
                                            // <ThemeFullPageLoader />
                                            null
                                        }
                                        {/* Combo Offer */}

                                        {/* Promotion Banner */}
                                        {
                                            this.state.inviteShareImg &&
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('InviteFriends')}
                                                style={{
                                                    marginTop: 10,
                                                    backgroundColor: '#fff',
                                                    shadowColor: '#000',
                                                    shadowOffset: { width: 1, height: 1 },
                                                    shadowOpacity: 0.4,
                                                    shadowRadius: 15,
                                                    borderRadius: 15,
                                                    elevation: 5,
                                                    alignSelf: 'center',

                                                }}>
                                                <ImageBackground
                                                    style={styles.promotionsImg}
                                                    resizeMode={'cover'}
                                                    source={
                                                        {
                                                            uri: `${this.state.hostUrl + this.state.inviteShareImg}`
                                                        }
                                                    }
                                                    defaultSource={images.defaultBar}
                                                >
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        }
                                        {/* Promotion End */}


                                        {/* Bar List */}
                                        {this.state.drinkObj.barDatas && this.state.drinkObj.barDatas.length > 0
                                            ?
                                            <View
                                                style={{
                                                    marginBottom: 10,
                                                }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        marginTop: '8%',

                                                    }}>
                                                    <Text style={styles.sectionTitle}>Bars</Text>
                                                    <TouchableOpacity
                                                    >
                                                        <Text style={styles.ViewAll}
                                                            onPress={() => this.props.navigation.navigate('BarList')}>View All</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {/* <ScrollView
                                                    horizontal={true}
                                                    nestedScrollEnabled={true}> */}
                                                {
                                                    this.state.drinkObj.barDatas.map((item, index) => (
                                                        <BarCard navigation={this.props.navigation} onChange={(data) => this.updateWishlist(data)} index={index} item={item} hostUrl={this.state.hostUrl} />
                                                    ))
                                                }
                                                <TouchableOpacity
                                                    onPress={() => this.props.navigation.navigate('BarList')}
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        marginVertical: '5%',
                                                        paddingVertical: 10,
                                                        borderRadius: 10,
                                                        backgroundColor: '#851729'
                                                    }}>
                                                    <Text style={[styles.sectionTitle, { color: ThemeColors.CLR_WHITE }]}>View All  </Text>
                                                </TouchableOpacity>
                                                {/* </ScrollView> */}

                                            </View>
                                            :
                                            // <ThemeFullPageLoader />
                                            null
                                        }
                                        {/* Bar List End */}
                                    </View>
                                </ScrollView>
                            </>
                        )
                    }
                </View>
            </SafeAreaView >
        )
    }
}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
// export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    whiskeyText: {
        fontSize: 18,
        fontWeight: '500',
        color: ThemeColors.THEME_COLOR
    },
    ViewAll: {
        fontSize: 13,
        fontWeight: '400',
        color: ThemeColors.THEME_COLOR,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: ThemeColors.THEME_COLOR,
        paddingLeft: 8,
        //backgroundColor:"powderblue"
    },
    selectedTabText: {
        color: ThemeColors.CLR_TAB,
    },
    selectedTabBorder: {
        backgroundColor: ThemeColors.CLR_TAB,
        height: 4,
        top: '50%',
    },
    tabText: {
        color: '#000000',
    },
    label: {
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontWeight: '400',
        marginHorizontal: 20
    },
    noLabel: {
        display: 'none',
        height: 0,
    },
    promotionsImg: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: 360,
        height: 180,
    },

})