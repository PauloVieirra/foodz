// screens/DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context/AuthContext';

const Home = () => {
const { logout, user } = useAuth();


const handleLogout = () => {
   logout();
}

  return (
    <View style={styles.container}>
      <Text>Home {user?.email}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFF'
  },
});

export default Home;
