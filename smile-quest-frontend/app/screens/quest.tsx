import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { styles } from './styles'; // Assuming the styles are in a separate file named 'styles.ts'

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
      </View>
    </View>
  );
};

export default QuestsScreen;
