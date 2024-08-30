import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import Movies from '../screens/Movies';
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
      sceneContainerStyle={{
        // 모든 화면을 담고 있는 컨테이너
        backgroundColor: isDark ? BLACK_COLOR : 'white',
      }}
      screenOptions={{
        unmountOnBlur: true, // 다른 탭으로 이동하면 해당 페이지 메모리 삭제 (성능 개선을 위함), 근데 query안쓰고 이걸 쓰면 데이터 다시 fetch함, query는 캐싱(한번 fetch한 데이터를 계속 기억함)을 해줌
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
