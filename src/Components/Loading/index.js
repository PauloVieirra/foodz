import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../../Context/AuthContext';

const LoadingIndicator = ({ message = 'Carregando...', size = 'large', color = '#0000ff' }) => {
    const { handleLoading } = useAuth();

   const onoffLoading = () => {
         handleLoading(!handleLoading);
    }
  return (
    <Pressable style={styles.overlay} onPress={handleLoading}>
      <View style={styles.container} >
        <ActivityIndicator size={size} color={color} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Adiciona uma sobreposição semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Fundo branco para o indicador de carregamento
    padding: 20,
    borderRadius: 10,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default LoadingIndicator;
