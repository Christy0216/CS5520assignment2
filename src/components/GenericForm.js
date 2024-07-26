import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { addOrUpdateEntry, deleteEntry } from "../firebase/firestoreHelper";

const GenericForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, collectionName } = route.params;
  const isEditMode = !!item;

  const [formData, setFormData] = useState({
    description: item?.description || "",
    duration: item?.duration || "",
    calories: item?.calories || "",
    date: item?.date ? new Date(item.date) : new Date(),
    isSpecial: item?.isSpecial || false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // DropDownPicker state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(formData.description);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.description || (!formData.duration && !formData.calories)) {
      Alert.alert("Error", "Please ensure all fields are filled correctly.");
      return;
    }

    const duration = parseInt(formData.duration);
    const calories = parseInt(formData.calories);

    const entryData = {
      description: formData.description,
      date: formData.date,
      isSpecial: collectionName === "diets" ? calories > 800 : duration > 60,
      ...(collectionName === "diets" ? { calories } : { duration })
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

  useEffect(() => {
    handleInputChange("description", value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Text>{collectionName === "diets" ? "Description" : "Activity"}:</Text>
      {collectionName === "diets" ? (
        <TextInput
          value={formData.description}
          onChangeText={(text) => handleInputChange("description", text)}
          style={styles.input}
        />
      ) : (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{ height: 40, marginBottom: 20 }}
          style={{ backgroundColor: 'white' }}
          dropDownContainerStyle={{ backgroundColor: 'white' }}
          labelStyle={{ color: 'black' }}
          placeholder="Select an activity"
          onChangeValue={(value) => handleInputChange("description", value)}
        />
      )}
      <Text>{collectionName === "diets" ? "Calories" : "Duration"}:</Text>
      <TextInput
        value={collectionName === "diets" ? String(formData.calories) : String(formData.duration)}
        onChangeText={(text) => handleInputChange(collectionName === "diets" ? "calories" : "duration", text)}
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
      {isEditMode && (
        <View style={styles.switchContainer}>
          <Text>Special Entry:</Text>
          <Switch
            value={formData.isSpecial}
            onValueChange={(value) => handleInputChange("isSpecial", value)}
          />
        </View>
      )}
      <Button title="Save" onPress={handleSubmit} />
      {item?.id && <Button title="Delete" onPress={handleDelete} color="red" />}
    </View>
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
