import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
import Stats from "../screens/Stats";
import Plans from "../screens/Plans";
import More from "../screens/More";

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
            break;
          case 'Stats':
            iconName = 'auto-awesome';
            break;
          case 'Plans':
            iconName ='my-library-books';
            break;
          case 'More': // Add a case for the Exercise screen
            iconName = 'more-horiz';
            break;
          default:
            iconName = 'error';
        }

        return <MaterialIcons name={iconName} size={size} color={color} testID={testID} />;
      },
    })}
  >
    <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="Stats" component={Stats} />
    <Tab.Screen name="Plans" component={Plans} />
    <Tab.Screen name="More" component={More} />
  </Tab.Navigator>
);

export default TabNavigator;
