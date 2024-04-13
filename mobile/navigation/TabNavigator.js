import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeStack"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let testID;

        switch (route.name) {
          case 'HomeStack':
            iconName = 'home';
            testID = 'homeIcon';
            break;
          case 'Rewards':
            iconName = 'auto-awesome';
            testID = 'card-giftcardIcon';
            break;
          case 'Break':
            iconName = focused ? 'free-breakfast' : 'free-breakfast';
            testID = 'free-breakfastIcon';
            break;
          case 'Exercise': // Add a case for the Exercise screen
            iconName = 'directions-walk';
            testID = 'exerciseIcon';
            break;
          default:
            iconName = 'error';
            testID = 'defaultIcon';
        }

        return <MaterialIcons name={iconName} size={size} color={color} testID={testID} />;
      },
    })}
  >
    <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default TabNavigator;
