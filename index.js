/**
 * @format
 */
 import React from 'react';
import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/Navigations';
import {name as appName} from './app.json';

const RNApp = () => (
  <App />
)

AppRegistry.registerComponent(appName, () => RNApp);
