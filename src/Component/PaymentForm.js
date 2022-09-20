import React, { Component } from 'react';
import { View } from 'react-native';
import { CardField, onCardChange } from '@stripe/stripe-react-native';


export default class PaymentForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={onCardChange}
                />
            </View>
        );
    }
};

