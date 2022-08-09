import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import CategoryCard from '../../../Component/CategoryCard';
import { colors } from '../../../Theme/colors';

export default class Whiskey extends Component {
  constructor(props) {
    // console.log('Whiskey', props);
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.CLR_WHITE,
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
                    {item.name == this.props.title ? (
                      <CategoryCard navigation={this.props.navigation} item={item} hostUrl={this.props.data.hostUrl} />
                    ) : null}
                  </>
                )}
              />

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
    color: colors.THEME_COLOR
  },
  ViewAll: {
    fontSize: 13,
    fontWeight: '400',
    color: '#711323',
  },
});
