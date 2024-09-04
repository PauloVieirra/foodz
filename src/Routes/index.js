import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthRoutes from './Auth.Routes';
import AppRoutes from './App.Routes';
import AppAdm from './App.Adim';
import LoadingIndicator from '../Components/Loading';
import { useAuth } from '../Context/AuthContext';

const Stack = createStackNavigator();

const AppRoutesControl = () => {
  const { user, userType, handleLoading, isLoading } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Navigator>
        {user ? (
          userType === 'ADM' ? (
            <Stack.Screen name="AppAdm" component={AppAdm} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="AppRoutes" component={AppRoutes} options={{ headerShown: false }} />
          )
        ) : (
          <Stack.Screen name="AuthRoutes" component={AuthRoutes} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
      {isLoading && <LoadingIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRoutesControl;
