import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
function Settings(props) {
    return (
        <View style={styles.container}>
            <Text>This is a settings screen</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Settings;
