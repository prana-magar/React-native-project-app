import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomTheme from './src/infrastructure/theme/index'

export default function App() {
  return (
    <View style={styles.container}>
      <Text >Teest</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
