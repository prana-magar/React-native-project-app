import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "./src/infrastructure/theme";
import { ThemeProvider } from "styled-components/native";
import { Text } from "./src/components/typography/text.component";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeArea } from "./src/components/utility/safe-area.component";
import { Icon } from "react-native-elements";
import { AboutScreen } from './src/features/city-view/screens/about.screen'
import { CitySelectorScreen } from "./src/features/city-view/screens/city-selector.screen";
import { SelectionViewerScreen } from "./src/features/city-view/screens/selection-viewer.screen";
import {CityContext, CityContextProvider} from "./src/services/cities.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  CitySelector: "rowing",
  Viewer: "rowing",
  About: "rowing",
};



const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Icon name={iconName} size={size} color={color} />
    ),
  };
};
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CityContextProvider >
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={createScreenOptions}
              tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
              }}
            >
              <Tab.Screen name="CitySelector" component={CitySelectorScreen} />
              <Tab.Screen name="Viewer" component={SelectionViewerScreen} />
              <Tab.Screen name="About" component={AboutScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </CityContextProvider>
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
