import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import {TouchableOpacity} from "react-native-gesture-handler";
function BoxComponent({width,height, children}) {
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            width: width,
            height: height,
            margin: 20,
            backgroundColor: '#252833',
            elevation: 40,
            borderWidth: 2,
        },
    });
    return (
        <TouchableOpacity style={styles.container}>
            {children}
        </TouchableOpacity>
    );
}


export default BoxComponent;
