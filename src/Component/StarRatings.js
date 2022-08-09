import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = { size: this.props.size };
    }

    render() {
        const {
            isEdit = true,
            size = 0,
        } = this.props
        return (
            <View style={styles.containerStyle}>
                {[...Array(5)].map((star, index) => {
                    return (
                        isEdit ?
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    this.setState({ size: ++index })
                                }
                            >
                                <Icon
                                    key={index}
                                    name="star"
                                    size={16}
                                    color={index < this.state.size ? '#FAB914' : '#DADADA'}
                                    style={{ marginTop: 2 }}
                                />
                            </TouchableOpacity>
                            :
                            <Icon
                                key={index}
                                name="star"
                                size={16}
                                color={index < size ? '#FAB914' : '#DADADA'}
                                style={{ marginTop: 2 }}
                            />
                    )
                })
                }
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