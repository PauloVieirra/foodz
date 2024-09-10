import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Componente StatusTag
const StatusTag = ({ status }) => {
  let backgroundColor;

  switch (status) {
    case 'aceito':
      backgroundColor = 'green'; // Cor para "aceito"
      break;
    case 'cancelado':
      backgroundColor = 'red'; // Cor para "cancelado"
      break;
    case 'entrega':
      backgroundColor = 'blue'; // Cor para "entrega"
      break;
    case 'finalizado':
      backgroundColor = 'gray'; // Cor para "finalizado"
      break;
    default:
      backgroundColor = 'lightgray'; // Cor padrão para status desconhecido
      break;
  }

  return (
    <View style={[styles.tag, { backgroundColor }]}>
      <Text style={styles.tagText}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StatusTag;
