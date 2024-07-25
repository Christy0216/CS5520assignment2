import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addOrUpdateEntry, deleteEntry } from "../firebase/firestoreHelper";

const GenericForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, collectionName } = route.params;

  const [formData, setFormData] = useState({
    description: item?.description || "",
    value: item?.calories || item?.duration || "",
    date: item?.date ? new Date(item.date) : new Date(), // Convert back to Date object
    isSpecial: item?.isSpecial || false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.description || !formData.value) {
      Alert.alert("Error", "Please ensure all fields are filled correctly.");
      return;
    }

    const entryData = {
      ...formData,
      calories:
        collectionName === "diets" ? parseInt(formData.value) : undefined,
      duration:
        collectionName === "activities" ? parseInt(formData.value) : undefined,
    };

    const success = await addOrUpdateEntry(collectionName, entryData, item?.id);
    if (success) {
      Alert.alert("Success", "Entry updated successfully.");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Failed to update entry.");
    }
  };

  const handleDelete = async () => {
    if (item?.id) {
      const success = await deleteEntry(collectionName, item.id);
      if (success) {
        Alert.alert("Success", "Entry deleted successfully.");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to delete entry.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>{collectionName === "diets" ? "Description" : "Activity"}:</Text>
      <TextInput
        value={formData.description}
        onChangeText={(text) => handleInputChange("description", text)}
        style={styles.input}
      />
      <Text>{collectionName === "diets" ? "Calories" : "Duration"}:</Text>
      <TextInput
        value={String(formData.value)}
        onChangeText={(text) => handleInputChange("value", text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text>Date:</Text>
      <TextInput
        value={formData.date.toDateString()}
        onFocus={() => setShowDatePicker(true)}
        style={styles.input}
      />
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            handleInputChange("date", selectedDate || formData.date);
          }}
        />
      )}
      <View style={styles.switchContainer}>
        <Text>Special Entry:</Text>
        <Switch
          value={formData.isSpecial}
          onValueChange={(value) => handleInputChange("isSpecial", value)}
        />
      </View>
      <Button title="Save" onPress={handleSubmit} />
      {item?.id && <Button title="Delete" onPress={handleDelete} color="red" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default GenericForm;
