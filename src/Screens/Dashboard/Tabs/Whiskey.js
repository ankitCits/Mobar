import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import images from '../../../assets/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BarCard from '../../../Component/BarCard';
import CategoryCard from '../../../Component/CategoryCard';
import ComboOfferCard from '../../../Component/ComboOfferCard';

export default class Whiskey extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            margin: 15,
            marginTop: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '5%',
            }}>
            <Text style={styles.whiskeyText}>Whiskey</Text>
            <TouchableOpacity>
              <Text style={styles.ViewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {this.props.data ? (
            <View style={{ marginTop: '7%' }}>
              <FlatList
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.props.data.drinkCategory}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <>
                    {item.name == 'Whiskey' ? (
                      <CategoryCard navigation={this.props.navigation} item={item} hostUrl={this.props.data.hostUrl} />
                    ) : null}
                  </>
                )}
              />
              {/* Combo Offer */}
              <View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.whiskeyText}>Combos</Text>
                  <TouchableOpacity>
                    <Text style={styles.ViewAll}>View All</Text>
                  </TouchableOpacity>
                </View>
                {/* <ScrollView
                  horizontal
                  nestedScrollEnabled> */}
                {
                  this.props.data && this.props.data.comboDatas.length > 0 ?
                    this.props.data.comboDatas.map((item, index) => (
                      <ComboOfferCard navigation={this.props.navigation} item={item} hostUrl={this.props.data.hostUrl} />
                    ))
                    : null
                }
                {/* </ScrollView> */}
              </View>
              {/* Combo Offer */}

              <View
                style={{
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '8%',
                  }}>
                  <Text style={styles.whiskeyText}>Bars</Text>
                  <TouchableOpacity>
                    <Text style={styles.ViewAll}>View All</Text>
                  </TouchableOpacity>
                </View>

                {/* Bar Slider */}
                <ScrollView
                  horizontal
                  nestedScrollEnabled>
                  {this.props.data && this.props.data.barDatas.length > 0
                    ? this.props.data.barDatas.map((item, index) => (
                      <BarCard navigation={this.props.navigation} item={item} hostUrl={this.props.data.hostUrl} />
                    ))
                    : null}
                </ScrollView>
                {/* Bar Slider */}

              </View>

            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  whiskeyText: {
    fontSize: 18,
    fontWeight: '500',
  },
  ViewAll: {
    fontSize: 13,
    fontWeight: '400',
    color: '#711323',
  },
});
