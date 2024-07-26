import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseSetup";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { lightTheme, darkTheme } from "../styles/theme";
import { ThemeContext } from "../context/ThemeContext";
import { commonStyles } from "../styles/styles";

const ListScreen = ({ type, navigation }) => {
  const [items, setItems] = useState([]);
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

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

  useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name={type === "activities" ? "directions-run" : "fastfood"}
                size={30}
                color={currentTheme.textColor} // This should reflect the current theme's text color
                style={{ marginRight: 15 }}
              />
              <TouchableOpacity onPress={() => navigation.navigate("Form", { collectionName: type })}>
                <Ionicons
                  name="add"
                  size={30}
                  color={currentTheme.textColor} // This should also reflect the current theme's text color
                />
              </TouchableOpacity>
            </View>
          ),
    });
  }, [navigation, currentTheme]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[commonStyles.item, { backgroundColor: currentTheme.itemBackground }]}
      onPress={() =>
        navigation.navigate("Form", { item, collectionName: type })
      }
    >
      <View style={commonStyles.content}>
        <Text style={[commonStyles.title, { color: currentTheme.textColor }]}>
          {item.description || item.title}
        </Text>
        {item.isSpecial && <Ionicons name="warning" size={24} color="red" />}
        <Text style={[commonStyles.date, { color: currentTheme.textColor }]}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={[commonStyles.value, { color: currentTheme.textColor }]}>
          {item.calories || item.duration} {type === "diets" ? "cal" : "mins"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        commonStyles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ListScreen;
