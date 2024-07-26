import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

const Button = ({ title, onPress, color = 'grey' }) => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={[styles.text, { color: currentTheme.textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
