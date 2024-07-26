import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  settingContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#dcd8e5",
    justifyContent: "center",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
});
