import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
function Stats(props) {
    return (
        <View style={styles.container}>
            <Text>This is a stats screen</Text>
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

export default Stats;
