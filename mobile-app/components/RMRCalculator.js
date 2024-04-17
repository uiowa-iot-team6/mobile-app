import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useSession} from "../context/SessionContext";
import axios from "axios";

const RMRCalculator = ({onClose}) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [isMale, setIsMale] = useState(true);
    const [rmr, setRMR] = useState(null);
    const { user, saveUser, logout } = useSession();

    async function calculateRMR () {
        if (weight && height && age) {
            const weightKg = parseFloat(weight);
            const heightCm = parseFloat(height);
            const ageYears = parseInt(age);

            let rmrResult;
            if (isMale) {
                rmrResult = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
            } else {
                rmrResult = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
            }

            setRMR(rmrResult.toFixed(2));
            axios.put(`http://${api}/user/update-rmr`, {
               username: user.username, rmr:  rmrResult.toFixed(2)
            })
            .then((r) =>console.log(r.data.message))
            .catch((e)=>console.log("Error",e))
        } else {
            // Handle missing input
            setRMR(null);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Weight (kg):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />

            <Text style={styles.label}>Height (cm):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
            />

            <Text style={styles.label}>Age (years):</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />

            <Text style={styles.label}>Gender:</Text>
            <View style={styles.genderContainer}>
                <Button
                    title="Male"
                    onPress={() => setIsMale(true)}
                    color={isMale ? '#007bff' : '#ccc'}
                />
                <Button
                    title="Female"
                    onPress={() => setIsMale(false)}
                    color={!isMale ? '#007bff' : '#ccc'}
                />
            </View>

            <Button
                title="Calculate RMR"
                onPress={calculateRMR}
            />

            {rmr !== null && (
                <Text style={styles.result}>Your RMR: {rmr} kcal/day</Text>
            )}
            <TouchableOpacity style={styles.setGoalButton} onPress={onClose}>
                <Text style={styles.setGoalButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 60,
        paddingVertical: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RMRCalculator;
