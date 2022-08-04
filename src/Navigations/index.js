import React, {useEffect} from 'react';
import InitialStack from './initialStack';
import {Provider} from 'react-redux';

import store from '../Redux/store';
// const store = configureStore();

const Navigation = () => (
  <Provider store={store}>
    <InitialStack />
  </Provider>
);
export default Navigation;
