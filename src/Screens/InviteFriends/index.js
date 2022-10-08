import React, { Component } from 'react';
import { StyleSheet, Text, Platform, ToastAndroid, TouchableOpacity, View } from 'react-native';

import HTMLView from 'react-native-htmlview';


import { inviteShare } from '../../api/common';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import { FontFamily } from '../../Theme/FontFamily';
import Share from 'react-native-share';
import { ThemeColors } from '../../Theme/ThemeColors';
import HeaderSide from '../Component/HeaderSide';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showToaster } from '../../api/func';

export default class InviteFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageData: null,
            isLoading: true,
            title: null,
            shareLink: null,
            referLink: null,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    onShare = async () => {
        try {
            const options = Platform.select({
                default: {
                    title: this.state.title,
                    subject: this.state.title,
                    message: this.state.shareLink,
                },
            });
            await Share.open(options);
        } catch (error) {
            console.log("InviteFriends > onShare > catch > ", error);
        }
    }

    fetchData = async () => {
        try {
            const res = await inviteShare();
            this.setState({
                isLoading: false,
                title: res.response.result.pageData.title,
                shareLink: res.response.result.referLink,
                pageData: res.response.result.pageData.content
            })
            console.log(res);
        } catch (error) {
            showToaster(error[0])
            console.log("Invite Friends > Fetch data > catch >", error);
        }
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <HeaderSide
                    name={'Invite Your Friends'}
                    onClick={() => this.props.navigation.pop()}
                />
                <View style={styles.content}>
                    {this.state.isLoading ?
                        <>
                            <ThemeFullPageLoader />
                        </>
                        :
                        <HTMLView value={this.state.pageData} />

                    }
                    <View style={{ fontSize: 20, fontWeight: 500, padding: 15, paddingTop: 15, flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
                        <Text style={{ color: 'black' }}>
                            Your Referral link is :
                        </Text>
                        <Text style={{}}>{this.state.shareLink}</Text>
                    </View>
                    {!this.state.isLoading &&
                        <TouchableOpacity
                            style={styles.btnInvite}
                            onPress={() => this.onShare()}
                        >
                            <Text
                                style={{
                                    fontFamily: FontFamily.TAJAWAL_REGULAR,
                                    fontWeight: '700',
                                    fontSize: 20,
                                    color: ThemeColors.CLR_WHITE,
                                }}>
                                Invite Friends
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </SafeAreaView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ThemeColors.CLR_WHITE,
    },
    content: {
        margin: 10,
        padding: 10
    },
    btnInvite: {
        backgroundColor: ThemeColors.CLR_TAB,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignSelf: 'center',
    },
    link: {
        fontSize: 20,
        fontWeight: 500,
        padding: 15,
        paddingTop: 15,
        flexDirection: "row",
        justifyContent: "center"
    },
});