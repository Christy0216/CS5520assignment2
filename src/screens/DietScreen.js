// DietScreen.js
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemsList from '../components/ItemsList';
import { Ionicons } from '@expo/vector-icons';

const DietScreen = () => {
  const navigation = useNavigation();
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    // Fetch diet entries from local data
    setDiets([
      { id: 1, description: 'Salad', calories: 500, isSpecial: false },
      { id: 2, description: 'Burger', calories: 1200, isSpecial: true }
    ]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {item.isSpecial && <Ionicons name="warning" size={24} color="black" />}
      <Text>{item.description}</Text>
      <Text>{item.calories} cal</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ItemsList data={diets} renderItem={renderItem} />
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

export default DietScreen;
