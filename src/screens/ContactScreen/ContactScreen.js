import React from 'react';
import { View, StyleSheet } from 'react-native';
// Components
import { Header, ContactBody } from './components';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export const ContactScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <ContactBody />
  </View>
);
