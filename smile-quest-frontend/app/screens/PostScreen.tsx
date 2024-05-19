// PostScreen.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function PostScreen({ route }: { route: any }) {
    const { photo } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: photo.uri }} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 400,
  },
});
