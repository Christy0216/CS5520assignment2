// ActivitiesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemsList from '../components/ItemsList';
import { Ionicons } from '@expo/vector-icons';

const ActivitiesScreen = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities from local data
    setActivities([
      { id: 1, title: 'Running', duration: '30 mins', isSpecial: false },
      { id: 2, title: 'Weight Training', duration: '70 mins', isSpecial: true }
    ]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {item.isSpecial && <Ionicons name="warning" size={24} color="black" />}
      <Text>{item.title}</Text>
      <Text>{item.duration}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ItemsList data={activities} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightgray',
  },
});

export default ActivitiesScreen;
