import React, { Component } from 'react';
import {
  Text,
  View,
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
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { ThemeColors } from '../../Theme/ThemeColors';
import { FontFamily } from '../../Theme/FontFamily';
import { updateProfile } from '../../Redux/actions/product';
import HelpInput from '../../Component/HelpInput';
import Util from '../../utils';
import { getUserDetails, updateProfilePic } from '../../api/auth';

import { connectActionSheet } from '@expo/react-native-action-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showToaster } from '../../api/func';

const options = ['Camera', 'Gallery', 'Cancel'];
const cancelButtonIndex = 2;
const imageOptions = {
  mediaType: 'photo',
  maxWidth: 512,
  maxHeight: 512,
  cameraType: 'front',
  quality: 1,
};
class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loader: false,
      loading: true,
      name: null,
      email: null,
      mobileNumber: null,
      mobileError: null,
      emailError: null,
      addressError: null,
      nameError: null,
      gender: '',
      address: null,
      formError: null,
      lblEmail: '',
      lblName: '',
      profilePic:null,
      isProfileSelected:false,
      hostUrl: null
    };
  }

  imageSelected = async (response) => {
    console.log('imageSelected', response)
    if (response.assets.length) {
      this.setState({ profilePic: { fileUri: response.assets[0].uri } });
      const postDate = {
        profile: response.assets[0].uri
      }
      try {
        this.setState({isProfileSelected:true});
        const response = await updateProfilePic(postDate);
        if (response.status == 'SUCCESS') {
          showToaster('Profile picture updated successfully..!','TOP');
        }
      } catch (error) {
        console.log("Profile > Update Profile picture> error", error);
        showToaster('Error white uploading picture!','TOP');
      }

    }
  };

  captureImage = async () => {
    try {
      const result = await launchCamera(imageOptions);
      this.imageSelected(result);
    } catch (error) {
      console.log(error);
    }
  };

  pickFromGallery = async () => {
    try {
      const result = await launchImageLibrary(imageOptions);
      if (result.assets.length) {
        this.imageSelected(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  takePicture = () => {
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.captureImage();
        } else if (buttonIndex === 1) {
          this.pickFromGallery();
        }
      }
    );
  };

  renderFileUri = () => {
    if (this.state.profilePic) {
      if (this.state.profilePic && this.state.profilePic.fileUri) {
        return (
          <Image
            source={{
              uri: this.state.profilePic.fileUri
                ? this.state.profilePic.fileUri
                : `${this.state.hostUrl}${this.state.profilePic}`,
            }}
            style={styles.userImg}
          />
        );
      } else {
        return (
          <>
            <Image
              source={{
                uri: this.state.profilePic
                  ? `${this.state.hostUrl}${this.state.profilePic}`
                  : this.state.profilePic,
              }}
              style={styles.userImg}
            />
            {/* <Text>{this.state.hostUrl + this.state.profilePic}</Text> */}
          </>
        );
      }
    } else {
      return <Image style={styles.userImg}
        resizeMode={'cover'}
        source={images.user}
        defaultSource={images.user} />;
    }
  };


  componentDidMount() {
    this.getDetail();
  }

  handleUserInput = (name, value) => {
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  validateField = (fieldName) => {
    switch (fieldName) {
      case 'name':
        if (this.state.name == null || this.state.name.trim() == '') {
          this.setState({ nameError: '* Name mandatory', loader: false });
          return;
        } else {
          this.setState({ nameError: null });
        }
        break;
      case 'email':
        if (this.state.email == null || this.state.email.trim() == '') {
          this.setState({ emailError: '* Email id mandatory', loader: false });
          return;
        } else if (!Util.validEmail(this.state.email)) {
          this.setState({ emailError: '* Invalid email id', loader: false });
          return;
        } else {
          this.setState({ emailError: null });
        }
        break;
      case 'mobileNumber':
        let zero = this.state.mobileNumber.startsWith('0');
        if (this.state.mobileNumber == null || this.state.mobileNumber.trim() == '') {
          this.setState({ mobileError: '* Mobile number mandatory', loader: false });
          return;
        } else if (!Util.validMobile(this.state.mobileNumber)) {
          this.setState({ mobileError: '* Invalid mobile number', loader: false });
          return;
        } else if (zero) {
          this.setState({ mobileError: '* Mobile number should not start with a zero' });
          return;
        } else {
          this.setState({ mobileError: null });
        }
        break;
      case 'address':
        if (this.state.address == null || this.state.address.trim() == '') {
          this.setState({ addressError: '* Address mandatory', loader: false });
          return;
        } else {
          this.setState({ addressError: null });
        }
        break;
      default:
        break;
    }
  }

  getDetail = async () => {
    try {
      const data = await getUserDetails();
      console.log("Profile > getDetails > data response", data);
      this.setState({
        data: data.response.result.profile,
        name: data.response.result.profile.name,
        email: data.response.result.profile.email,
        lblName: data.response.result.profile.name,
        lblEmail: data.response.result.profile.email,
        mobileNumber: data.response.result.profile.contact,
        address: data.response.result.profile.address,
        gender: data.response.result.profile.gender,
        profilePic: data.response.result.profile.profilePic,
        loading: false,
        hostUrl: data.response.result.hostUrl
      });
    } catch (error) {
      this.setState({ loading: false });
      showToaster(error,'TOP');
      console.log('Error_On_Data_Fetch', error);
    }
  };

  onProceed = async () => {
    this.setState({ loader: true });
    this.validateField('name');
    this.validateField('email');
    this.validateField('mobileNumber');
    this.validateField('address');
    
    if (this.state.nameError == null && this.state.emailError == null &&
      this.state.mobileError == null && this.state.addressError == null
    ) {
      const raw = {
        name: `${this.state.name}`,
        email: `${this.state.email}`,
        contact: this.state.mobileNumber,
        dateofbirth: `${this.state.data.dateofbirth}`,
        gender: `${this.state.gender}`,
        address: `${this.state.address}`,
        latitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.latitude : '',
        longitude: this.props.redux.auth.position.isLocation ? this.props.redux.auth.position.longitude : '',
      };
      try {
        const response = await updateProfile(raw);
        this.setState({isProfileSelected:false});
        if (response.status == 'SUCCESS') {
          this.setState({ lblName: this.state.name, lblEmail: this.state.email });
          showToaster('Profile updated successfully..!','TOP');
        }
        this.setState({ formError: null, loader: false });
      } catch (error) {
        console.log("Profile > Update Profile > error", error);
        this.setState({ loader: false, formError: '* ' + error });
      }
    }
  };


  changeDateFormat(inputDate) {  // expects Y-m-d
    var splitDate = inputDate.split('-');
    if (splitDate.count == 0) {
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
            <ActivityIndicator size="large" color={ThemeColors.CLR_ACTIVITY_INDICATOR} />
          </View>
        ) : (
          <ScrollView>
            <View
              style={styles.profileContainer}>
              <View style={styles.arrowBack}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.openDrawer()}>
                  <Icon name="arrow-back" size={30} color={ThemeColors.CLR_WHITE} />
                </TouchableOpacity>
              </View>
              <View style={styles.userView}>
                {/* <Image
                  style={styles.userImg}
                  resizeMode={'cover'}
                  source={images.user}
                  defaultSource={images.user}
                /> */}

                <TouchableOpacity style={{ alignItems: "center" }}
                  onPress={() => this.takePicture()}>
                  {this.renderFileUri()}
                  <Text style={{ color: "#ffff" }}>
                    Tap on image to edit image
                  </Text>
                </TouchableOpacity>

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
                <HelpInput
                  placeholder={'Name'}
                  value={this.state.name}
                  page={'Profile'}
                  icon={'person'}
                  onChangeText={text => this.handleUserInput('name', text)}
                  error={this.state.nameError}
                />
                {/* <View style={styles.sectionStyle}>
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
                </View> */}
              </View>

              <View>
                <Text style={styles.labelText}>Email</Text>
                <HelpInput
                  placeholder={'Email'}
                  value={this.state.email}
                  page={'Profile'}
                  icon={'mail'}
                  onChangeText={text => this.handleUserInput('email', text)}
                  error={this.state.emailError}
                />
                {/* <View style={styles.sectionStyle}>
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
                  </View> */}
              </View>
              <View>
                <Text style={styles.labelText}>Phone No</Text>
                <HelpInput
                  placeholder={'Phone No'}
                  value={this.state.mobileNumber}
                  page={'Profile'}
                  icon={'call'}
                  onChangeText={text => this.handleUserInput('mobileNumber', text)}
                  error={this.state.mobileError}
                />
                {/* <View style={styles.sectionStyle}>
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
                </View> */}
              </View>
              <View>
                <Text style={styles.labelText}>DOB</Text>
                <View >
                  <HelpInput
                    placeholder={viewData ? this.changeDateFormat(viewData.dateofbirth) : ''}
                    underlineColorAndroid="transparent"
                    page={'Profile'}
                    icon={'date-range'}
                    placeholderTextColor="#000"
                    editable={false}
                    selectTextOnFocus={false}
                  />
                </View>



              </View>
              <View style={styles.row}>
                {/* <View>
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
                </View> */}

                {/* <View>
                  <Text style={styles.labelText}>Gender</Text>
                  <View
                    style={styles.selectContainer}></View>

                  <View
                    style={styles.genderDropDown}>
                    <Picker
                      style={styles.picker}
                      selectedValue={viewData ? this.state.gender : ''}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ gender: itemValue })
                      }>
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                  </View>
                </View> */}
              </View>
              <View style={styles.adsContainer}>
                <Text style={styles.labelText}>Address</Text>
                <HelpInput
                  placeholder={'Address'}
                  value={this.state.address}
                  page={'Profile'}
                  icon={'location-on'}
                  multiline={true}
                  onChangeText={text => this.handleUserInput('address', text)}
                  error={this.state.addressError}
                />

                {/* <View style={styles.addressSectionStyle}>
                    <TextInput
                      value={this.state.address}
                      underlineColorAndroid="transparent"
                      multiline={this.props.multiline}
                      numberOfLines={3}
                      style={styles.adsInput}
                      placeholderTextColor="#000"
                      onChangeText={text => {
                        this.setState({...this.state,address: text });
                      }}
                    />
                  </View> */}
              </View>
              {this.state.formError ?
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{this.state.formError}</Text>
                </View> : null
              }
              {viewData ? (
                this.state.name != this.state.data.name ||
                  this.state.email != this.state.data.email ||
                  this.state.mobileNumber != this.state.data.contact ||
                  this.state.address != this.state.data.address ||
                  this.state.isProfileSelected ||
                  this.state.gender != this.state.data.gender ? 

                  (
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
  let redux = state;
  return { redux };
}

const connectedApp = connectActionSheet(MyProfile);

export default connect(mapStateToProps, mapDispatchToProps)(connectedApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.CLR_WHITE,
  },
  arrowBack: {
    margin: 10
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  profileContainer: {
    height: 220,
    backgroundColor: '#84182B',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  userView: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center'
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: ThemeColors.CLR_WHITE
  },
  userMail: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: ThemeColors.CLR_WHITE
  },
  inputContainer: {
    margin: 10,
    marginTop: '15%',
    alignItems: 'center'
  },
  // inputText:{
  //   fontFamily:FontFamily.TAJAWAL_REGULAR,
  //   fontSize:18,
  //   fontWeight:'500',
  //   color:ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
  // },
  labelText: {
    marginLeft: 15,
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 16,
    fontWeight: '500',
    color: '#828282'
  },
  // sectionStyle: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#7B7B7B',
  //   height: 50,
  //   width: 320,
  //   borderRadius: 10,
  //   margin: 10,
  // },
  adsContainer: {
    marginTop: -45,
    marginLeft: 1
  },
  // addressSectionStyle: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#7B7B7B',
  //   height: 80,
  //   width: 320,
  //   marginLeft:10,
  //   marginTop:10,
  //   borderRadius: 10,
  // },
  adsInput: {
    marginLeft: 13
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
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.CLR_WHITE,
    height: 44,
    margin: 10,
  },
  imageStyle: {
    margin: 7,
    //resizeMode: 'stretch',
  },
  genderDropDown: {
    borderWidth: 1,
    borderRadius: 5,
    height: 44,
    width: 155,
    borderColor: '#7B7B7B',
    bottom: 55,
  },
  row: {
    flexDirection: 'column',
    paddingBottom: 10,
    paddingTop: 20,

  },
  picker: {
    marginTop: -5
  },
  errorContainer: {
    alignSelf: 'flex-start',
    marginLeft: 30
  },
  errorText: { color: 'red' },
  saveText: {
    color: ThemeColors.CLR_WHITE,
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 18,
    fontWeight: '700',
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 20,
  },
});
