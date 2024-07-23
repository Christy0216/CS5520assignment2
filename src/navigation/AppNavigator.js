import React from 'react';
import { Button, View } from 'react-native';
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
    <Tab.Navigator screenOptions={({ route, navigation }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Activities':
            iconName = 'directions-run';
            break;
          case 'Diet':
            iconName = 'fastfood';
            break;
          case 'Settings':
            iconName = 'settings';
            break;
          default:
            iconName = 'directions-run';
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      headerRight: () => (
        route.name === 'Activities' || route.name === 'Diet' ?
          <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <Feather name="plus" size={24} color="black" style={{ marginRight: 10 }} onPress={() => navigation.navigate(route.name === 'Activities' ? 'AddActivity' : 'AddDiet')} />
            {route.name === 'Activities' && <MaterialIcons name="directions-run" size={24} color="black" />}
            {route.name === 'Diet' && <MaterialIcons name="restaurant" size={24} color="black" />}
          </View>
          : null
      ),
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
