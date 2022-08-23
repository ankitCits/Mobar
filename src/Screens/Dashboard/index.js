import React, { Component, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ToastAndroid,
    SafeAreaView,
    TouchableOpacity,
    Text,
    ScrollView,
    Animated,
    ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../Component/Header';
import { A_KEY, BASE_URL, MY_HEADER } from '../../config';
import { ThemeColors } from '../../Theme/ThemeColors';
import { TabView, TabBar } from 'react-native-tab-view';

import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { getAccessToken } from '../../localstorage';
import PageHeader from './PageHeader';
import ComboOfferCard from '../../Component/ComboOfferCard';
import BarCard from '../../Component/BarCard';
import ProductSliderRoute from './ProductSliderRoute';
import { FontFamily } from '../../Theme/FontFamily';

import { setUserDetail } from '../../Redux/actions/auth';
import { getUserDetails } from '../../api/auth';
import images from '../../assets/images';


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
            routes: []
            // routes: [
            //     { key: '1', name: 'Whiskey' },
            //     { key: '2', name: 'Beer' },
            //     { key: '3', name: 'Wine' },
            //     { key: '4', name: 'Cocktails' },
            // ],
        };
    }

    componentDidMount() {
        this.getTabDetail();
        this.getDetail();
    }

    componentDidUpdate() {
    }

    getDetail = async () => {
        const token = await getAccessToken(token);
        if (!token) {
            return this.setState({ loader: false });
        }
        const postData = {
            token
        }
        try {
            const responseDetail = await getUserDetails(postData);
            this.setState({ data: responseDetail });
            this.setState({ hostUrl: responseDetail.response.result.hostUrl })
            this.props.dispatch(setUserDetail(responseDetail.response.result.profile));
        } catch (error) {
            this.setState({ loader: false });
            ToastAndroid.showWithGravity(
                error,
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
            console.log('Error_On_Data_Fetch getDetail', error);
        }
    }

    getTabDetail = async () => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        const token = await getAccessToken();
        if (token) {
            myHeaders.append('Token', token);
        }
        let raw = JSON.stringify({
            vendorId: 4,
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
                    console.log("Dashboard > Category",categories);
                    categories.forEach((element, index) => {
                        categories[index].key = index;
                    });
                    this.setState({ routes: categories });
                    this.setState({ drinkObj: result.response.result })
                    this.setState({ loader: false });
                    // console.log("Dash board > Drink Obj",this.state.drinkObj.drinkCategory);
                }
                if (result.errors) {
                    this.setState({ loader: false });
                    ToastAndroid.showWithGravity(
                        result.errors[0].msg,
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                    );
                }
            })
            .catch(error => {
                this.setState({ loader: false });
                ToastAndroid.showWithGravity(
                    'Network Error!',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                );
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
                                        this.props.redux.auth.userData
                                            ? this.props.redux.auth.userData.address
                                            : 'Duxten Road, 338750'
                                    }
                                />
                                <ScrollView
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
                                                            tabStyle={{ backgroundColor: ThemeColors.CLR_WHITE, }}
                                                            style={{ backgroundColor: ThemeColors.CLR_WHITE, }}
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
                                                        <Text style={styles.ViewAll}>View All</Text>
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
                                        <View
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
                                                source={images.promotions2}
                                                defaultSource={images.promotions2}>
                                                <View style={{ marginTop: '10%', marginLeft: '65%' }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            alignItems: 'center',
                                                            borderWidth: 1,
                                                            borderColor: '#fff',
                                                            borderRadius: 10,
                                                            width: 100,
                                                            alignSelf: 'center',
                                                            paddingHorizontal: 10
                                                        }}>
                                                        <Text
                                                            style={{
                                                                color: '#fff',
                                                                fontSize: 13,
                                                                fontWeight: '400',
                                                            }}>
                                                            Redeem Now
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{ alignItems: 'center', marginTop: 7 }}>
                                                        <Text
                                                            style={{
                                                                color: '#fff',
                                                            }}>
                                                            VIRGIN MOJITO
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </ImageBackground>
                                        </View>
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
                                                    <TouchableOpacity>
                                                        <Text style={styles.ViewAll}>View All</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {/* <ScrollView
                                                    horizontal={true}
                                                    nestedScrollEnabled={true}> */}
                                                {
                                                    this.state.drinkObj.barDatas.map((item, index) => (
                                                        <BarCard navigation={this.props.navigation} index={index} item={item} hostUrl={this.state.hostUrl} />
                                                    ))
                                                }
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
        color: ThemeColors.THEME_COLOR
    },
    selectedTabText: {
        color: ThemeColors.CLR_TAB,
    },
    selectedTabBorder: {
        backgroundColor: ThemeColors.CLR_TAB,
        height: 3,
        top: '30%',
    },
    tabText: {
        color: '#000000',
    },
    label: {
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontWeight: '400',
    },
    noLabel: {
        display: 'none',
        height: 0,
    },
    promotionsImg: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: 350,
        height: 181,
    },
    
})