import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSession } from '../context/SessionContext';
import AuthNavigator from './AuthNavigator';
// import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useSession();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
            user ? (
                // <Stack.Screen name="Tab" component={TabNavigator} />
                null
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )
        }
    </Stack.Navigator>
  );
};

export default AppNavigator;
