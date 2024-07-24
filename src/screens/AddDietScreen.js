// AddDietScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddDietScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setDiets } = route.params;

  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    // Validation
    if (!description || !calories || parseInt(calories) <= 0) {
      Alert.alert('Error', 'Please fill all fields correctly.');
      return;
    }

    const newDiet = {
      id: Date.now(), // Mock ID
      description,
      calories: parseInt(calories),
      date,
      isSpecial: parseInt(calories) > 800,
    };

    setDiets(prevDiets => [...prevDiets, newDiet]);

    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Description *"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Calories *"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Pick a date *"
          value={date.toDateString()}
          onFocus={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setShowDatePicker(false);
              setDate(currentDate);
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
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddDietScreen;
