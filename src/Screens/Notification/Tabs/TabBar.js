import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const activeTab = label => {
  return (
    <View
      style={{
        height: 50,
        margin: 0,
        padding: 5,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        width: label == 'Promotions' ? 100 : 65,
      }}>
      <View style={{marginLeft: '10%'}}>
        <Icon
          name={
            label === 'All'
              ? 'done-all'
              : label == 'Drinks'
              ? 'wine-bar'
              : label == 'Bars'
              ? 'liquor'
              : 'campaign'
          }
          size={22}
          color="#AC3449"
          style={styles.iconStyle}
        />
        <Text
          style={{
            color: '#4D4F50',
            fontSize: 12,
            // marginTop:1,
            fontWeight: '500',
            alignSelf: 'center',
            // marginLeft: 10,
          }}>
          {label}
        </Text>
      </View>
      <View style={styles.underlinePicker} />
    </View>
  );
};

const inactiveTab = label => {
  return (
    <View
      style={{
        height: 50,
        margin: 0,
        padding: 5,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        width: label == 'Promotions' ? 100 : 65,
      }}>
      <View style={{marginLeft: '10%'}}>
        <Icon
          name={
            label === 'All'
              ? 'done-all'
              : label == 'Drinks'
              ? 'wine-bar'
              : label == 'Bars'
              ? 'liquor'
              : 'campaign'
          }
          size={22}
          color="#A1A1A1"
          style={styles.iconStyle}
        />
        <Text
          style={{
            color: '#A1A1A1',
            fontSize: 12,
            // marginTop:1,
            fontWeight: '500',
            alignSelf: 'center',
            // marginLeft: 10,
          }}>
          {label}
        </Text>
        <View style={styles.underlinePicker} />
      </View>
    </View>
  );
};

const MyTabBar = ({state, descriptors, navigation, position}) => (
  <View style={{height: 50, marginBottom: 10}}>
    <ScrollView horizontal={true} style={styles.topTab}>
      <View style={styles.parentTab}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          // let undefined = '';
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              console.log('event', navigation);
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const inputRange = state.routes.map((_, i) => i);
          const opacity = 1;

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                backgroundColor: 'transparent',
                borderRadius: 80,
                paddingLeft: 10,
                justifyContent: 'space-between',
                paddingLeft: 20,
              }}>
              <View>{isFocused ? activeTab(label) : inactiveTab(label)}</View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  </View>
);

const mapStateToProps = state => ({
  //currentLanguage: state.SettingReducer.language || 'en',
});

export default MyTabBar;

const styles = StyleSheet.create({
  tabButton: {
    height: 50,
    margin: 0,
    padding: 5,
    borderRadius: 20,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: 80,
  },
  parentTab: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowRadius: 20,
    elevation: 2,
    justifyContent: 'center',
  },
  underlinePicker: {
    backgroundColor: '#711323',
    height: 3,
    top: '75%',
    // width: 100,
    // left: 20,
  },
  topTab: {
    height: 35,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 5,
    borderColor: '#fff',
    // borderBottomLeftRadius:20,
    // borderBottomRightRadius:20,
    elevation: 2,
  },
  iconStyle: {
    alignSelf: 'center',
  },
});
