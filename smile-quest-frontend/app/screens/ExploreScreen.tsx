import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

const posts = [
  { id: '1', user: 'Grace', achievement: 'Touched grass', image: require('./images/grace.jpg') },
  { id: '2', user: 'Jason', achievement: 'Did 5 push-ups', image: require('./images/jason.jpg') },
  { id: '3', user: 'Carson', achievement: 'Talked with parents about the day', image: require('./images/carson.jpg') },
  { id: '4', user: 'Bart', achievement: 'Daily affirmation: "I am capable"', image: require('./images/bart.jpg') },
  { id: '5', user: 'Grace, Jason, Carson, Bart', achievement: 'Scavanger hunt with friends!', image: require('./images/group.jpg') },
  // add more posts with their respective images...
];

const PostItem = ({ post }: { post: { id: string, user: string, achievement: string, image: any } }) => (
  
  <View style={styles.postItem}>
    <Text style={styles.postUser}>{post.user}</Text>
    <Text style={styles.postAchievement}>{post.achievement}</Text>
    {post.image.startsWith && post.image.startsWith('file') ? (
      <Image source={{ uri: post.image }} style={styles.image} />
    ) : (
      <Image source={post.image} style={styles.image} />
    )}
  </View>
);

export default function ExploreScreen({ route }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const newPost = route.params?.newPost;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SmileQuest</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={newPost ? posts.concat(newPost) : posts}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Weekly Leaderboard')}>
        <Text style={styles.buttonText}>Go to LeaderBoard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
        <Text style={styles.buttonText}>Go to Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quests')}>
        <Text style={styles.buttonText}>Go to Quests</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  postItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postUser: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postAchievement: {
    fontSize: 16,
    marginTop: 5,
  },
  image: {
    width: 300,
    height: 400,
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FFD400',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
