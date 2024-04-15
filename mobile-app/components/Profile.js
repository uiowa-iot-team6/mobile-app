import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const Profile = () => {
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSaveChanges = () => {
        // Save changes to user profile
        console.log('Changes saved:', { firstName, lastName, profilePicture });
    };

    const handleChooseProfilePicture = () => {
        const options = {
            title: 'Select Profile Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                setProfilePicture(source.uri);
            }
        });
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
                <Button title="Choose Profile Picture" onPress={handleChooseProfilePicture} />
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
        padding: 20,
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
