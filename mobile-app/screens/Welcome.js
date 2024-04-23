import React from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';

import logo from '../assets/logo.png'; // Adjust the path as necessary
import { width, height } from '../config/DeviceDimensions';

export default function Welcome({ navigation }) {
  return (
      <ScrollView contentContainerStyle={styles.container} testID="Welcome">
        <Image testID="logo" source={logo} style={styles.logo} />
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{color:"white", fontWeight: 'bold', fontSize: 15}}>Login</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
         <Text style={{color:"white", fontWeight: 'bold', fontSize: 15}}>Sign Up</Text>
        </Button>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black', // Or any color that suits your theme
  },
  logo: {
    width: width * 0.42, // Adjusted to match Login.js
    height: height * 0.8, // Adjusted to match Login.js
  },
  title: {
    fontSize: 24, // Adjusted to match Login.js
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#fb9c04', // Or any color that suits your theme
    color: '#fff'
  },

});
