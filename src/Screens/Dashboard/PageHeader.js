import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ToastAndroid,

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { screenHeight } from '../../Theme/Matrices';
import { fetchBanner } from '../../api/common';
import ThemeFullPageLoader from '../../Component/ThemeFullPageLoader';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class PageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            hostUrl: '',
        }
    }

    componentDidMount = async () => {
        await this.getBanners();
    }

    getBanners = async () => {
        try {
            const re = await fetchBanner();
            this.setState({ data: re.response.result.data, hostUrl: re.response.result.hostUrl })
        } catch (error) {
            ToastAndroid.showWithGravity(
                error,
                ToastAndroid.LONG,
                ToastAndroid.TOP,
            );
            console.log('getBanners', error);
        }
    }


    renderSliderImage = ({ item, index }) => {
        return (
            <View
                key={index}
                style={{
                    alignItems: 'center',
                    backgroundColor: 'white',
                    marginTop: 10,
                }}>
                <Image
                    resizeMode="cover"
                    resizeMethod="resize"
                    style={{ width: viewportWidth - 30, height: 200 }}
                    defaultSource={images.Dashboard}
                    // source={images.Dashboard} 
                    source={{ uri: `${this.state.hostUrl + item.slider}` }}
                />
            </View>

        );
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                {/* Search Bar */}
                <View style={{ alignSelf: 'center', marginTop: -5 }}>
                    <TouchableOpacity
                        style={styles.sectionStyle}
                        onPress={() => this.props.navigation.navigate('Product')}
                    >
                        <Icon
                            name="search"
                            size={28}
                            color="#A39B9B"
                            style={styles.imageStyle}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            placeholder="Search for Drinks..."
                            underlineColorAndroid="transparent"
                            editable={false}
                            selectTextOnFocus={false}
                        />
                        <TouchableOpacity>
                            <Icon
                                name={'filter-list'}
                                size={22}
                                color="#A39B9B"
                                style={styles.imageStyle}
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

                {/* Slider */}
                {this.state.data.length == 0 &&
                    <ThemeFullPageLoader />
                }

                {this.state.data.length > 0 &&
                    <View style={{ alignItems: 'center', marginTop: -15, height: screenHeight(26) }}>
                        <View style={{ marginVertical: 10 }}>
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.data}
                                renderItem={this.renderSliderImage}
                                sliderWidth={viewportWidth}
                                sliderHeight={viewportWidth}
                                itemWidth={viewportWidth}
                                inactiveSlideOpacity={0}
                            />
                        </View>
                    </View>
                }

            </View>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);

const styles = StyleSheet.create({
    sectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        borderWidth: 0,
        borderColor: '#000',
        height: 40,
        width: 360,
        borderRadius: 5,
        margin: 10,
        elevation: 2,
    },
    imageStyle: {
        margin: 5,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
});
