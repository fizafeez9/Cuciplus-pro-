import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CUCIplus PRO</Text>
      <Text style={styles.subtitle}>Bersih Menyeluruh, Hidup Lebih Segar</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0052CC',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
