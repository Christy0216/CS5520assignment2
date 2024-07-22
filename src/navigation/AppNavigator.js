import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import DietScreen from '../screens/DietScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import AddDietScreen from '../screens/AddDietScreen';
import EditEntryScreen from '../screens/EditEntryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { MaterialIcons, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let IconComponent = MaterialIcons; // Default Icon Component

        if (route.name === 'Activities') {
          iconName = 'directions-run';
        } else if (route.name === 'Diet') {
          iconName = 'fastfood';
        } else if (route.name === 'Settings') {
          iconName = 'settings';
          IconComponent = Feather; // Using Feather for the settings icon
        }

        return <IconComponent name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AddActivity" component={AddActivityScreen} />
        <Stack.Screen name="AddDiet" component={AddDietScreen} />
        <Stack.Screen name="EditEntry" component={EditEntryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
