import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ItemsList = ({ data, type }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("EditEntry", { item, type })}
    >
      <Text style={styles.title}>{item.title || item.description}</Text>
      <Text>
        {type === "activities"
          ? `${item.duration} mins`
          : `${item.calories} cal`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "lightgray",
  },
  title: {
    flex: 1,
  },
});

export default ItemsList;
