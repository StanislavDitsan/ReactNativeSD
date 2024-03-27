import React from 'react';
import { StatusBar, TouchableOpacity, } from 'react-native';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('')

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
    console.log(enteredText);
  };

  function addGoalHandler() {
    console.log(enteredGoalText);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder='Your Goal!' onChangeText={goalInputHandler} />
        <Button title='Add Goal' onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        <Text>List of Goals</Text>
      </View>
    </View>

  );
}

// const handlePress = () => {
//   alert('Button Clicked! You can add more functionality here.');
// };

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottomBottom: 24,
    borderBottomWidth: 1,
    flex: 1,

  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    width: '70%',
    borderRadius: 10,
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 9,
  }
});
