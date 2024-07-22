// DietScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemsList from '../components/ItemsList';

const DietScreen = () => {
  const navigation = useNavigation();
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    // Fetch diet entries from Firestore or some local data
    setDiets([{ id: 1, description: 'Salad', calories: '500 cal' }]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.description}</Text>
      <Text>{item.calories}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Diet Entry" onPress={() => navigation.navigate('AddDiet')} />
      <ItemsList data={diets} renderItem={renderItem} />
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

export default DietScreen;
