import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import { getAccessToken, removeAccessToken } from '../localstorage';
import { A_KEY, BASE_URL } from '../config';
import LoginButton from '../Component/LoginButton';
import { FontFamily } from '../Theme/FontFamily';
import { ThemeColors } from '../Theme/ThemeColors';
import { setUserDetail } from '../Redux/actions/auth';
import { loggedOut } from '../Redux/actions/product';



class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerIndex: 0,
    };
  }

  onPressFun = screen => {
    console.log("drawer Index",screen);
    if (screen == 'MyBottomTabs') {
      this.setState({ drawerIndex: 0 });
    }
    if (screen == 'MyProfile') {
      this.setState({ drawerIndex: 1 });
    }
    if (screen == 'ChangePassword') {
      this.setState({ drawerIndex: 2 });
    }
    if (screen == 'OrderHistory') {
      this.setState({ drawerIndex: 3 });
    }
    if (screen == 'HelpSupport') {
      this.setState({ drawerIndex: 5 });
    }
    if (screen == 'About') {
      this.setState({ drawerIndex: 6 });
    }
    this.props.navigation.navigate(screen);
  };

  loggedOut = async () => {
    try {
      const response = await loggedOut();
      if (response.status == 'SUCCESS') {
        this.props.dispatch(setUserDetail(null));
        this.reStart();
      }
    } catch (error) {
      console.log("Password > Update PAssword > error",error);
      ToastAndroid.showWithGravity(
        'Internet Issue!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
    );
    }
  };

  reStart = async () => {
    await removeAccessToken();
    RNRestart.Restart();
  };

  render() {
    var drawerIndex = this.state.drawerIndex;
    console.log("========>>>>", this.props.redux)
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={
            Platform.OS === 'android' ? 'dark-content' : 'light-content'
          }
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => this.props.navigation.closeDrawer()}>
              <Icon name="arrow-back" size={30} color="#424242" />
            </TouchableOpacity>
            <Text style={styles.menuTitle}>My Account</Text>
            <Text></Text>
          </View>
          {this.props.redux ? (
            <View style={styles.profileContainer}>
              <View
                style={styles.profileDetails}>
                <View>
                  <Icon name="account-circle" size={50} color={ThemeColors.CLR_TAB} />
                </View>
                <View>
                  <Text style={styles.profileTitle}>
                    {this.props.redux ? this.props.redux.name : 'User'}
                  </Text>
                  <View
                    style={styles.profileSubContainer}>
                    <Icon name="location-on" size={15} color={ThemeColors.CLR_TAB} />
                    <Text
                      style={styles.profileSubHeader}>
                      {this.props.redux
                        ? this.props.redux.address
                        : 'Singapore'}
                    </Text>
                    <TouchableOpacity
                      style={styles.editBtnContainer}>
                      <Text
                        style={styles.editBtnText}>
                        Change
                      </Text>
                      <Icon
                        name="edit"
                        size={10}
                        color={ThemeColors.CLR_TAB}
                        style={styles.editIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <LoginButton title={'Login'} />
          )}

          <View style={styles.menuItemContainer}>
              <View style={[drawerIndex == 0 ? styles.selectedItem :'']}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => this.onPressFun('MyBottomTabs')}>
                  <Icon name="home" size={28} color={drawerIndex == 0 ? ThemeColors.CLR_WHITE : ThemeColors.CLR_TAB} />
                  <Text style={[styles.listText,drawerIndex == 0 ? styles.selectedTextColor : '']}>Home</Text>
                </TouchableOpacity>
              </View>
            {this.props.redux && 
            <>
                <View style={[drawerIndex == 1 ? styles.selectedItem :'']}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => this.onPressFun('MyProfile')}>
                    <Icon name="account-circle" size={28} color={drawerIndex == 1 ? ThemeColors.CLR_WHITE : ThemeColors.CLR_TAB} />
                    <Text style={[styles.listText,drawerIndex == 1 ? styles.selectedTextColor : '']}>My Profile</Text>
                  </TouchableOpacity>
                </View>
                <View style={[drawerIndex == 2 ? styles.selectedItem : '']}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => this.onPressFun('ChangePassword')}
                    >
                    <Icon name="vpn-key" size={28} color={drawerIndex == 2 ? ThemeColors.CLR_WHITE : ThemeColors.CLR_TAB} />
                    <Text style={[styles.listText,drawerIndex == 2 ? styles.selectedTextColor : '']}>Change Password</Text>
                  </TouchableOpacity>
                </View>
                <View style={[drawerIndex == 3 ? styles.selectedItem : '']}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => this.onPressFun('OrderHistory')}>
                    <Icon name="schedule" size={28} color={drawerIndex == 3 ? ThemeColors.CLR_WHITE : ThemeColors.CLR_TAB} />
                    <Text style={[styles.listText,drawerIndex == 3 ? styles.selectedTextColor : '']}>Order History</Text>
                  </TouchableOpacity>
                </View>
                <View style={[drawerIndex == 4 ? styles.selectedItem : '']}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => this.onPressFun('share')}
                  >
                    <Icon name="share" size={26} color={drawerIndex == 4 ? ThemeColors.CLR_WHITE : ThemeColors.CLR_TAB} />
                    <Text style={[styles.listText,drawerIndex == 4 ? styles.selectedTextColor : '']}>
                      Invite Your Friends
                    </Text>
                  </TouchableOpacity>
                </View>
                </>
            }
             <View style={[ drawerIndex == 5 ? styles.selectedItem : '']}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => this.onPressFun('HelpSupport')}>
                  <Icon name="support-agent" size={28} color={drawerIndex == 5 ? ThemeColors.CLR_WHITE : ThemeColors.CLR_TAB} />
                  <Text style={[styles.listText,drawerIndex == 5 ? styles.selectedTextColor : '']}>Help & Support</Text>
                </TouchableOpacity>
              </View>
              <View style={[drawerIndex == 6 ? styles.selectedItem:'']}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => this.onPressFun('About')}>
                  <Icon name="info" size={28} color={drawerIndex == 6 ? ThemeColors.CLR_WHITE : ThemeColors.CLR_TAB} />
                  <Text style={[styles.listText,drawerIndex == 6 ? styles.selectedTextColor:'']}>About</Text>
                </TouchableOpacity>
              </View>
               { this.props.redux ? (  <View style={[drawerIndex == 7 ? styles.selectedItem:'']}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => this.loggedOut()}>
                  <Icon name="phonelink-lock" size={28} color={ThemeColors.CLR_TAB} />
                  <Text style={[styles.listText,drawerIndex == 7 ? styles.selectedTextColor:'']}>Sign out</Text>
                </TouchableOpacity>
              </View>):
              null}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: ThemeColors.CLR_WHITE,
  },
  menuTitle:{
    fontSize: 18, 
    color: ThemeColors.CLR_DARK_GREY, 
    fontFamily: FontFamily.TAJAWAL_BOLD
  },
  header:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  profileContainer:{
    marginTop: '10%',
  },
  profileDetails:{
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius:14,
    height: 60,
    borderColor: '#D41335',
    alignItems: 'center',
    padding: 5
  },
  profileTitle:{
    fontSize: 17,
    fontFamily:FontFamily.TAJAWAL_REGULAR, 
    fontWeight: '700',
    color:ThemeColors.CLR_DARK_GREY
  },
  profileSubHeader:{
    marginLeft: 2,
    fontFamily:FontFamily.ROBOTO_REGULAR,
    fontSize: 12,
    color:'#3C3C3C',
    fontWeight: '500'
  },
  profileSubContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtnContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  editBtnText:{
    fontSize: 10,
    color: '#A1172F',
    fontWeight: '400',
    fontFamily:FontFamily.ROBOTO_REGULAR
  },
  editIcon:{
    marginTop: 2, 
    marginLeft: 5
  },
  menuItemContainer:{
    marginTop:30
  },
  selectedItem:{
    backgroundColor: '#A1172F',
    color:ThemeColors.CLR_WHITE,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 20,
  },
  listText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    color:ThemeColors.CLR_DARK_GREY
  },
  selectedTextColor:{
    color: ThemeColors.CLR_WHITE,
  },
});

// dispatcher functions
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

//getting props from redux
function mapStateToProps(state) {
  let redux = state.auth.userData;
  return { redux };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
