import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';

export default class SelectInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.items,
            isToggle: this.props.visible,
            selectedItem: this.props.selectedItems,
        };
        setTimeout(() => {
            //console.log("const > selected items",this.props.items);
        }, 500);
    }

    toggle = () => {
        this.setState({ isToggle: !this.state.isToggle });
    };

    onSelected = (value) => {
        const selectedItem = {
            id: value.id,
            title: value.title,
        }
        this.setState({ selectedItem: selectedItem });
        this.props.onChange(value);
        this.toggle();
    };

    render() {
        return (
            <>
                <View style={styles.sectionStyle} key={this.state.selectedItem.id}>
                    <View style={styles.accordianTitle}>
                        <Text onPress={() => this.toggle()}
                            style={styles.inputText}
                        > {this.state.selectedItem != null ? this.state.selectedItem.title : 'Select Product'}</Text>
                        <Icon
                            name="expand-more"
                            size={28}
                            color="#424242"
                            style={styles.imageStyle}
                        />
                    </View>
                    {
                        this.props.items &&
                        this.props.items.length > 0 &&
                        this.props.items.map((item, index) => {
                            return (
                                <>
                                    <TouchableOpacity onPress={() => this.onSelected(item)} key={index} style={{ zIndex: 1 }}>
                                        <View style={[styles.sectionStyle, this.state.isToggle ? styles.collapsed : styles.hide, this.state.selectedItem.title == item.title ? styles.selected : '']} key={index}>
                                            <Text style={styles.inputText}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </>
                            )
                        }
                        )
                    }
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({

    sectionStyle: {
        flexDirection: 'column',
        alignSelf: 'center',
        backgroundColor: ThemeColors.CLR_WHITE,
        borderWidth: 0,
        borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        height: 48,
        width: 320,
        borderTopLeftRadiusRadius: 10,
        borderTopRightRadiusRadius: 10,
        elevation: 4,
        zIndex: 5
    },
    collapsed: {
        flexDirection: 'row',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'flex-start',
        backgroundColor: ThemeColors.CLR_WHITE,
        borderBottomWidth: 1,
        borderBottomColor: '#c3c3c3',
        borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        height: 48,
        width: 320,
        elevation: 4,
    },
    accordianTitle: {
        flexDirection: 'row',
        alignContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c3c3c3',
        //marginBottom:15,
        alignItems: 'center',
        height: 48,
        alignSelf: 'center'
    },
    hide: {
        height: 0
    },
    selected: {
        borderColor: "#AB1731",
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderLeftWidth: 5,
    },
    inputText: {
        fontFamily: FontFamily.TAJAWAL_REGULAR,
        fontWeight: '400',
        fontSize: 15,
        flex: 1,
        padding: 10,
        color: ThemeColors.CLR_DARK_GREY
    },

})