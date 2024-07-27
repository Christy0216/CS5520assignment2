import React, { useContext } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/theme";
import { commonStyles } from "../styles/styles";

const Button = ({ title, onPress, color = "lightyellow" }) => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        commonStyles.button,
        { backgroundColor: pressed ? "#dddddd" : color },
        { borderColor: currentTheme.textColor },
      ]}
      android_ripple={{ color: "#ccc" }}
    >
      {({ pressed }) => (
        <Text
          style={[
            commonStyles.text,
            { color: pressed ? "#333333" : currentTheme.textColor },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
