import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import { commonStyles } from '../styles/styles';

const Button = ({ title, onPress, color = 'grey' }) => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <TouchableOpacity onPress={onPress} style={[commonStyles.button, { backgroundColor: color }]}>
      <Text style={[commonStyles.text, { color: currentTheme.textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
