import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const quests = [
  { id: '1', task: 'Touch grass' },
  { id: '2', task: 'Do 5 push-ups' },
  { id: '3', task: 'Talk with your parents about your day' },
  { id: '4', task: 'Tell yourself a daily affirmation' },
];

const QuestsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Quests</Text>
      <FlatList
        data={quests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questItem}>
            <Text style={styles.questText}>{item.task}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  questItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questText: {
    fontSize: 18,
  },
});

export default QuestsScreen;
