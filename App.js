import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  useEffect(() => {
    loadGoals();
  }, []);

  const goalInputHandler = enteredText => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim().length === 0) {
      Alert.alert('Invalid Goal', 'Please enter your goal!', [{ text: 'OK' }]);
      return;
    }

    const newGoal = { id: Math.random().toString(), value: enteredGoalText };
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, newGoal]);
    saveGoals([...courseGoals, newGoal]);
    setEnteredGoalText('');
  };

  const deleteGoalHandler = goalId => {
    setCourseGoals(currentCourseGoals =>
      currentCourseGoals.filter(goal => goal.id !== goalId)
    );
    const updatedGoals = courseGoals.filter(goal => goal.id !== goalId);
    saveGoals(updatedGoals);
  };

  const saveGoals = async (goals) => {
    try {
      await AsyncStorage.setItem('goals', JSON.stringify(goals));
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  const loadGoals = async () => {
    try {
      const savedGoals = await AsyncStorage.getItem('goals');
      if (savedGoals !== null) {
        setCourseGoals(JSON.parse(savedGoals));
      }
    } catch (error) {
      console.error('Error loading goals:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/bggoal.png')} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Your Goal!'
              onChangeText={goalInputHandler}
              value={enteredGoalText}
            />
            <Button title='Add Goal' onPress={addGoalHandler} />
          </View>
          <View style={styles.goalsContainer}>
            <Text style={styles.goalsTitle}>List of Goals</Text>
            <FlatList
              data={courseGoals}
              keyExtractor={item => item.id}
              renderItem={itemData => (
                <View style={styles.goalItem}>
                  <Text>{itemData.item.value}</Text>
                  <Button title='Delete' onPress={() => deleteGoalHandler(itemData.item.id)} />
                </View>
              )}
              bounces={false} // Disable bounce effect vertically
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 100,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  goalsContainer: {
    flex: 1,
  },
  goalsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});
