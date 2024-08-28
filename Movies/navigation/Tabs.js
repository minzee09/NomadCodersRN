import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/Search.js';
import Movies from '../screens/Movies.js';
import Tv from '../screens/Tv.js';
import { useColorScheme } from 'react-native';
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from '../colors';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR,
        },
      }}
    >
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}
