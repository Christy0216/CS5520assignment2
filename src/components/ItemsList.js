// ItemsList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ItemsList = ({ data, renderItem }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
});

export default ItemsList;
