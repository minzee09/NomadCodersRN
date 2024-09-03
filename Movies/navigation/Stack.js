import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '@/screens/Detail';

const NativeStack = createNativeStackNavigator();

export default function Stack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: 'fade',
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
}
