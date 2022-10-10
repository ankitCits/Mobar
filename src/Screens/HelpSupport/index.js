import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  FlatList,
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
import SelectInput from '../../Component/SelectInput';
import { fetchFAQData } from '../../api/common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showToaster } from '../../api/func';
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
      faqData: [],
      categoryData: [
        { id: 1, title: 'Enquiry' },
        { id: 2, title: 'Complaint' },
        { id: 3, title: 'Order Related' },
        { id: 4, title: 'Account Related' },
        { id: 5, title: 'Product Related' },
        { id: 6, title: 'Payment Related' },
        { id: 7, title: 'Bar Related' }
      ]
    };
  }

  handleUserInput = (name, value) => {
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  componentDidMount = () => {
    this.getFAQData();
  }

  validateField = (fieldName) => {
    switch (fieldName) {
      case 'name':
        if (this.state.name == null || this.state.name.trim() == '') {
          this.setState({ nameError: 'Please provide your name', loader: false, formError: 'Please provide your name' });
          return;
        } else {
          this.setState({ nameError: null });
        }
        break;
      case 'email':
        if (this.state.email == null || this.state.email.trim() == '') {
          this.setState({ emailError: 'Email address is mandatory', loader: false, formError: 'Email address is mandatory' });
          return;
        } else if (!Util.validEmail(this.state.email)) {
          this.setState({ emailError: 'Invalid email address', formError: 'Invalid email address', loader: false });
          return;
        } else {
          this.setState({ emailError: null });
        }
        break;
      case 'mobileNumber':
        const zero = this.state.mobileNumber && this.state.mobileNumber.startsWith('0');
        if (this.state.mobileNumber == null || this.state.mobileNumber.trim() == '') {
          this.setState({ mobileError: 'Mobile number is mandatory', loader: false, formError: 'Mobile number is mandatory' });
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
          this.setState({ descriptionError: 'Please describe your query / issue you are facing', loader: false, formError: 'Please describe your query / issue you are facing' });
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
        this.setState({ loader: true });
        const res = await helpSupport(raw);
        console.log("helpSupport > response > ",res.mag);
        this.setState({ 
          categoryError: null, 
          name:null,
          email:null,
          mobileNumber:null,
          category:null,
          description:null,
          loader: false });
        showToaster(res.mag,'TOP');
      } catch (error) {
        console.log("helpSupport > onProceed > catch > ",error);
        this.setState({ loader: false });
      }
    }else{
      showToaster('Try again!','TOP');
    }
  };

  getFAQData = async () => {
    try {
      const res = await fetchFAQData();
      console.log("HelpSupport > getFAQData > res >", res.response.result.faq);
      this.setState({ faqData: res.response.result.faq });
      console.log("HelpSupport > getFAQData > state data>", res.response.result.faq);

    } catch (error) {
      console.log("HelpSupport > getFAQData > catch >", error);
    }
  }


  toggle = () => {
    this.setState({ isToggle: !this.state.isToggle });
  };

  onSelected = (value) => {
    console.log("value", value);
    this.setState({ category: value.title });
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
            <View style={styles.dropdown} >
              <SelectInput items={this.state.categoryData}
                selectedItems={{ id: 0, title: 'Select Category' }}
                visible={false}
                onChange={
                  (item) => { this.onSelected(item) }
                } />
            </View>
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
            {/* <Text style={styles.errorText}>
              {this.state.formError}
            </Text> */}
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
              {
                this.state.faqData.length > 0 &&
                this.state.faqData.map((item, index) =>
                (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('FAQs', { data: this.state.faqData, selectedItem: item })
                      }}
                      style={styles.helpBottomList} key={index}>
                      <Text style={styles.helpBottomListText}>{item.CategoryName}</Text>
                      <Icon
                        name="navigate-next"
                        size={30}
                        color={ThemeColors.CLR_DARK_GREY}
                        style={styles.imageStyle}
                      />
                    </TouchableOpacity>
                    <View style={styles.underLine} />
                  </>
                )
                )
              }

            </View>

            {/* <View style={styles.helpBottom}>
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
            </View> */}
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
  dropdown: { marginBottom: 25 },
  imageStyle: {
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginLeft: 5,
    marginTop: 5
  },
  btnContainer: {
    marginTop: '7%',
    marginBottom: '6%',
    zIndex: -1,
  },
  save: {
    backgroundColor: '#851729',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
    zIndex: 0,
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
    zIndex: -1,
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
    zIndex:-1,
    borderRadius: 10,
  },
  helpBottomList: {
    margin: 10,
    flexDirection: 'row',
    zIndex:0,
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
