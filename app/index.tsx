
// App.js
import 'react-native-gesture-handler'; 
import React from 'react';
import RadioPlayer from '../components/RadioPlayer/RadioPlayer';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

export default function App() {
  return (
    <ScrollView
      style={styles.container}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      bounces={true}
      decelerationRate="fast"
      snapToAlignment="center"
    >
      <RadioPlayer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0b09',
    paddingTop: 50,
    paddingBottom: 100,
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
