import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseSetup";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ListScreen = ({ type }) => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, type), (snapshot) => {
      const loadedItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date
          ? new Date(doc.data().date.seconds * 1000).toISOString()
          : new Date().toISOString(), // Transform to ISO string for serialization
      }));
      setItems(loadedItems);
    });

    return () => unsubscribe();
  }, [type]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("Form", { item, collectionName: type })
      }
    >
      <View style={styles.content}>
        {item.isSpecial && <Ionicons name="warning" size={24} color="red" />}
        <Text style={styles.title}>{item.description || item.title}</Text>
      </View>
      <Text>
        {item.calories || item.duration} {type === "diets" ? "cal" : "mins"} -{" "}
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    marginRight: 10,
  },
});

export default ListScreen;
