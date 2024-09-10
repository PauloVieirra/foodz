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
  const { user, fetchUserProfile, isLoading,isLoggedIn } = useAuth(); // Função fetchUserProfile chamada do contexto
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        const profile = await fetchUserProfile();
        setUserType(profile?.userType || null);
      }
    };

    fetchProfileData();
  }, [user]);


  return (
    <SafeAreaView style={styles.container}>
     
      <Stack.Navigator>
        {user && isLoggedIn  ? (
          userType === 'ADM' ? (
            <Stack.Screen name="AppAdm" component={AppAdm} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="AppRoutes" component={AppRoutes} options={{ headerShown: false }} />
          )
        ) : (
          <Stack.Screen name="AuthRoutes" component={AuthRoutes} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppRoutesControl;
