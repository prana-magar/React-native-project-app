import React from 'react';
import { StyleSheet,  View } from 'react-native';
import { theme } from "./src/infrastructure/theme";
import { ThemeProvider } from "styled-components/native";
import  {Text} from "./src/components/typography/text.component"

export default function App() {
  return (

   <>
    <ThemeProvider theme={theme}>
        <View style={styles.container}>
        
          <Text variant="error">Helllo</Text>

        </View>
        
    </ThemeProvider>
   </>
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
