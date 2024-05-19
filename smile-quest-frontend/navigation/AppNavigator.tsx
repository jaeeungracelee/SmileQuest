import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../app/screens/ExploreScreen';
import ChatScreen from '../app/screens/ChatScreen';
import QuestScreen from '../app/screens/QuestScreen';
import LoginScreen from '../app/screens/LoginScreen';
import CameraScreen from '../app/screens/CameraScreen';
import BoardScreen from '../app/screens/broad';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Quests" component={QuestScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Weekly Leaderboard" component={BoardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
