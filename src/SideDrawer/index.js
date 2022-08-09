import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
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


class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerIndex: 0,
    };
  }


  onPressFun = screen => {
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
    let token = await getAccessToken(token);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/users/signOut`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.response) {
          this.reStart();
        } else {
          ToastAndroid.showWithGravity(
            'Internet Issue',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => console.log('error', error));
  };

  reStart = async () => {
    await removeAccessToken();
    RNRestart.Restart();
  };

  render() {
    var drawerIndex = this.state.drawerIndex;
    // console.log("========>>>>", this.props.redux)
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle={
            Platform.OS === 'android' ? 'dark-content' : 'light-content'
          }
        />
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.closeDrawer()}>
              <Icon name="arrow-back" size={30} color="#424242" />
            </TouchableOpacity>

            <Text style={{ fontSize: 20, color: '#424242', fontFamily: FontFamily.TAJAWAL_BOLD }}>My Account</Text>
            <Text></Text>
          </View>

          {this.props.redux ? (
            <View style={{ marginTop: '10%' }}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 61,
                  borderColor: '#D41335',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <View>
                  <Icon name="account-circle" size={50} color="#711323" />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 17, fontWeight: '700' }}>
                    {this.props.redux ? this.props.redux.name : 'User'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Icon name="location-on" size={12} color="#711323" />
                    <Text
                      style={{ marginLeft: 5, fontSize: 12, fontWeight: '500' }}>
                      {this.props.redux
                        ? this.props.redux.address
                        : 'Singapore'}
                    </Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 5,
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#A1172F',
                          fontWeight: '400',
                        }}>
                        Change
                      </Text>
                      <Icon
                        name="edit"
                        size={10}
                        color="#711323"
                        style={{ marginTop: 2, marginLeft: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <LoginButton title={'Login'} />
          )}

          <View>
            {drawerIndex == 0 ? (
              <View style={{ backgroundColor: '#711323', marginTop: 30 }}>
                <TouchableOpacity
                  style={styles.listItemProfile}
                  onPress={() => this.onPressFun('MyBottomTabs')}>
                  <Icon name="home" size={28} color="#fff" />
                  <Text style={styles.listTextProfile}>Home</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginTop: 30, marginLeft: 30 }}>
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => this.onPressFun('MyBottomTabs')}>
                  <Icon name="home" size={28} color="#711323" />
                  <Text style={styles.listText}>Home</Text>
                </TouchableOpacity>
              </View>
            )}

            {this.props.redux ? (
              drawerIndex == 1 ? (
                <View style={{ backgroundColor: '#711323', marginTop: 15 }}>
                  <TouchableOpacity
                    style={styles.listItemProfile}
                    onPress={() => this.onPressFun('MyProfile')}>
                    <Icon name="account-circle" size={28} color="#fff" />
                    <Text style={styles.listTextProfile}>My Profile</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ marginTop: 2, marginLeft: 30 }}>
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => this.onPressFun('MyProfile')}>
                    <Icon name="account-circle" size={28} color="#711323" />
                    <Text style={styles.listText}>My Profile</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : null}

            {this.props.redux ? (
              drawerIndex == 2 ? (
                <View style={{ backgroundColor: '#711323', marginTop: 15 }}>
                  <TouchableOpacity
                    style={styles.listItemProfile}
                    onPress={() => this.onPressFun('ChangePassword')}>
                    <Icon name="vpn-key" size={28} color="#fff" />
                    <Text style={styles.listTextProfile}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ marginTop: 2, marginLeft: 30 }}>
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => {
                      console.log('cccccc');
                      this.onPressFun('ChangePassword');
                    }}>
                    <Icon name="vpn-key" size={28} color="#711323" />
                    <Text style={styles.listText}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : null}

            {this.props.redux ? (
              drawerIndex == 3 ? (
                <View style={{ backgroundColor: '#711323', marginTop: 15 }}>
                  <TouchableOpacity
                    style={styles.listItemProfile}
                    onPress={() => this.onPressFun('OrderHistory')}>
                    <Icon name="schedule" size={28} color="#fff" />
                    <Text style={styles.listTextProfile}>Order History</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ marginTop: 2, marginLeft: 30 }}>
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => this.onPressFun('OrderHistory')}>
                    <Icon name="schedule" size={28} color="#711323" />
                    <Text style={styles.listText}>Order History</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : null}

            {this.props.redux ? (
              drawerIndex == 4 ? (
                <View style={{ backgroundColor: '#711323', marginTop: 15 }}>
                  <TouchableOpacity
                    style={styles.listItemProfile}
                  // onPress={() => this.onPressFun('share')}
                  >
                    <Icon name="share" size={26} color="#fff" />
                    <Text style={styles.listTextProfile}>
                      Invite Your Friends
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ marginTop: 2, marginLeft: 30 }}>
                  <TouchableOpacity
                    style={styles.listItem}
                  // onPress={() => this.onPressFun('share')}
                  >
                    <Icon name="share" size={26} color="#711323" />
                    <Text style={styles.listText}>Invite Your Friends</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : null}

            {drawerIndex == 5 ? (
              <View style={{ backgroundColor: '#711323', marginTop: 15 }}>
                <TouchableOpacity
                  style={styles.listItemProfile}
                  onPress={() => this.onPressFun('HelpSupport')}>
                  <Icon name="support-agent" size={28} color="#fff" />
                  <Text style={styles.listTextProfile}>Help & Support</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginTop: 2, marginLeft: 30 }}>
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => this.onPressFun('HelpSupport')}>
                  <Icon name="support-agent" size={28} color="#711323" />
                  <Text style={styles.listText}>Help & Support</Text>
                </TouchableOpacity>
              </View>
            )}

            {drawerIndex == 6 ? (
              <View style={{ backgroundColor: '#711323', marginTop: 15 }}>
                <TouchableOpacity
                  style={styles.listItemProfile}
                  onPress={() => this.onPressFun('About')}>
                  <Icon name="info" size={28} color="#fff" />
                  <Text style={styles.listTextProfile}>About</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginTop: 2, marginLeft: 30 }}>
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => this.onPressFun('About')}>
                  <Icon name="info" size={28} color="#711323" />
                  <Text style={styles.listText}>About</Text>
                </TouchableOpacity>
              </View>
            )}

            {this.props.redux ? (
              <View style={{ marginLeft: 30 }}>
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => this.loggedOut()}>
                  <Icon name="phonelink-lock" size={28} color="#711323" />
                  <Text style={styles.listText}>Sign out</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          {/* <View style={{margin: '20%'}}>
            <TouchableOpacity
              style={styles.innerView}
              onPress={() => this.onPressFun('Dashboard')}>
              <Icon
                name="arrow-back"
                size={30}
                color="#424242"
                style={styles.imageStyle}
              />
              <Text style={styles.innerText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.innerView}
              onPress={() => this.onPressFun('MyProfile')}>
              <Icon
                name="arrow-back"
                size={30}
                color="#424242"
                style={styles.imageStyle}
              />
              <Text style={styles.innerText}>My Profile</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  innerView: {
    marginTop: '5%',
    flexDirection: 'row',
    alignContent: 'center',
  },
  innerText: {
    fontSize: 20,
    color: '#164dbd',
    fontWeight: '800',
    // fontFamily: 'Roboto-Medium',
    marginLeft: '5%',
  },
  iconImage: {
    height: 30,
    width: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  listItemProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 20,
  },
  listText: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 10,
    color: '#424242',
  },
  listTextProfile: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 10,
    color: '#fff',
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
