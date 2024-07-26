import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

const SettingsScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
        <Text style={[styles.text, { color: currentTheme.textColor }]}>Current Theme: {theme}</Text>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
    },
  });
  
  export default SettingsScreen;