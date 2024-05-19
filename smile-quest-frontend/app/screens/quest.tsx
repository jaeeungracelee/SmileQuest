import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

type Quest = {
  id: string;
  task: string;
};

const singlePlayerQuests: Quest[] = [
  { id: '1', task: 'Touch grass' },
  { id: '2', task: 'Do 5 push-ups' },
  { id: '3', task: 'Tell yourself a daily affirmation' },
];

const multiPlayerQuests: Quest[] = [
  { id: '4', task: 'Talk with your parents about your day' },
  { id: '5', task: 'Play a game with a friend' },
  { id: '6', task: 'Have a group call with friends' },
];

const QuestsScreen = () => {
  const [singlePlayerChecked, setSinglePlayerChecked] = useState<{ [key: string]: boolean }>({});
  const [multiPlayerChecked, setMultiPlayerChecked] = useState<{ [key: string]: boolean }>({});

  const handleSinglePlayerCheck = (id: string) => {
    setSinglePlayerChecked({ ...singlePlayerChecked, [id]: !singlePlayerChecked[id] });
  };

  const handleMultiPlayerCheck = (id: string) => {
    setMultiPlayerChecked({ ...multiPlayerChecked, [id]: !multiPlayerChecked[id] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Quests</Text>
      <Text style={styles.subtitle}>Single-player Quests</Text>
      <FlatList
        data={singlePlayerQuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questItem}>
            <Checkbox
              status={singlePlayerChecked[item.id] ? 'checked' : 'unchecked'}
              onPress={() => handleSinglePlayerCheck(item.id)}
            />
            <Text style={styles.questText}>{item.task}</Text>
          </View>
        )}
      />
      <Text style={styles.subtitle}>Multi-player Quests</Text>
      <FlatList
        data={multiPlayerQuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questItem}>
            <Checkbox
              status={multiPlayerChecked[item.id] ? 'checked' : 'unchecked'}
              onPress={() => handleMultiPlayerCheck(item.id)}
            />
            <Text style={styles.questText}>{item.task}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Quest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Take a Picture</Text>
        </TouchableOpacity>
      </View>
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 8,
  },
  questItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default QuestsScreen;
