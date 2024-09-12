import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingIndicator = ({ message }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adiciona uma sobreposição semitransparente
    justifyContent: 'center',
  
    zIndex: 1000, // Garante que o indicador de carregamento fique sobre outros componentes
  },
  container: {
    flex:1,
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
