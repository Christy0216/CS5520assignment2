// // EditEntryScreen.js
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   Text,
//   Button,
//   StyleSheet,
//   Alert,
//   Switch,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import firebase from "../firebase"; // Ensure you configure this path correctly

// const EditEntryScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { itemId, collectionType } = route.params; // Pass these parameters when navigating to this screen

//   const [description, setDescription] = useState("");
//   const [value, setValue] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [isSpecial, setIsSpecial] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     const unsubscribe = firebase
//       .firestore()
//       .collection(collectionType)
//       .doc(itemId)
//       .onSnapshot((snapshot) => {
//         const data = snapshot.data();
//         setDescription(data.description);
//         setValue(data.value); // 'value' could be 'calories' or 'duration' depending on the entry type
//         setDate(data.date.toDate()); // Ensure dates are handled correctly
//         setIsSpecial(data.isSpecial);
//       });

//     return () => unsubscribe();
//   }, []);

//   const handleSave = () => {
//     if (!description || !value) {
//       Alert.alert("Error", "Please make sure all fields are filled.");
//       return;
//     }

//     firebase
//       .firestore()
//       .collection(collectionType)
//       .doc(itemId)
//       .update({
//         description,
//         value,
//         date,
//         isSpecial,
//       })
//       .then(() => {
//         Alert.alert("Success", "Entry updated successfully.");
//         navigation.goBack();
//       })
//       .catch((error) => {
//         Alert.alert("Error", "Failed to update entry: " + error.message);
//       });
//   };

//   const handleDelete = () => {
//     firebase
//       .firestore()
//       .collection(collectionType)
//       .doc(itemId)
//       .delete()
//       .then(() => {
//         Alert.alert("Success", "Entry deleted successfully.");
//         navigation.goBack();
//       })
//       .catch((error) => {
//         Alert.alert("Error", "Failed to delete entry: " + error.message);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Description:</Text>
//       <TextInput
//         value={description}
//         onChangeText={setDescription}
//         style={styles.input}
//       />
//       <Text>Value (Calories or Duration):</Text>
//       <TextInput
//         value={String(value)}
//         onChangeText={(text) => setValue(text)}
//         style={styles.input}
//         keyboardType="numeric"
//       />
//       <Text>Date:</Text>
//       <TextInput
//         value={date.toDateString()}
//         onFocus={() => setShowDatePicker(true)}
//         style={styles.input}
//       />
//       {showDatePicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setDate(selectedDate || date);
//             setShowDatePicker(false);
//           }}
//         />
//       )}
//       <View style={styles.switchContainer}>
//         <Text>Special Entry:</Text>
//         <Switch value={isSpecial} onValueChange={setIsSpecial} />
//       </View>
//       <Button title="Save" onPress={handleSave} />
//       <Button title="Delete" onPress={handleDelete} color="red" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "white",
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: "gray",
//     marginBottom: 20,
//     padding: 10,
//   },
//   switchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
// });

// export default EditEntryScreen;

import { View, Text } from 'react-native'
import React from 'react'

export default function EditEntryScreen() {
  return (
    <View>
      <Text>EditEntryScreen</Text>
    </View>
  )
}