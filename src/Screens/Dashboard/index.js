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
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../Component/Header';
import { A_KEY, BASE_URL, MY_HEADER } from '../../config';
import { colors } from '../../Theme/colors';
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
            // data: {
            //     barDatas: [
            //         { 'vendorShopName': 'Test', 'address': 'Test', 'distance': 100 }
            //     ],
            //     comboDatas: [
            //         { 'name': 'Test', comboPrice: '1', images: '', }
            //     ],
            // },
            data: {},
            drinkObj: {},
            index: 0,
            hostUrl: null,
            routes: [
                { key: '1', title: 'Whiskey' },
                { key: '2', title: 'Beer' },
                { key: '3', title: 'Wine' },
                { key: '4', title: 'Cocktails' },
            ],
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

    getTabDetail = () => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
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
                    this.setState({ drinkObj: result.response.result })
                    this.setState({ loader: false });
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


    renderScene = ({ route, jumpTo }) => {
        return (<ProductSliderRoute routes={route} />);
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
                                    Address={'Duxten Road, 338750'}
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
                                        // marginTop: 0,
                                    }}>
                                        {/* Tab Header */}
                                        <View style={{ flexDirection: 'row', height: 300 }}>
                                            {/* {
                                                this.state.drinkObj && this.state.drinkObj.drinkCategory.length > 0 ?
                                                    this.state.drinkObj.drinkCategory.map((item, index) => (
                                                        <TouchableOpacity key={index}>
                                                            <Text style={{ color: 'black' }}>{item.name}</Text>
                                                        </TouchableOpacity>
                                                    ))
                                                    : null
                                            } */}

                                            <TabView
                                                lazy
                                                navigationState={this.state}
                                                renderScene={this.renderScene}
                                                renderLazyPlaceholder={this._renderLazyPlaceholder}
                                                onIndexChange={this._handleIndexChange}
                                                initialLayout={{ width: Dimensions.get('window').width }}
                                                renderTabBar={props => (
                                                    <TabBar
                                                        {...props}
                                                        indicatorStyle={{ backgroundColor: colors.CLR_WHITE }}
                                                        tabStyle={{ backgroundColor: colors.CLR_WHITE, }}
                                                        style={{ backgroundColor: colors.CLR_WHITE, }}
                                                        renderLabel={({ route }) => (
                                                            <>
                                                                <Text
                                                                    style={[styles.label,
                                                                    route.key === props.navigationState.routes[this.state.index].key
                                                                        ? styles.selectedTabText
                                                                        : styles.tabText
                                                                    ]}>
                                                                    {route.title}
                                                                </Text>
                                                                {
                                                                    route.key === props.navigationState.routes[this.state.index].key &&
                                                                    <View style={styles.selectedTabBorder} />
                                                                }
                                                            </>
                                                        )}
                                                        labelStyle={styles.noLabel}
                                                    />
                                                )}

                                            />
                                        </View>

                                        {/* Combo Offer */}
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
                                            {/* <ScrollView
                                            horizontal
                                            nestedScrollEnabled> */}

                                            {
                                                this.state.drinkObj.comboDatas && this.state.drinkObj.comboDatas.length > 0 ?
                                                    this.state.drinkObj.comboDatas.map((item, index) => (
                                                        <ComboOfferCard navigation={this.props.navigation} item={item} hostUrl={this.state.hostUrl} />
                                                    ))
                                                    : null
                                            }
                                            {/* </ScrollView> */}
                                        </View>
                                        {/* Combo Offer */}

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
                                                <ScrollView
                                                    horizontal
                                                    nestedScrollEnabled>
                                                    {
                                                        this.state.drinkObj.barDatas.map((item, index) => (
                                                            <BarCard navigation={this.props.navigation} index={index} item={item} hostUrl={this.state.hostUrl} />
                                                        ))
                                                    }
                                                </ScrollView>

                                            </View>
                                            :
                                            <ThemeFullPageLoader />
                                        }
                                        {/* Bar List */}
                                    </View>
                                </ScrollView>
                            </>
                        )
                    }
                </View>
            </SafeAreaView>
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
        color: colors.THEME_COLOR
    },
    ViewAll: {
        fontSize: 13,
        fontWeight: '400',
        color: '#711323',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.THEME_COLOR
    },
    ViewAll: {
        fontSize: 13,
        fontWeight: '400',
        color: '#711323',
    },
    selectedTabText: {
        color: colors.CLR_TAB,
    },
    selectedTabBorder: {
        backgroundColor: colors.CLR_TAB,
        height: 3,
        top: '30%',
    },
    tabText: {
        color: '#000000',
    },
    label: {
        fontSize: 15,
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontWeight: '400',
    },
    noLabel: {
        display: 'none',
        height: 0,
    },
})