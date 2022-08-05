import React, { Component } from "react";
import {
    View,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }
    
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
                    
                    isEdit ?
                            <Icon
                                name="star"
                                size={16}
                                
                                color='#DADADA'
                                
                                style={{ marginTop: 2 }}
                            />
                            :
                            <Icon
                                name="star"
                                size={16}
                                
                                color='#DADADA'
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
    },
});