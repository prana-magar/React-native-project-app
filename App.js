import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "./src/infrastructure/theme";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { AboutScreen } from "./src/features/city-view/screens/about.screen";
import { SelectorScreen } from "./src/features/city-view/screens/selector.screen";
import { ViewerScreen } from "./src/features/city-view/screens/viewer.screen";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons"; 


const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Selector: "md-checkmark-circle",
  Viewer: "apps-outline",
  About: "at-outline",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Selector" component={SelectorScreen} />
            <Tab.Screen name="Viewer" component={ViewerScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
          </Tab.Navigator>
        </NavigationContainer>
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
