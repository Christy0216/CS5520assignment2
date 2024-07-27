import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../screens/ListScreen";
import GenericForm from "../components/GenericForm";
import SettingsScreen from "../screens/SettingsScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeProvider } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Activities":
              iconName = "directions-run";
              break;
            case "Diet":
              iconName = "fastfood";
              break;
            case "Settings":
              iconName = "settings";
              break;
            default:
              iconName = "directions-run"; // Default case, should not normally hit
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Activities"
        children={({ navigation }) => (
          <ListScreen type="activities" navigation={navigation} />
        )}
        options={{ title: "Activities" }}
      />
      <Tab.Screen
        name="Diet"
        children={({ navigation }) => (
          <ListScreen type="diets" navigation={navigation} />
        )}
        options={{ title: "Diet" }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Form"
            component={GenericForm}
            options={({ route }) => ({
              title: route.params?.title || "Edit Entry",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default AppNavigator;
