import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Import the image
const smileyImage = require('../../assets/images/smiley.png');

export default function ChatScreen({ navigation }) {
  navigation = useNavigation();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post('http://207.23.223.101:3000/chat', { message: input }); // replace with your IP address
      console.log('API response:', response.data); // debug: log the API response
      const botReply = { sender: 'bot', text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
    }

    setInput('');
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Keyboard.dismiss();
    }
  };

  const renderItem = ({ item }: { item: { sender: string; text: string } }) => (
    <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
      <Text style={item.sender === 'user' ? styles.userText : styles.botText}>{item.text}</Text>
    </View>
  );

  const renderContent = () => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message here..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>↑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    Platform.OS === 'ios' || Platform.OS === 'android' ? (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Image source={smileyImage} style={styles.smileyImage} />
          <Text style={styles.headerText}>Smiley</Text>
        </View>
        {renderContent()}
      </KeyboardAvoidingView>
    ) : (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Image source={smileyImage} style={styles.smileyImage} />
          <Text style={styles.headerText}>Smiley</Text>
        </View>
        {renderContent()}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
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
    color: '#FFD400', // yellow for back button
    fontSize: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10, // spacing between the image and text
  },
  smileyImage: {
    width: 90, 
    height: 90, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 16,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#FFD400', // yellow background for send button
    borderRadius: 30,
    padding: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFD400', // yellow background for user messages
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    marginRight: 16,
    marginLeft: 50,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    marginLeft: 16,
    marginRight: 50,
  },
  userText: {
    color: '#000', // black text for user messages
  },
  botText: {
    color: '#000', // black text for bot messages
  },
});
