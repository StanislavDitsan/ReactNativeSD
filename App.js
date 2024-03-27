import React from 'react';
import { StatusBar, TouchableOpacity, } from 'react-native';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.appcontainer}>
      <View style={styles.inputcontainer}>
        <TextInput placeholder='Your Goal!' />
        <Button title='Add Your Goal' />
      </View>
      <View>
        <Text style={styles.listofgoals}>List of Goals</Text>
      </View>
    </View>

  );
}

// const handlePress = () => {
//   alert('Button Clicked! You can add more functionality here.');
// };

const styles = StyleSheet.create({
  appcontainer:{
    padding:60,
  },
  inputcontainer:{
    flexDirection: 'row',
  }

});
