// screens/AchievementsScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const achievements = [
  { id: '1', text: 'Did 5 push-ups and touched grass!' },
  { id: '2', text: 'Talked with parents about my day.' },
  { id: '3', text: 'Told myself a daily affirmation!' },
];

const AchievementsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.achievement}>{item.text}</Text>}
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
  achievement: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
  },
});

export default AchievementsScreen;
