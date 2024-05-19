import React from 'react';
import { registerRootComponent } from 'expo';
import AppNavigator from '../navigation/AppNavigator';

const App = () => {
  return <AppNavigator />;
};

registerRootComponent(App);