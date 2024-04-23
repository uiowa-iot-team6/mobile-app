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
          case 'History':
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
      tabBarInactiveTintColor: 'gray', // Set inactive icon color
      tabBarStyle: {
        backgroundColor: '#141723', // Make tab bar background transparent
        position: 'absolute', // Positioning it absolute
        borderTopWidth: 0, // Remove top border of the tab bar
        elevation: 0, // Remove shadow on Android
      }
    })}
  >
    <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="History" component={Plans} options={{
      headerStyle: {  backgroundColor: 'rgba(35,40,61,0.96)',},
      headerTitleStyle: {
        color: "#fff",
      } }
    }/>
    <Tab.Screen name="More" component={More} options={{
      headerStyle: {  backgroundColor: 'rgba(35,40,61,0.96)',},
      headerTitleStyle: {
        color: "#fff",
      } }
    }/>
  </Tab.Navigator>
);

export default TabNavigator;
