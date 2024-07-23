import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import DropdownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const AddActivityScreen = () => {
  const navigation = useNavigation();
  const [activity, setActivity] = useState(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (!activity || !duration || parseInt(duration) <= 0) {
      Alert.alert("Error", "Please fill all fields correctly.");
      return;
    }

    const isSpecial =
      (activity === "running" || activity === "weights") &&
      parseInt(duration) > 60;

    // Assuming the Firestore code to save the activity would be here
    console.log("Activity Saved:", { activity, duration, date });
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <DropdownPicker
          open={open}
          value={activity}
          items={[
            { label: "Walking", value: "walking" },
            { label: "Running", value: "running" },
            { label: "Swimming", value: "swimming" },
            { label: "Weights", value: "weights" },
            { label: "Yoga", value: "yoga" },
            { label: "Cycling", value: "cycling" },
            { label: "Hiking", value: "hiking" },
          ]}
          setOpen={setOpen}
          setValue={setActivity}
          placeholder="Select an activity"
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
        />
        <TextInput
          style={styles.input}
          placeholder="Duration (min) *"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateInput}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setDate(currentDate);
              setShowDatePicker(false); // Hide the date picker after date selection
            }}
          />
        )}
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dateInput: {
    height: 40,
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddActivityScreen;
