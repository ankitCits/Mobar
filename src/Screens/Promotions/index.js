import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchPromotionDetails } from '../../api/vendor';
import images from '../../assets/images';
import BarCard from '../../Component/BarCard';
import PromotionCard from '../../Component/PromotionCard';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
import styles from './styles'
import { connect } from 'react-redux';

class Promotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      promotion: [],
      hostUrl: '',
      refreshing: false
    };
  }

  componentDidMount() {
    this.getPromotion();
  }

  onRefresh = async () => {
    await this.getPromotion();
  }


  getPromotion = async () => {
    try {
      const data = {
        latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : '',
        longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : '',
      };
      const promotion = await fetchPromotionDetails(data);
      this.setState({
        promotion: promotion.response.result.promotionList,
        hostUrl: promotion.response.result.hostUrl
      });
    } catch (error) {
      console.log("Promotion > Catch > Error", error);
    }

  }

  renderPromotion = (item, index) => {
   // console.log(item);
    if (item.type == 1) {
      return (
        <View style={{ marginHorizontal: 15, }}>
          <BarCard navigation={this.props.navigation} index={index} item={item.ecom_ae_vendor} hostUrl={this.state.hostUrl} />
        </View>
      );
    } else {
      return (
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <PromotionCard navigation={this.props.navigation} index={index} item={item} hostUrl={this.state.hostUrl} />
        </View>
      );
    }
  }

  footerComponent = () =>
    <View
      style={styles.banner}>
      <Image
        resizeMode={'cover'}
        source={images.promotionBanner}
        defaultSource={images.promotionBanner}
      />
    </View>


  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View
          style={styles.headerContainer}>
          <View
            style={styles.header}>

            <View style={styles.headerLeft}>
              <Text style={styles.title}>
                Promotions
              </Text>
            </View>
          </View>
        </View>
        {/* Header Ends */}
        <>
          {/* <ScrollView > */}
          <View
            style={styles.cardContainer}>
            <FlatList
              data={this.state.promotion}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => this.renderPromotion(item, index)}
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
              }
              // ListFooterComponent={this.footerComponent()}
            />

          </View>
          {/* </ScrollView> */}
        </>
      </SafeAreaView>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);
