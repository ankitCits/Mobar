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
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../assets/images';
import {connect} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {getAccessToken} from '../../localstorage';
import {A_KEY, BASE_URL} from '../../config';
import { colors } from '../../Theme/colors';
import { FontFamily } from '../../Theme/FontFamily';
import { cos } from 'react-native-reanimated';
import { updateProfile } from '../../Redux/actions/product';
class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loader: false,
      loading: true,
      name: '',
      email: '',
      contact: '',
      gender: '',
      lblEmail:'',
      lblName:''
    };

    //this.getDetail = this.getDetail.bind(this);
  }

  componentDidMount() {
    this.getDetail();
  }

  getDetail = async () => {
    let token = await getAccessToken(token);
    if (!token) {
      return this.setState({loading: false});
    }
    fetch(`${BASE_URL}/users/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        Token: token,
        A_Key: A_KEY,
      },
      redirect: 'follow',
    })
      .then(result => result.json())
      .then(responseDetail => {
        if (responseDetail.response) {
          this.setState({loading: false});
          this.setState({
            data: responseDetail.response.result.profile,
            name: responseDetail.response.result.profile.name,
            email: responseDetail.response.result.profile.email,
            lblName: responseDetail.response.result.profile.name,
            lblEmail: responseDetail.response.result.profile.email,
            contact: responseDetail.response.result.profile.contact,
            address:responseDetail.response.result.profile.address,
            gender: responseDetail.response.result.profile.gender,
          });
        }

        if (responseDetail.errors) {
          this.setState({loading: false});
          ToastAndroid.showWithGravity(
            responseDetail.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        this.setState({loading: false});
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        console.log('Error_On_Data_Fetch', error);
      });
  };

  onProceed = async () => {
    this.setState({loader: true});
    if ((this.state.name == '')) {
      ToastAndroid.showWithGravity(
        'Name Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }

    if ((this.state.email == '')) {
      ToastAndroid.showWithGravity(
        'Email Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }

    if ((this.state.contact == '')) {
      ToastAndroid.showWithGravity(
        'Contact Required!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      this.setState({loader: false});
      return;
    }
    const raw ={
      name: `${this.state.name}`,
      email: `${this.state.email}`,
      contact: this.state.contact,
      dateofbirth: `${this.state.data.dateofbirth}`,
      gender: `${this.state.gender}`,
      address: `${this.state.address}`,
      latitude: 1.28668,
      longitude: 103.853607,
    };
    try {
      const response = await updateProfile(raw);
      if (response.status == 'SUCCESS') {
        this.setState({lblName:this.state.name,lblEmail:this.state.email});
        ToastAndroid.showWithGravity(
          'Profile updated successfully..!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
      this.setState({ loader: false });
    } catch (error) {
      console.log("Profile > Update Profile > error",error);
      this.setState({ loader: false });
    }
  };


  changeDateFormat(inputDate){  // expects Y-m-d
    var splitDate = inputDate.split('-');
    if(splitDate.count == 0){
        return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2]; 

    return day + '-' + month + '-' + year;
}

  render() {
    const viewData = this.state.data;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#84182B"
          barStyle={'light-content'}
        />
        
        {this.state.loading && this.state.data == null ? (
          <View
            style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.CLR_ACTIVITY_INDICATOR} />
          </View>
        ) : (
          <ScrollView>
            <View
              style={styles.profileContainer}>
              <View style={styles.arrowBack}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.openDrawer()}>
                  <Icon name="arrow-back" size={30} color={colors.CLR_WHITE} />
                </TouchableOpacity>
              </View>
              <View style={styles.userView}>
                <Image
                  style={styles.userImg}
                  resizeMode={'cover'}
                  source={images.user}
                  defaultSource={images.user}
                />
                <View>
                  <Text style={styles.userName}>
                    {viewData ? this.state.lblName : ''}
                  </Text>
                </View>
                <View>
                  <Text style={styles.userMail}>
                    {viewData ? this.state.lblEmail : ''}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.labelText}>Name</Text>
                <View style={styles.sectionStyle}>
                  <Icon
                    name="person"
                    size={20}
                    color="#AEAEAF"
                    style={styles.imageStyle}
                  />
                  <TextInput
                    style={styles.inputText}
                    value={this.state.name}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#000"
                    onChangeText={text => {
                      this.setState({...this.state,name: text});
                    }}
                  />
                </View>
              </View>

                <View>
                  <Text style={styles.labelText}>Email</Text>
                  <View style={styles.sectionStyle}>
                    <Icon
                      name="mail"
                      size={20}
                      color="#969696"
                      style={styles.imageStyle}
                    />
                    <TextInput
                      value={this.state.email}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#000"
                      onChangeText={text => {
                        this.setState({...this.state,email: text });
                      }}
                    />
                  </View>
                </View>
              <View>
                <Text style={styles.labelText}>Phone No</Text>
                <View style={styles.sectionStyle}>
                  <Icon
                    name="call"
                    size={20}
                    color="#969696"
                    style={styles.imageStyle}
                  />
                  <TextInput
                    value={this.state.contact}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#000"
                    onChangeText={text => {
                      this.setState({...this.state,contact: text});
                    }}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View>
                  <Text style={styles.labelText}>Date of Birth</Text>
                  <View style={styles.sectionStyleNext}>
                    <Icon
                      name="event-note"
                      size={20}
                      color="#969696"
                      style={styles.imageStyle}
                    />
                    <TextInput
                      placeholder={viewData ? this.changeDateFormat(viewData.dateofbirth) : ''}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#000"
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>
                </View>

                <View>
                  <Text style={styles.labelText}>Gender</Text>
                  <View
                    style={styles.selectContainer}></View>

                  <View
                    style={styles.genderDropDown}>
                    <Picker
                      style={styles.picker}
                      selectedValue={viewData ? this.state.gender : ''}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({gender: itemValue})
                      }>
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                  </View>
                </View>
              </View>
              {viewData ? (
                this.state.name != this.state.data.name ||
                this.state.email != this.state.data.email ||
                this.state.contact != this.state.data.contact ||
                this.state.gender != this.state.data.gender ? (
                  <View>
                    <TouchableOpacity
                      style={styles.save}
                      onPress={() =>
                        // this.props.navigation.navigate('MyBottomTabs')
                        {
                          this.onProceed();
                        }
                      }>
                      {this.state.loader ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.saveText}>Save</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                ) : null
              ) : null}
            </View>
          </ScrollView>
        )}
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
  let redux = state.auth.userData;
  return {redux};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.CLR_WHITE,
  },
  arrowBack:{
    margin: 10
  },
  loaderContainer:{
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  profileContainer:{
    height: 220,
    backgroundColor: '#84182B',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
  },
  userImg: {
    height: 80,
    width: 80,
  },
  userView: {
    flex:1,
    alignItems: 'center',
    alignContent:'center'
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    color: colors.CLR_WHITE
  },
  userMail: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    color:colors.CLR_WHITE
  },
  inputContainer:{
    margin: 10, 
    marginTop:'15%',
    alignItems: 'center'
  },
  inputText:{
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    fontSize:18,
    fontWeight:'500',
    color:colors.CLR_SIGN_IN_TEXT_COLOR,
  },
  labelText:{
    marginLeft: 15,
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    fontSize:16,
    fontWeight:'500',
    color:'#828282'
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7B7B7B',
    height: 50,
    width: 320,
    borderRadius: 10,
    margin: 10,
  },
  sectionStyleNext: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7B7B7B',
    height: 44,
    width: 155,
    borderRadius: 5,
    margin: 10,
  },
  selectContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.CLR_WHITE,
    height: 44,
    margin: 10,
  },
  imageStyle: {
    margin: 7,
    resizeMode: 'stretch',
  },
  genderDropDown:{
    borderWidth: 1,
    borderRadius: 5,
    height: 44,
    width: 155,
    borderColor: '#7B7B7B',
    bottom: 55,
  },
  row:{
    flexDirection: 'row'
  },
  picker:{
    marginTop: -5
  },
  saveText:{
    color: colors.CLR_WHITE,
    fontFamily:FontFamily.TAJAWAL_REGULAR,
    fontSize: 18,
    fontWeight:'700',
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 20,
  },
});
