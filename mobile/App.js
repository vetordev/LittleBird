import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
        <StatusBar style="auto" />
      </AuthProvider>
    </NavigationContainer>
  );
}
