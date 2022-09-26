import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
import HeaderSide from '../Component/HeaderSide';

export default class FAQs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            faqData: props.route.params.data,
            data: props.route.params.selectedItem,
            selectedItem: 0,
            isCollapsed: false,
        }
    }

    toggle = (index) => {
        this.setState({ isCollapsed: !this.state.isCollapsed, selectedItem: index });
    }

    changeFAQCategory = (data, selectedItem) => {
        this.setState({
            faqData: data,
            data: selectedItem
        })
    }

    render() {
        return (
            <SafeAreaView
                style={styles.container}>
                <HeaderSide
                    name={'FAQs'}
                    onClick={() => this.props.navigation.pop()}
                />

                <ScrollView>
                    <View style={styles.title}><Text style={styles.titleText}>{this.state.data.CategoryName}</Text></View>
                    {
                        this.state.data.z_faqs.map((item, index) => (
                            <>
                                <View style={[styles.helpBottom, this.state.isCollapsed && index == this.state.selectedItem ? styles.collapsed : '']}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.toggle(index)
                                        }}
                                        style={styles.helpBottomList}>
                                        <Text style={styles.helpBottomListText}>{item.question.substr(0, 30)}</Text>
                                        <Icon
                                            name="expand-more"
                                            size={30}
                                            color={ThemeColors.CLR_DARK_GREY}
                                            style={styles.imageStyle}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.underLine} />
                                    {index == this.state.selectedItem &&
                                        <View style={styles.show}>
                                            <Text
                                                style={styles.answerText}>
                                                {item.answer}
                                            </Text>
                                        </View>
                                    }
                                </View>
                            </>
                        ))}
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Other FAQs</Text>
                        <Icon
                            name="help-outline"
                            size={20}
                            color={ThemeColors.CLR_DARK_GREY}
                            style={styles.imageStyle}
                        />
                    </View>
                    <View style={styles.otherFaqs}>
                        {
                            this.state.faqData.map((item, index) => (
                                <>
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            this.changeFAQCategory(this.state.faqData, item);
                                        }}
                                        style={styles.helpBottomList}>
                                        <Text style={styles.helpBottomListText}>{item.CategoryName}</Text>
                                        <Icon
                                            name="expand-more"
                                            size={30}
                                            color={ThemeColors.CLR_DARK_GREY}
                                            style={styles.imageStyle}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.underLine} />
                                </>
                            ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ThemeColors.CLR_BG,
        flex: 1
    },
    title: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-end',
        paddingVertical: 15,
        margin: 0,
    },
    titleText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: '500',
        color: '#4D4F50'
    },
    helpBottom: {
        width: 365,
        alignSelf: 'center',
        backgroundColor: ThemeColors.CLR_WHITE,
        shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: '5%',
        borderRadius: 10,
    },
    collapsed: {
        height: 'auto',
    },
    helpBottomList: {
        margin: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    helpBottomListText: {
        fontSize: 16,
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '500',
        padding: 5,
        color: '#4D4F50',
    },
    underLine: {
        backgroundColor: '#DADADA',
        height: 1,
    },
    show: {
        margin: 13
    },
    answerText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '500',
        fontSize: 12,
        color: '#4D4F50'
    },
    otherFaqs: {
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        width: 365,
        marginHorizontal: 15,
        marginBottom: 15,
        alignSelf: 'center'
    }
});