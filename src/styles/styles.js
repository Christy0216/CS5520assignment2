import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  specialContainer: {
    margin: 20,
    flexDirection: "row",
  },
  specialText: {
    fontSize: 14,
    color: "black", // Adjust as needed for your design
    marginBottom: 10,
  },
  checkBoxStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  // Additional styles that are part of your app can be added here
  settingContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#dcd8e5",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#4b3f72",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
    flex: 1,
  },
  iconContainer: {
    width: 24, // Width of the icon
    marginRight: 10, // Space before the date
  },
  date: {
    fontSize: 16,
    backgroundColor: "white",
    padding: 8,
    color: "#ffffff",
    marginHorizontal: 5,
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    backgroundColor: "white",
    padding: 8,
    color: "#ffffff",
    marginHorizontal: 5,
  },
  button: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

// Export styles as needed elsewhere in your app
export default commonStyles;
