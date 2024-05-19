// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../app/screens/explore';
import ChatScreen from '../app/screens/virtual friend!';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
