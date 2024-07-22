// Button.js
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title, style }) => {
  return (
    <Pressable style={({ pressed }) => [styles.button, style, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default Button;
