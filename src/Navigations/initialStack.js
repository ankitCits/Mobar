import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
// Auth Redux
import { getAccessToken } from '../localstorage';
import { getUserDetails } from '../api/auth';
import { setUserDetail } from '../Redux/actions/auth';
import { connect } from 'react-redux';
// Components
import ThemeFullPageLoader from '../Component/ThemeFullPageLoader';
import createAccount from '../Screens/Auth/createAccount';
import VerifyOtp from '../Screens/Auth/verifyOtp';
import SignIn from '../Screens/Auth/signIn';
import ForgetPassword from '../Screens/ForgetPassword';
import forgetPasswordOtp from '../Screens/ForgetPassword/forgetPasswordOtp';
import ForgetEnterPassword from '../Screens/ForgetPassword/forgetEnterPassword';
import PasswordSuccessFullyChanged from '../Screens/ForgetPassword/passwordSuccessFullyChanged';
import Drawer from './drawer';

const Stack = createStackNavigator();

const AuthNavigator = (props) => {
  // console.log('AuthNavigator', props)
  return (
    <Stack.Navigator
      initialRouteName={props.initialRouteName}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="createAccount" component={createAccount} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="forgetPasswordOtp" component={forgetPasswordOtp} />
      <Stack.Screen name="ForgetEnterPassword" component={ForgetEnterPassword} />
      <Stack.Screen name="PasswordSuccessFullyChanged" component={PasswordSuccessFullyChanged} />
      <Stack.Screen name="Drawer" component={Drawer} />
    </Stack.Navigator>
  );
}


class InitialStack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  getUserByToken = async () => {
    const token = await getAccessToken(token);
    if (token) {
      const postData = {
        token
      }
      try {
        const resp = await getUserDetails(postData);
        await this.props.dispatch(setUserDetail(resp));
        this.setState({ loading: false });
      } catch (error) {
        this.setState({ loading: false });
        // console.log(error)
      }
    } else {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.getUserByToken();
    SplashScreen.hide();
  }

  componentDidUpdate() {
  }

  render() {
    const initRoute = this.props.redux && this.props.redux.auth.userData != null ? 'Drawer' : 'SignIn';
    // console.log('initRoute', initRoute, this.props.redux, this.state.loading);
    return (
      <NavigationContainer>
        {this.state.loading ?
          <ThemeFullPageLoader />
          :
          <AuthNavigator initialRouteName={initRoute} />
        }
      </NavigationContainer >
    );
  }
};
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
function mapStateToProps(state) {
  let redux = state;
  return { redux };
}
export default connect(mapStateToProps, mapDispatchToProps)(InitialStack);
