// PostScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const singlePlayerQuests = [
  { id: '1', task: 'Touch grass' },
  { id: '2', task: 'Do 5 push-ups' },
  { id: '3', task: 'Tell yourself a daily affirmation' },
];

const multiPlayerQuests = [
  { id: '4', task: 'Talk with your parents about your day' },
  { id: '5', task: 'Play a game with a friend' },
  { id: '6', task: 'Have a group call with friends' },
];

export default function PostScreen({ route, navigation }) {
  const { photo } = route.params;
  const [user, setUser] = useState('');
  const [selectedAchievements, setSelectedAchievements] = useState([]);
  
  const handleAchievementSelection = (task) => {
    setSelectedAchievements([...selectedAchievements, task]);
  };

  const handlePost = ( ) => {
    const newPost = {
      id: Math.random().toString(),
      user,
      achievement: selectedAchievements.join(', '),
      image: photo.uri
    };
    navigation.navigate('Explore', { newPost });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.image} />
      <TextInput 
        style={styles.input}
        placeholder="Enter your name"
        value={user}
        onChangeText={setUser}
      />
      <Text style={styles.header}>Select Achievements</Text>
      <Text style={styles.subHeader}>Single-player Quests</Text>
      <FlatList
        data={singlePlayerQuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAchievementSelection(item.task)}>
            <Text style={styles.questText}>{item.task}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.subHeader}>Multi-player Quests</Text>
      <FlatList
        data={multiPlayerQuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAchievementSelection(item.task)}>
            <Text style={styles.questText}>{item.task}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    marginVertical: 10,
  },
  questText: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
