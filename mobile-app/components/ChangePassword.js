import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';

const ChangePassword = ({onClose}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setErrorMessage('All fields are required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('New password and confirm password must match');
            return;
        }

        // Add additional password validation logic here (e.g., minimum length)

        // Reset error message
        setErrorMessage('');

        // Submit password change request
        console.log('Password change request submitted');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Current Password:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />

            <Text style={styles.label}>New Password:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />

            <Text style={styles.label}>Confirm New Password:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            <Button
                title="Change Password"
                onPress={handleChangePassword}
            />
            <TouchableOpacity style={styles.setGoalButton} onPress={onClose}>
                <Text style={styles.setGoalButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
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
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default ChangePassword;
