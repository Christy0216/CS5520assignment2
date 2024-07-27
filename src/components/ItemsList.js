import React from "react";
import { Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../styles/styles";

const ItemsList = ({ data, type }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={commonStyles.item}
      onPress={() => navigation.navigate("EditEntry", { item, type })}
    >
      <Text style={commonStyles.title}>{item.title || item.description}</Text>
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

export default ItemsList;
