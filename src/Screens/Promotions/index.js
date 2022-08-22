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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchPromotionDetails } from '../../api/vendor';
import images from '../../assets/images';
import BarCard from '../../Component/BarCard';
import PromotionCard from '../../Component/PromotionCard';
import { FontFamily } from '../../Theme/FontFamily';
import { ThemeColors } from '../../Theme/ThemeColors';
import styles from './styles'
export default class Promotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      promotion: [],
      hostUrl: ''
    };
  }

  componentDidMount() {
    this.getPromotion();
  }

  getPromotion = async () => {
    try {
      const data = {
        latitude: 1.28668,
        longitude: 103.853607
      };
      const promotion = await fetchPromotionDetails(data);
      this.setState({ promotion: promotion.response.result.promotionList, hostUrl: promotion.response.result.hostUrl });

    } catch (error) {
      console.log("Promotion > Catch > Error", error);
    }

  }

  renderPromotion = (item, index) => {
    if (item.type == 1) {
      return (
        <BarCard navigation={this.props.navigation} index={index} item={item.ecom_ae_vendor} hostUrl={this.state.hostUrl} />
      );
    } else {
      return (
        <PromotionCard navigation={this.props.navigation} index={index} item={item} hostUrl={this.state.hostUrl} />
      );
    }
  }

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
          <ScrollView>
            <View
              style={styles.cardContainer}>
              <FlatList
                data={this.state.promotion}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => this.renderPromotion(item, index)}
              />
              <View
                style={styles.banner}>
                <Image
                  resizeMode={'cover'}
                  source={images.promotionBanner}
                  defaultSource={images.promotionBanner}
                />
              </View>
            </View>
          </ScrollView>
        </>
      </SafeAreaView>
    );
  }
}

