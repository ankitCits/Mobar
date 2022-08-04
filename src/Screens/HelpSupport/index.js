import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import {A_KEY, BASE_URL} from '../../config';
import {getAccessToken} from '../../localstorage';
import HeaderSide from '../Component/HeaderSide';
export default class HelpSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      loader: false,
      name: null,
      email: null,
      contact: null,
      category: null,
      description: null,
    };
  }

  onProceed = async () => {
    this.setState({loader: true});
    if (this.state.name == null || this.state.name == '') {
      ToastAndroid.showWithGravity(
        'Name Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
    }
    if (this.state.email == null || this.state.email == '') {
      ToastAndroid.showWithGravity(
        'Email Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
    }
    if (this.state.contact == null || this.state.contact == '') {
      ToastAndroid.showWithGravity(
        'Mobile Number Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
    }
    if (this.state.category == null || this.state.category == '') {
      ToastAndroid.showWithGravity(
        'Category Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
    }
    if (this.state.description == null || this.state.description == '') {
      ToastAndroid.showWithGravity(
        'Description Password Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
    }
    let token = await getAccessToken(token);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    var raw = JSON.stringify({
      name: this.state.name,
      contact: this.state.contact,
      email: this.state.email,
      issue: this.state.description,
      category: 'Account',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/common/helpSupport`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('===>>>', result);
        ToastAndroid.showWithGravity(
          'Issue has successfully submited..!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        this.setState({loader: false});
      })
      .catch(error => {
        console.log('error', error);
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        this.setState({loader: false});
      });
  };

  render() {
    console.log('====>', this.state.name);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <HeaderSide
          name={'Help & Support'}
          onClick={() => this.props.navigation.openDrawer()}
        />
        <ScrollView>
          <View style={styles.FirstText}>
            <Text style={{fontSize: 20, color: '#ADADAD', fontWeight: '400'}}>
              Need Some Help?
            </Text>
          </View>

          <View style={styles.FirstText}>
            <Image
              style={styles.userImg}
              resizeMode={'cover'}
              source={images.helpsupport}
              defaultSource={images.helpsupport}
            />
          </View>

          <View style={styles.ThirdText}>
            <TouchableOpacity>
              <Image
                style={styles.phone}
                resizeMode={'cover'}
                source={images.phone}
                defaultSource={images.phone}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                style={styles.mail}
                resizeMode={'cover'}
                source={images.mail}
                defaultSource={images.mail}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                style={styles.whatsApp}
                resizeMode={'cover'}
                source={images.whatsApp}
                defaultSource={images.mail}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.FirstText}>
            <Image
              style={styles.userImg}
              resizeMode={'cover'}
              source={images.support}
              defaultSource={images.support}
            />
          </View>

          <View style={styles.FirstText}>
            <Text style={{color: '#4D4F50', fontSize: 16, fontWeight: '500'}}>
              Submit Request
            </Text>
          </View>

          <View style={styles.FirstText}>
            <View style={styles.sectionStyle}>
              <TextInput
                style={{flex: 1, padding: 10}}
                placeholder="Name"
                underlineColorAndroid="transparent"
                placeholderTextColor="#424242"
                onChangeText={text => {
                  this.setState({name: text});
                }}
              />
            </View>

            <View style={styles.sectionStyle}>
              <TextInput
                style={{flex: 1, padding: 10}}
                placeholder="Email"
                underlineColorAndroid="transparent"
                placeholderTextColor="#424242"
                onChangeText={text => {
                  this.setState({email: text});
                }}
              />
            </View>

            <View style={styles.sectionStyle}>
              <TextInput
                style={{flex: 1, padding: 10}}
                placeholder="Mobile Number"
                underlineColorAndroid="transparent"
                placeholderTextColor="#424242"
                onChangeText={text => {
                  this.setState({contact: text});
                }}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={{flex: 1, padding: 10}}
                placeholder="Select Category"
                underlineColorAndroid="transparent"
                placeholderTextColor="#424242"
                onChangeText={text => {
                  this.setState({category: text});
                }}
              />
              <Icon
                name="expand-more"
                size={28}
                color="#424242"
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.sectionStyleDes}>
              <TextInput
                style={{flex: 1, paddingLeft: 10}}
                placeholder="Describe your issue...."
                underlineColorAndroid="transparent"
                placeholderTextColor="#424242"
                multiline={true}
                numberOfLines={1}
                onChangeText={text => {
                  this.setState({description: text});
                }}
              />
            </View>
          </View>
          <View>
            <View style={{marginTop: '10%', marginBottom: 10}}>
              <TouchableOpacity
                style={styles.save}
                onPress={() => this.onProceed()}>
                {this.state.loader ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={{color: '#fff', fontSize: 15}}>SEND</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={{margin: 10, marginLeft: '10%', flexDirection: 'row'}}>
              <Text style={styles.faqs}>FAQs</Text>
              <Icon
                name="help-outline"
                size={20}
                color="#424242"
                style={styles.imageStyle}
              />
            </View>

            <View style={styles.helpBottom}>
              <View style={styles.helpBottomList}>
                <Text style={styles.helpBottomListText}>Account</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color="#424242"
                  style={styles.imageStyle}
                />
              </View>

              <View style={styles.underLine} />

              <View style={styles.helpBottomList}>
                <Text style={styles.helpBottomListText}>Order</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color="#424242"
                  style={styles.imageStyle}
                />
              </View>

              <View style={styles.underLine} />

              <View style={styles.helpBottomList}>
                <Text style={styles.helpBottomListText}>Payments</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color="#424242"
                  style={styles.imageStyle}
                />
              </View>

              <View style={styles.underLine} />

              <View style={styles.helpBottomList}>
                <Text style={styles.helpBottomListText}>Bars</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color="#424242"
                  style={styles.imageStyle}
                />
              </View>

              <View style={styles.underLine} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  FirstText: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  ThirdText: {
    alignSelf: 'center',
    marginTop: '5%',
    flexDirection: 'row',
  },
  phone: {
    // left: '8.33%',
    right: 30,
    top: '12.53%',
    bottom: '8.33%',
  },
  mail: {
    width: 29,
    height: 29,
    right: 10,
    // top: 339,
  },
  whatsApp: {
    left: 20,
    right: '0%',
    top: '0%',
    bottom: '0.35%',
    backgroundColor: '#10e87e',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#000',
    height: 44,
    width: 320,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
  },
  sectionStyleDes: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#000',
    height: 100,
    width: 320,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
  },
  imageStyle: {
    // margin: 5,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginLeft: 5,
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  faqs: {
    color: '#4D4F50',
    fontSize: 16,
    fontWeight: '500',
  },
  helpBottom: {
    // height: 300,
    width: '94%',
    marginTop: '10%',
    // alignItems:'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    // height: 300,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: '20%',
    borderRadius: 10,
  },
  helpBottomList: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helpBottomListText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#4D4F50',
  },
  underLine: {
    backgroundColor: '#DADADA',
    height: 1,
  },
});
