// components/SocialLinks.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Linking from 'expo-linking';

const SocialLinks = () => {
  const shareToPlatform = async (url) => {
    await Linking.openURL(url);
  };

  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={() => shareToPlatform('https://facebook.com')}>
        <Icon name="facebook" size={40} color="#3b5998" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => shareToPlatform('https://twitter.com')}>
        <Icon name="twitter" size={40} color="#1DA1F2" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => shareToPlatform('https://instagram.com')}>
        <Icon name="instagram" size={40} color="#E1306C" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SocialLinks;
