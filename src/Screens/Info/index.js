import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllPages } from '../../api/product';
import NoContentFound from '../../Component/NoContentFound';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';
import HeaderSide from '../Component/HeaderSide';
export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            aboutUs: 'About Us',
            termCondition: 'Term & Condition',
            privacyPolicy: 'Privacy Policy'
        };
    }

    getHelp = async () => {
        try {
            this.setState({ isLoading: true });
            const response = await getAllPages();
            const title = this.props.route.params.title.toString();
            if (title == this.state.aboutUs) {
                this.setState({ data: response.response.result.aboutUs.content, isLoading: false });
            } else if (title == this.state.termCondition) {
                this.setState({ data: response.response.result.termCondition.content, isLoading: false });
            } else if (title == this.state.privacyPolicy) {
                this.setState({ data: response.response.result.privacyPolicy.content, isLoading: false });
            } else {
                this.setState({ isLoading: false });
            }
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }


    componentDidMount() {
        this.getHelp();
    }

    render() {
        return (
            <SafeAreaView
                style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor="#fff"
                    barStyle={'dark-content'}
                />
                <HeaderSide
                    name={this.props.route.params.title}
                    onClick={() => this.props.navigation.pop()}
                />
                  {
                            this.state.isLoading ?
                                <ThemeFullPageLoader size="small" color="#ffffff" />
                                :
                <ScrollView>
                    <View style={styles.details}>
                      
                                {this.state.data != null ?
                                    <HTMLView value={this.state.data} />
                                    :
                                    <NoContentFound />
                                }
                      
                    </View>
                </ScrollView>
    }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    details: {
        margin: 15
    }
});
