import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import {useSession} from "../context/SessionContext";
import {api} from "../config/Api";

const ManualFoodEntry = ({onClose}) => {
    const [description, setDescription] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [servingSizeUnit, setServingSizeUnit] = useState('');
    const [servingsConsumed, setServingsConsumed] = useState('');
    const [message, setMessage] = useState('');
    const {user} = useSession()

    async function handleCreateManually(){
        console.log(user.username,
            description,
            servingSize,
            servingSizeUnit,
            servingsConsumed,api)
        try {
            const response = await axios.post(`http://${api}/api/food/create-manually`, {
                username: user.username,
                description,
                servingSize,
                servingSizeUnit,
                servingsConsumed,
            });
            console.log('Food entry created:', response.data.food);
            setMessage('Food entry created successfully');
        } catch (error) {
            console.error('Error creating food entry:', error.response.data.message);
            setMessage('Error: ' + error.response.data.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manual Food Entry</Text>
            <TextInput
                style={styles.input}
                placeholder="Food Name"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Serving Size"
                value={servingSize}
                onChangeText={setServingSize}
            />
            <TextInput
                style={styles.input}
                placeholder="Serving Size Unit"
                value={servingSizeUnit}
                onChangeText={setServingSizeUnit}
            />
            <TextInput
                style={styles.input}
                placeholder="Servings Consumed"
                value={servingsConsumed}
                onChangeText={setServingsConsumed}
            />
            <Button
                title="Create Food Entry"
                onPress={handleCreateManually}
            />
            <Button
                title="Close"
                onPress={onClose}
            />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    message: {
        marginTop: 10,
        color: 'red',
    },
});

export default ManualFoodEntry;
