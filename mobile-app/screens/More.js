import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
function More(props) {
    return (
        <View style={styles.container}>
            <Text>This is a More screen</Text>
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

export default More;
