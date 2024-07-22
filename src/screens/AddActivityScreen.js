// AddActivityScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropdownPicker from 'react-native-dropdown-picker';

const AddActivityScreen = () => {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!activity || !duration || duration <= 0) {
      Alert.alert('Error', 'Please fill all fields correctly.');
      return;
    }
    // Save to Firestore and navigate back
    // Placeholder functionality
    console.log('Activity Saved:', { activity, duration, date });
  };

  return (
    <View style={styles.container}>
      <DropdownPicker
        items={[
          { label: 'Walking', value: 'walking' },
          { label: 'Running', value: 'running' },
          { label: 'Swimming', value: 'swimming' },
          { label: 'Weights', value: 'weights' },
          { label: 'Yoga', value: 'yoga' },
          { label: 'Cycling', value: 'cycling' },
          { label: 'Hiking', value: 'hiking' },
        ]}
        defaultValue={activity}
        onChangeItem={item => setActivity(item.value)}
      />
      <TextInput
        placeholder="Duration in minutes"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Pick a date"
        value={date.toDateString()}
        onFocus={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setDate(selectedDate || date);
            setShowDatePicker(false);
          }}
        />
      )}
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AddActivityScreen;
