import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ActivitiesScreen = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities from Firestore or some local data
    setActivities([
      { id: 1, title: 'Running', duration: '75 mins', isSpecial: true },
      { id: 2, title: 'Walking', duration: '30 mins', isSpecial: false },
      { id: 3, title: 'Weights', duration: '90 mins', isSpecial: true },
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
      <Button title="Add Activity" onPress={() => navigation.navigate('AddActivity')} />
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
