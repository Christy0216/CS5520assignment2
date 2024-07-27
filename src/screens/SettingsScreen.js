import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/theme";
import { commonStyles } from "../styles/styles";
import Button from "../components/Button";

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View
      style={[
        commonStyles.settingContainer,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default SettingsScreen;
