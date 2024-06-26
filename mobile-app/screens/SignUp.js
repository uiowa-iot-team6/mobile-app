import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import logo from '../assets/logo.png'; // Make sure to use your actual logo path
import { width, height } from '../config/DeviceDimensions';
// import TextField from '../components/TextField';
import axios from 'axios';
import { api } from '../config/Api';
// import LongBtn from '../components/LongBtn';
export default function SignUp({ navigation }) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  async function signUp() {
    console.log('HELLO');
    if (
      firstname === '' ||
      lastname === '' ||
      username === '' ||
      password === '' ||
      rePassword === '' ||
      email === ''
    ) {
      setError('All fields are required');
    } else if (password !== rePassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      console.log(api);
      await axios
        .post('http://' + api + `/auth/register`, {
          firstname,
          lastname,
          username,
          email,
          password,
        })
        .then(r => {
          console.log('Response: ', r.data,'http://' + api + `/api/auth/register`);
          navigation.navigate('Login');
        })
        .catch(err => {
          console.log('Error', err.response.data.message);
          if (err.response.data.message) {
            setError(err.response.data.message);
          }
        });
    }
  }

  return (
      <View style={styles.container} testID="SignUp">
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Create Account</Text>
        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
        <TextInput
          testID="firstNameInput"
          label="First Name"
          style={styles.input}
          mode="outlined"
          onChangeText={setFirstName}
        />
        <TextInput
          testID="lastNameInput"
          label="Last Name"
          style={styles.input}
          mode="outlined"
          onChangeText={setLastName}
        />
        <TextInput
          testID="userNameInput"
          label="User Name"
          style={styles.input}
          mode="outlined"
          onChangeText={setUserName}
        />
        <TextInput
          testID="emailInput"
          label="Email"
          style={styles.input}
          mode="outlined"
          onChangeText={setEmail}
        />
        <TextInput
          testID="passwordInput"
          label="Password"
          secureTextEntry={passwordVisibility}
          style={styles.input}
          mode="outlined"
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={passwordVisibility ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
              style={{ marginTop: 10, zIndex: 1 }}
            />
          }
        />
        <TextInput
          testID="rePasswordInput"
          label="Re-Enter Password"
          secureTextEntry={passwordVisibility}
          style={styles.input}
          mode="outlined"
          onChangeText={setRePassword}
        />
        <Button
          testID="signUpButton"
          mode="contained"
          onPress={() => signUp()}
          style={styles.button}
        >
          Sign Up
        </Button>
        <Button
          onPress={() => navigation.navigate('Login')}
          style={styles.textButton}
          labelStyle={styles.textButtonLabel}
        >
          Already have an account? Sign In!
        </Button>
      </View>
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
    backgroundColor: 'black',
  },
  logo: {
    width: width * 0.42, // Adjusted to match Login.js
    height: height * 0.5, // Adjusted to match Login.js
  },


  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Assuming a light color will stand out on the gradient background
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '95%',
    marginBottom: 15,
    borderRadius: 25, // Increase this value to make edges more rounded
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white for the input background
  },
  button: {
    marginTop: 10,
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#fb9c04', // Or any color that suits your theme
  },
  textButton: {
    marginTop: 15,
    backgroundColor: 'transparent',
  },
  textButtonLabel: {
    color: '#fff', // This should match your theme's primary color
  },
});
