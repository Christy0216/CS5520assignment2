import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, Keyboard } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CheckBox } from "react-native-elements";
import { addOrUpdateEntry, deleteEntry } from "../firebase/firestoreHelper";
import { commonStyles } from "../styles/styles";

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
    isSpecial: item?.isSpecial || undefined,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleInputChange = async (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialChange = (newValue) => {
    if (!newValue) {
      Alert.alert(
        "Important",
        "Are you sure you want to save these changes?",
        [
          {
            text: "No",
            onPress: () => console.log("No changes made."),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () =>
              setFormData((prev) => ({ ...prev, isSpecial: newValue })),
          },
        ],
        { cancelable: false }
      );
    } else {
      setFormData((prev) => ({ ...prev, isSpecial: newValue }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.description || (!formData.duration && !formData.calories)) {
      Alert.alert("Error", "Please ensure all fields are filled correctly.");
      return;
    }

    const duration = parseInt(formData.duration);
    const calories = parseInt(formData.calories);

    // Automatically determine if the entry should be special
    const automaticIsSpecial =
      collectionName === "diets" ? calories > 800 : duration > 60;

    // If isSpecial has not been manually set by the user, use the automatic determination
    const isSpecial =
      formData.isSpecial !== undefined
        ? formData.isSpecial
        : automaticIsSpecial;

    const entryData = {
      description: formData.description,
      date: formData.date,
      isSpecial: isSpecial,
      ...(collectionName === "diets" ? { calories } : { duration }),
    };

    const success = await addOrUpdateEntry(collectionName, entryData, item?.id);
    if (success) {
      Alert.alert("Success", "Entry updated successfully.");
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } else {
      Alert.alert("Error", "Failed to update entry.");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete", // Title of the alert
      "Are you sure you want to delete this item?", // Message of the alert
      [
        {
          text: "No",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            if (item?.id) {
              const success = await deleteEntry(collectionName, item.id);
              if (success) {
                Alert.alert("Success", "Entry deleted successfully.");
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              } else {
                Alert.alert("Error", "Failed to delete entry.");
              }
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    handleInputChange("description", value);
  }, [value]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isEditMode && (
          <Ionicons
            name="trash-bin"
            size={24}
            color="red"
            style={{ marginRight: 15 }}
            onPress={handleDelete}
          />
        ),
    });
  }, [navigation, isEditMode]);

  return (
    <View style={commonStyles.container}>
      <Text>{collectionName === "diets" ? "Description " : "Activity "}*</Text>
      {collectionName === "diets" ? (
        <TextInput
          value={formData.description}
          onChangeText={(text) => handleInputChange("description", text)}
          style={commonStyles.input}
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
          style={{ backgroundColor: "white" }}
          dropDownContainerStyle={{ backgroundColor: "white" }}
          labelStyle={{ color: "black" }}
          placeholder="Select an activity"
          onChangeValue={(value) => handleInputChange("description", value)}
        />
      )}
      <Text>{collectionName === "diets" ? "Calories " : "Duration "}*</Text>
      <TextInput
        value={
          collectionName === "diets"
            ? String(formData.calories)
            : String(formData.duration)
        }
        onChangeText={(text) =>
          handleInputChange(
            collectionName === "diets" ? "calories" : "duration",
            text
          )
        }
        keyboardType="numeric"
        style={commonStyles.input}
      />
      <Text>Date *</Text>
      <TextInput
        value={formData.date.toDateString()}
        onFocus={() => setShowDatePicker(true)}
        style={commonStyles.input}
        onBlur={() => Keyboard.dismiss()}
      />
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            handleInputChange("date", selectedDate || formData.date);
          }}
        />
      )}
      {isEditMode && (
        <View>
          <Text>
            This item is marked as special. Select the checkbox if you would
            like to approve it.
          </Text>
          <CheckBox
            checked={formData.isSpecial}
            onPress={() => handleSpecialChange(!formData.isSpecial)}
            tintColors={{ true: "blue", false: "black" }}
          />
        </View>
      )}
      <View style={commonStyles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          color="grey"
        />
        <Button title="Save" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default GenericForm;
