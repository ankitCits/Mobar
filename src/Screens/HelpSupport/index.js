import React, { Component } from 'react';
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
import { ThemeColors } from '../../Theme/ThemeColors';
import { FontFamily } from '../../Theme/FontFamily';
import HeaderSide from '../Component/HeaderSide';
import Util from '../../utils'
import { helpSupport } from '../../Redux/actions/product';
import TextInputField from '../../Component/TextInputField';
import HelpInput from '../../Component/HelpInput';
export default class HelpSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      loader: false,
      name: null,
      email: null,
      mobileNumber: null,
      category: null,
      isToggle: false,
      description: null,
      nameError: null,
      emailError: null,
      mobileError: null,
      categoryError: null,
      descriptionError: null,
      formError: '',
      categoryData: [
        'Enquiry',
        'Complaint',
        'Order Related',
        'Account Related',
        'Product Related',
        'Payment Related',
        'Bar Related'
      ]
    };
  }

  handleUserInput = (name, value) => {
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  validateField = (fieldName) => {
    switch (fieldName) {
      case 'name':
        if (this.state.name == null || this.state.name.trim() == '') {
          this.setState({ nameError: 'Please provide your name', loader: false, formError: 'Name fields are mandatory' });
          return;
        } else {
          this.setState({ nameError: '' });
        }
        break;
      case 'email':
        if (this.state.email == null || this.state.email.trim() == '') {
          this.setState({ emailError: 'Email address is mandatory', loader: false, formError: 'Email fields are mandatory' });
          return;
        } else if (!Util.validEmail(this.state.email)) {
          this.setState({ emailError: 'Invalid email id', formError: 'Invalid email id', loader: false });
          return;
        } else {
          this.setState({ emailError: null });
        }
        break;
      case 'mobileNumber':
        const zero = this.state.mobileNumber && this.state.mobileNumber.startsWith('0');
        if (this.state.mobileNumber == null || this.state.mobileNumber.trim() == '') {
          this.setState({ mobileError: 'Mobile number is mandatory', loader: false, formError: 'Mobile fields are mandatory' });
          return;
        } else if (!Util.validMobile(this.state.mobileNumber)) {
          this.setState({ mobileError: '* Invalid mobile number', formError: '* Invalid mobile number', loader: false });
          console.log("form error", this.state.formError);
          return;
        } else if (zero) {
          this.setState({ mobileError: '* Mobile number should not start with a zero', formError: '* Mobile number should not start with a zero' });
          return;
        } else {
          this.setState({ mobileError: null });
        }
        break;
      case 'description':
        if (this.state.description == null || this.state.description.trim() == '') {
          this.setState({ descriptionError: 'Please describe your query / issue you are facing', loader: false, formError: 'Description fields are mandatory' });
          return;
        } else {
          this.setState({ descriptionError: null });
        }
        break;
      case 'category':
        if (this.state.category == null || this.state.category.trim() == '') {
          this.setState({ categoryError: 'Select appropriate category', loader: false, formError: 'All fields are mandatory' });
          return;
        } else {
          this.setState({ categoryError: null });
        }
        break;
       default:
        break;
    }
  }

  onProceed = async () => {
    this.setState({ loader: true });
    this.validateField('name');
    this.validateField('email');
    this.validateField('mobileNumber');
    this.validateField('description');
    this.validateField('category');
    if (this.state.nameError == null && this.state.emailError == null &&
      this.state.mobileError == null && this.state.descriptionError == null &&
      this.state.categoryError == null) {
      var raw = {
        name: this.state.name,
        contact: this.state.mobileNumber,
        email: this.state.email,
        issue: this.state.description,
        category: this.state.category,
      };
      try {
        const response = await helpSupport(raw);
        this.setState({ formError: null });
        if (response && response.status == 'SUCCESS') {
          this.setState({ categoryError: null });
          ToastAndroid.showWithGravity(
            response.mag,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
        this.setState({ loader: false });
      } catch (error) {
        //this.setState({ formError: error, loader: false });
      }
    }
  };

  toggle = () => {
    this.setState({ isToggle: !this.state.isToggle });
  };

  onSelected = (value) => {
    this.setState({ category: value });
    this.toggle();
  };

  render() {
    return (
      <SafeAreaView
        style={styles.container}>
        <HeaderSide
          name={'Help & Support'}
          onClick={() => this.props.navigation.openDrawer()}
        />
        <ScrollView>
          <View style={styles.FirstText}>
            <Text style={styles.FirstText}>
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
              resizeMode={'cover'}
              source={images.support}
              defaultSource={images.support}
            />
          </View>
          <View>
            <Text style={styles.submitRequest}>
              Submit Request
            </Text>
          </View>

          <View style={styles.FirstText}>
            <HelpInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={text => this.handleUserInput('name', text)}
            error={this.state.nameError}
            />

            <HelpInput
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={text => this.handleUserInput('email', text)}
            error={this.state.emailError}
            />

            <HelpInput
              placeholder={'Mobile Number'}
              value={this.state.mobileNumber}
              onChangeText={text => this.handleUserInput('mobileNumber', text)}
            error={this.state.mobileError}
            />

            <View style={styles.sectionStyle} >
              <Text onPress={() => this.toggle()}
                style={styles.inputText}
              >{this.state.category ? this.state.category : 'Select Category'}
              </Text>
              <Icon
                name="expand-more"
                size={28}
                color="#424242"
                style={styles.imageStyle}
              />
            </View>
            {
              this.state.categoryData.map((item, index) => (
                <TouchableOpacity onPress={() => this.onSelected(item)} key={index}>
                  <View style={[this.state.isToggle ? styles.collapsed : styles.hide, this.state.category == item ? styles.selected : '']} key={index}>
                    <Text style={styles.inputText}>{item}</Text>
                  </View>
                </TouchableOpacity>
                )
              )
            }
            {this.state.categoryError &&
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{this.state.categoryError}</Text>
              </View>
            }
            <HelpInput
              placeholder={'Describe your issue....'}
              value={this.state.description}
              multiline={true}
              onChangeText={text => this.handleUserInput('description', text)}
           error={this.state.descriptionError}
            />

              
              <Text style={styles.errorText}>
                {this.state.formError}
              </Text>
            
            {/* {this.state.formError =='' ?  
            (<View style={styles.errorContainer}>
              <Text style={styles.errorText}>All fields are mandatory</Text>
            </View>):(
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{this.state.formError}</Text>
            </View>
            )} */}
          </View>
          <View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.save}
                onPress={() => this.onProceed()}>
                {this.state.loader ? (
                  <ActivityIndicator size="small" color={ThemeColors.CLR_WHITE} />
                ) : (
                  <Text style={styles.btnText}>SEND</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.faqContainer}>
              <Text style={styles.faqs}>FAQs</Text>
              <Icon
                name="help-outline"
                size={20}
                color={ThemeColors.CLR_DARK_GREY}
                style={styles.imageStyle}
              />
            </View>

            <View style={styles.helpBottom}>
              <View style={styles.helpBottomList}>
                <Text style={styles.helpBottomListText}>Account</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color={ThemeColors.CLR_DARK_GREY}
                  style={styles.imageStyle}
                />
              </View>
              <View style={styles.underLine} />
              <View style={styles.helpBottomList}>
                <Text style={styles.helpBottomListText}>Order</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color={ThemeColors.CLR_DARK_GREY}
                  style={styles.imageStyle}
                />
              </View>

              <View style={styles.underLine} />

              <View style={styles.helpBottomList}>
                <Text style={styles.helpBottomListText}>Payments</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color={ThemeColors.CLR_DARK_GREY}
                  style={styles.imageStyle}
                />
              </View>
              <View style={styles.underLine} />
              <View style={styles.helpBottomList}>
                <Text style={styles.helpBottomListText}>Bars</Text>
                <Icon
                  name="navigate-next"
                  size={30}
                  color={ThemeColors.CLR_DARK_GREY}
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
  container: {
    backgroundColor: '#fff'
  },
  FirstText: {
    alignSelf: 'center',
    marginTop: '3%',
    fontSize: 21,
    color: '#ADADAD',
    fontWeight: '500',
    fontFamily: FontFamily.TAJAWAL_REGULAR
  },
  ThirdText: {
    alignSelf: 'center',
    marginTop: '5%',
    flexDirection: 'row',
  },
  phone: {
    right: 30,
    top: '12.53%',
    bottom: '8.33%',
  },
  mail: {
    width: 29,
    height: 29,
    right: 10,
  },
  whatsApp: {
    left: 20,
    right: '0%',
    top: '0%',
    bottom: '0.35%',
    backgroundColor: '#10e87e',
  },
  submitRequest: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontSize: 20,
    fontWeight: '500',
    color: '#4D4F50',
    textAlign: 'center'
  },
  sectionStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.CLR_WHITE,
    borderWidth: 0,
    borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    height: 48,
    width: 324,
    borderRadius: 5,
    margin: 10,
    elevation: 4,
  },
  collapsed: {
    flexDirection: 'row',
    backgroundColor: ThemeColors.CLR_WHITE,
    borderWidth: 0,
    borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    height: 48,
    width: 324,
    marginTop: -9,
    margin: 10,
    marginLeft: 10,
    alignItems: 'center',
    //paddingHorizontal: 10,
    elevation: 4,
  },
  hide: {
    height: 0
  },
  selected: {
    borderColor: "#AB1731",
    alignItems: 'center',
    alignSelf: 'center',
    borderLeftWidth: 5,
  },
  inputText: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '400',
    fontSize: 15,
    flex: 1,
    padding: 10,
    color: ThemeColors.CLR_DARK_GREY
  },
  sectionStyleDes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: ThemeColors.CLR_WHITE,
    borderWidth: 0,
    borderColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    height: 112,
    width: 324,
    borderRadius: 5,
    margin: 10,
    elevation: 4,
  },
  imageStyle: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginLeft: 5,
    marginTop: 5
  },
  btnContainer: {
    marginTop: '7%',
    marginBottom: '6%'
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  btnText: {
    color: ThemeColors.CLR_WHITE,
    fontSize: 17,
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '700',
  },
  faqContainer: {
    marginLeft: '7%',
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  faqs: {
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    color: '#4D4F50',
    fontSize: 20,
    fontWeight: '500',
  },
  helpBottom: {
    width: 324,
    marginTop: '5%',
    alignSelf: 'center',
    backgroundColor: ThemeColors.CLR_WHITE,
    shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: '20%',
    borderRadius: 10,
  },
  helpBottomList: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helpBottomListText: {
    fontSize: 18,
    fontFamily: FontFamily.TAJAWAL_REGULAR,
    fontWeight: '500',
    padding: 5,
    color: '#4D4F50',
  },
  underLine: {
    backgroundColor: '#DADADA',
    height: 1,
  },
  errorContainer: {
    width: '80%',
    marginLeft: 15,
  },
  errorText: {
    color: 'red',
  },
  // accoridian
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F0F0F',
    marginLeft: 10,
    fontFamily: FontFamily.AVENIR_HEAVY
  },

  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    marginLeft: 46,
  },
  subItemTitle: {
    color: '#0F0F0F',
    fontFamily: FontFamily.AVENIR_BOOK
  },

});


{/*  */ }
