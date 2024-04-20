import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSession } from "../context/SessionContext";
import axios from "axios";
import {api} from "../config/Api";

const CodeInput = ({ onSubmit, onClose }) => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const { user } = useSession();

    const handleCodeChange = (text) => {
        setCode(text);
    };

    const handleSubmit = () => {
        axios.put(`http://${api}/device/connect-user`, {
            username: user.username,
            code: code,
        }).then((response) => {
            // On success, set success message
            setMessage('Device connected successfully');
            console.log('Device connected:', response.data);
        }).catch((error) => {
            // On failure, set failure message
            setMessage('Failed to connect device. Please try again.');
            console.error('Device connection error:', error);
        });
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Code</Text>
            <TextInput
                style={styles.input}
                value={code}
                onChangeText={handleCodeChange}
                placeholder="Enter code"
            />
            <View style={styles.buttonContainer}>
                <Button title="Connect" onPress={handleSubmit} />
                <Button title="Close" onPress={handleClose} />
            </View>
            {/* Display success or failure message */}
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    message: {
        marginTop: 20,
        color: 'green', // You can adjust the color based on success or failure
    },
});

export default CodeInput;
