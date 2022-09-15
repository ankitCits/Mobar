import React from 'react';
import InitialStack from './initialStack';
import { Provider } from 'react-redux';

import store from '../Redux/store';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const Navigation = () => (
  <>
    <ActionSheetProvider>
      <Provider store={store}>
        <InitialStack />
      </Provider>
    </ActionSheetProvider>
  </>
);
export default Navigation;
