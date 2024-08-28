import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/Search.js';
import Movies from '../screens/Movies.js';
import Tv from '../screens/Tv.js';
import { useColorScheme } from 'react-native';
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from '../colors';
import Ionicons from '@expo/vector-icons/Ionicons.js';
import Stack from './Stack.js';

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
        tabBarLabelStyle: {
          marginTop: -5,
          marginBottom: 5,
          fontSize: 12,
          fontWeight: 600,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="film-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="tv-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="search-outline" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
