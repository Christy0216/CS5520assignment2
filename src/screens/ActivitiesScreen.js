// ActivitiesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemsList from '../components/ItemsList';

const ActivitiesScreen = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities from Firestore or some local data
    setActivities([{ id: 1, title: 'Running', duration: '30 mins' }]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <Text>{item.duration}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Activity" onPress={() => navigation.navigate('AddActivity')} />
      <ItemsList data={activities} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightgray',
  },
});

export default ActivitiesScreen;
