// routes/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

const AppRoutes = () => {
 

  return (
    
     
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        </Stack.Navigator>
      
  
  );
};

export default AppRoutes;
