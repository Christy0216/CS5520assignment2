// styles.js
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#dcd8e5", // Background color for the screen
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#4b3f72", // Background color for items
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: "#ffffff", // Text color for regular text
  },
  title: {
    fontSize: 16,
    color: "#ffffff", // Text color for titles
  },
  date: {
    backgroundColor: "#6f678e", // Background color for date
    padding: 5,
    borderRadius: 5,
    color: "#ffffff",
    marginHorizontal: 5,
  },
  value: {
    backgroundColor: "#6f678e", // Background color for calories/duration
    padding: 5,
    borderRadius: 5,
    color: "#ffffff",
    marginHorizontal: 5,
  },
});
