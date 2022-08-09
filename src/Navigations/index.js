import React from 'react';
import InitialStack from './initialStack';
import { Provider } from 'react-redux';

import store from '../Redux/store';

const Navigation = () => (
  <Provider store={store}>
    <InitialStack />
  </Provider>
);
export default Navigation;
