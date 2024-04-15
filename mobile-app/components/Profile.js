import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import ImagePickerComponent from "./ImagePickerComponent";

const Profile = () => {
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSaveChanges = () => {
        // Save changes to user profile
        console.log('Changes saved:', { firstName, lastName, profilePicture });
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Text style={styles.title}>My Profile</Text>
                {profilePicture ? (
                    <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                ) : (
                    <View style={styles.profilePicturePlaceholder}>
                        <Text style={styles.profilePictureText}>Add Picture</Text>
                    </View>
                )}
                {/* Use ImagePickerComponent to choose profile picture */}
                <ImagePickerComponent
                    setProfilePicture={setProfilePicture}
                />
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>

            <Button
                title="Save Changes"
                onPress={handleSaveChanges}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 0
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    profilePicturePlaceholder: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePictureText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    profileInfo: {
        marginBottom: 20,
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
});

export default Profile;
