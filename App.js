import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, ImageBackground, Modal, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setIsModalVisible(false); // Close the modal after adding goal
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
      <StatusBar barStyle="light-content" />
      <ImageBackground source={require('./assets/bggoal.png')} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Your Goal!'
              onChangeText={goalInputHandler}
              value={enteredGoalText}
            />
            <Button title='Add Goal' onPress={() => setIsModalVisible(true)} />
          </View>
          <View style={styles.goalsContainer}>
            <Text style={styles.goalsTitle}>List of Goals</Text>
            <FlatList
              data={courseGoals}
              keyExtractor={item => item.id}
              renderItem={itemData => (
                <View style={styles.goalItem}>
                  <Text>{itemData.item.value}</Text>
                  <Button
                    title='Delete'
                    onPress={() => {
                      Alert.alert(
                        'Confirm Deletion',
                        'Are you sure you want to delete this goal?',
                        [
                          {
                            text: 'Cancel',
                            style: 'cancel',
                          },
                          {
                            text: 'Delete',
                            onPress: () => deleteGoalHandler(itemData.item.id),
                            style: 'destructive',
                          },
                        ],
                        { cancelable: true }
                      );
                    }}
                  />
                </View>
              )}
              bounces={false}
            />

          </View>
        </View>
      </ImageBackground>
      {/* Modal for adding a goal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Goal</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder='Enter your goal'
              onChangeText={goalInputHandler}
              value={enteredGoalText}
            />
            <View style={styles.modalButtonContainer}>
              <Button title='Cancel' onPress={() => setIsModalVisible(false)} color="#f31282" />
              <Button title='Confirm' onPress={addGoalHandler} color="#008000" />
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
});
