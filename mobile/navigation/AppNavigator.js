import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSession } from '../context/SessionContext';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useSession();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
            // User is signed in
            <Stack.Screen name="Main" component={AuthNavigator} />
        ) : (
            // No user is signed in
            <Stack.Screen name="Auth" component={DrawerNavigator} />
            // <Stack.Screen name="Auth" component={DrawerNavigator} />
        )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
