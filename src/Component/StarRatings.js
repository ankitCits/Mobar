import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily } from "../Theme/FontFamily";

export default class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }
    
    //  _incrementCount() {
    //     this.setState = ({
    //       count: count + 1
    //     });
    //   }
    render() {
        const {
            isEdit = true,
            size = 0,
            rating = size
        } = this.props
        console.log("edit =>",isEdit);
        console.log("rating =>",rating);
        return (
            <View style={styles.containerStyle}>
                {[...Array(5)].map((star, index) => {
                    return (
                    //console.log("index",index)
                    isEdit ?
                            <Icon
                                name="star"
                                size={16}
                                color={index < rating ? "#FAB914" : '#DADADA'}
                                //onPress={() => _incrementCount(++index)}
                                style={{ marginTop: 2 }}
                            />
                            :
                            <Icon
                                name="star"
                                size={16}
                                color={index < rating ? "#FAB914" : '#DADADA'}
                                style={{ marginTop: 2 }}
                            />
               )
            })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row'
    },
    textStyle: {
        letterSpacing: 1,
        fontFamily: FontFamily.ROBOTO_Medium
    },
    star: {
        marginVertical: 10,
        marginHorizontal: 1,
        marginLeft:10
    },
    on: {
         color: '#FAB914',
    },
    off: {
        color: '#ccc'
    }
});