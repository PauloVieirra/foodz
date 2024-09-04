import React  from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../Screens/Signin';
import Signup from '../Screens/Signup';
import TermsAndPrivacyScreen from '../Screens/Terms';





const Stack = createStackNavigator();

function AuthRoutes  () {
  return (
  
      <Stack.Navigator>
         <Stack.Screen name="Signin" component={Signin}  options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup}  options={{ headerShown: false }} />
        <Stack.Screen name="TermsAndPrivacyScreen" component={TermsAndPrivacyScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
 
  
  );
};

export default AuthRoutes;
