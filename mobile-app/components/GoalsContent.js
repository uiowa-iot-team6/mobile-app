import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const GoalsContent = ({onClose}) => {
    const [targetWeight, setTargetWeight] = useState('');
    const [goalPace, setGoalPace] = useState('');
    const [carbsPercentage, setCarbsPercentage] = useState('');
    const [proteinPercentage, setProteinPercentage] = useState('');
    const [fatsPercentage, setFatsPercentage] = useState('');

    const handleSetGoals = () => {
        // Implement logic to handle setting goals
        console.log('Target Weight:', targetWeight);
        console.log('Goal Pace:', goalPace);
        console.log('Carbs Percentage:', carbsPercentage);
        console.log('Protein Percentage:', proteinPercentage);
        console.log('Fats Percentage:', fatsPercentage);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.goalTitle}>Set Your Goals</Text>
            <Text style={styles.goalDescription}>Achieving your goals requires setting targets. Fill in the following details to get started:</Text>
            <TextInput
                style={styles.input}
                placeholder="Target Weight (kg)"
                keyboardType="numeric"
                value={targetWeight}
                onChangeText={setTargetWeight}
            />
            <TextInput
                style={styles.input}
                placeholder="Goal Pace (kg/month)"
                keyboardType="numeric"
                value={goalPace}
                onChangeText={setGoalPace}
            />
            <TextInput
                style={styles.input}
                placeholder="Carbs Percentage (%)"
                keyboardType="numeric"
                value={carbsPercentage}
                onChangeText={setCarbsPercentage}
            />
            <TextInput
                style={styles.input}
                placeholder="Protein Percentage (%)"
                keyboardType="numeric"
                value={proteinPercentage}
                onChangeText={setProteinPercentage}
            />
            <TextInput
                style={styles.input}
                placeholder="Fats Percentage (%)"
                keyboardType="numeric"
                value={fatsPercentage}
                onChangeText={setFatsPercentage}
            />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.setGoalButton} onPress={handleSetGoals}>
                    <Text style={styles.setGoalButtonText}>Set Your Goals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setGoalButton} onPress={onClose}>
                    <Text style={styles.setGoalButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    goalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    goalDescription: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    setGoalButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    setGoalButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default GoalsContent;
