// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const dailyQuest = "Do 5 push-ups and touch grass!";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Quest</Text>
      <Text style={styles.quest}>{dailyQuest}</Text>
      <Button
        title="View Achievements"
        onPress={() => navigation.navigate('Achievements')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quest: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default HomeScreen;
