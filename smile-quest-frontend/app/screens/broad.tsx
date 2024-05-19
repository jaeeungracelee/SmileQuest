import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from "axios";
import { Text, View } from '@/components/Themed';
import LinearGradient from 'react-native-linear-gradient';

type LeaderboardEntry = {
  name: string;
  points: number;
};

type Post = {
  user: string;
  score: number;
};

const updatePosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get('http://207.23.223.101:3000/viewLeaderboard');
    const leaderboard: LeaderboardEntry[] = response.data;

    return leaderboard
      .map((entry) => ({
        user: entry.name,
        score: entry.score,
      }))
      .sort((a, b) => b.score - a.score)
      .map((post, index) => ({
        ...post,
        id: (index + 1).toString(),
      }));
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};


const PostItem = ({ post }: { post: Post }) => (
  <View style={styles.postItem}>
     <View style={styles.postItemContent}>
      <Text style={styles.postRank}>{post.id}</Text>
     <View style={styles.postItemVert}>
      <Text style={styles.postUser}>{post.user}</Text>
      <Text style={styles.postAchievement}>{`Score: ${post.score}`}</Text>
      </View>
    </View>
  </View>
);



export default function TabOneScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

  const fetchData = async () => {
    try {
      const leaderboardData = await updatePosts();
      console.log(leaderboardData);
      setPosts(leaderboardData);
      setDataFetched(true); // Update dataFetched state to true after setting posts
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data periodically
    }, 5000); // Refresh every 5 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!dataFetched) {
    return null; // Return null if data fetching is not completed
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weekly Leaderboard</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
    color: '#062b42',
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
    backgroundColor: '#FFD400',
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
    paddingHorizontal: 20, // Padding for the entire item
  },
  postItemContent: {
    backgroundColor: '#FFD400',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6, // Vertical padding for the content
    paddingHorizontal: 60, // Horizontal padding for the content
  },
  postItemVert: {
    backgroundColor: '#FFD400',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6, // Vertical padding for the content
    paddingHorizontal: 60, // Horizontal padding for the content
  },
  postRank: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#062b42',
  },
  postUser: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postAchievement: {
    fontSize: 16,
    marginTop: 5,
  },
  blackText: {
    color: '#000',
  },
});