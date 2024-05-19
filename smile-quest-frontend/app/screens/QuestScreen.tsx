import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { styles as externalStyles } from './styles'; // Assuming the styles are in a separate file named 'styles.ts'
import { useNavigation } from '@react-navigation/native';

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

const QuestsScreen: React.FC = ({ navigation }) => {
  navigation = useNavigation();
  const [singlePlayerChecked, setSinglePlayerChecked] = useState<{ [key: string]: boolean }>({});
  const [multiPlayerChecked, setMultiPlayerChecked] = useState<{ [key: string]: boolean }>({});

  const handleSinglePlayerCheck = (id: string) => {
    setSinglePlayerChecked({ ...singlePlayerChecked, [id]: !singlePlayerChecked[id] });
  };

  const handleMultiPlayerCheck = (id: string) => {
    setMultiPlayerChecked({ ...multiPlayerChecked, [id]: !multiPlayerChecked[id] });
  };

  return (
    <View style={externalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Explore')} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Today's Quests</Text>
      </View>
      <Text style={externalStyles.subtitle}>Single-player Quests</Text>
      <FlatList
        data={singlePlayerQuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={externalStyles.questItem}>
            <Checkbox
              status={singlePlayerChecked[item.id] ? 'checked' : 'unchecked'}
              onPress={() => handleSinglePlayerCheck(item.id)}
            />
            <Text style={externalStyles.questText}>{item.task}</Text>
          </View>
        )}
      />
      <Text style={externalStyles.subtitle}>Multi-player Quests</Text>
      <FlatList
        data={multiPlayerQuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={externalStyles.questItem}>
            <Checkbox
              status={multiPlayerChecked[item.id] ? 'checked' : 'unchecked'}
              onPress={() => handleMultiPlayerCheck(item.id)}
            />
            <Text style={externalStyles.questText}>{item.task}</Text>
          </View>
        )}
      />
      <View style={externalStyles.buttonContainer}>
        <TouchableOpacity style={externalStyles.button} onPress={() => navigation.navigate('Camera')}>
          <Text style={externalStyles.buttonText}>Start Quest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  backButtonText: {
    color: '#FFD400', // Yellow color for back button
    fontSize: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default QuestsScreen;
