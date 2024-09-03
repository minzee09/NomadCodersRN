import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '@/screens/Detail';
import { useColorScheme } from 'react-native';
import { BLACK_COLOR } from '@/colors';

const NativeStack = createNativeStackNavigator();

export default function Stack() {
  const isDark = useColorScheme() === 'dark';
  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: 'fade',
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : '#fff',
        },
        headerTintColor: isDark ? '#fff' : BLACK_COLOR,
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
}
