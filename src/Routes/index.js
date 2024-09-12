import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthRoutes from './Auth.Routes';
import AppRoutes from './App.Routes';
import AppAdm from './App.Adim';
import LoadingIndicator from '../Components/Loading';
import Topbar from '../Components/Topbar';
import { useAuth } from '../Context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const AppRoutesControl = () => {
  const { user, fetchUserProfile, userType,isLoggedIn, isLoading } = useAuth(); // Função fetchUserProfile chamada do contexto
  

  return (
    <SafeAreaView style={styles.container}>
     <SafeAreaView style={styles.container}>
     {isLoading && (
          <LoadingIndicator/>
      )}
      <Stack.Navigator>
        {!isLoggedIn ? (
          
          <Stack.Screen name="AuthRoutes" component={AuthRoutes} options={{ headerShown: false }} />
        ) : userType === 'ADM' ? (
          <Stack.Screen name="AppAdm" component={AppAdm} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="AppRoutes" component={AppRoutes} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRoutesControl;
