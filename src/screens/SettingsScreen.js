import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import { commonStyles } from '../styles/styles';

const SettingsScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  
    return (
      <View style={[commonStyles.settingContainer, { backgroundColor: currentTheme.backgroundColor }]}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    );
  };
  
  export default SettingsScreen;