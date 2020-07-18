import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './src/routes/auth.routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthRoutes />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
