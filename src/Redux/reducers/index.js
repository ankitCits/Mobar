import { combineReducers } from 'redux'
import authReducer from './auth'
// import AppContainer from '../../navigations/AppNavigation';

// const navReducer = createNavigationReducer(AppContainer);

export default combineReducers({
  auth: authReducer,
})
