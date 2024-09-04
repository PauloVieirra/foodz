// routes/Index.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/Context/AuthContext';
import AppRoutesControl from './src/Routes/index';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider> 
      <AppRoutesControl/>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
