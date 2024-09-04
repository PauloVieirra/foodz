// routes/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminPage from '../Screens/Adm';

const Stack = createStackNavigator();

const AppAdm = () => {
 

  return (
   
        <Stack.Navigator>
          <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false}} />
        </Stack.Navigator>
     
  );
};

export default AppAdm;
