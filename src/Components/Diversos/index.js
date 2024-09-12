import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 

// Componente StatusTag
const StatusTag = ({ status }) => {
  let backgroundColor;
  let color;
  let icon = null; 

  switch (status) {
    case 'preparando':
      backgroundColor = '#FBEFDF'; // Cor para "aceito"
      color = '#D09158'; // Cor para texto
      break;
    case 'cancelado':
      backgroundColor = '#EE4B22'; // Cor para "cancelado"
      color = '#FAFAFA';
      break;
    case 'entrega':
      backgroundColor = '#5BCE93'; // Cor para "entrega"
      color = '#FAFAFA';
      break;
    case 'finalizado':
      backgroundColor = '#E9790B'; // Cor para "finalizado"
      color = '#FAFAFA';
      icon = ''; // Adiciona o ícone para "finalizado"
      break;
    default:
      backgroundColor = 'lightgray'; // Cor padrão para status desconhecido
      color = '#000';
      break;
  }

  return (
    <View style={[styles.tag, { backgroundColor }]}>
    
      <Text style={[styles.tagText, { color }]}>{status}{icon}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row', // Adiciona esta linha para alinhar o ícone e o texto horizontalmente
    padding: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  tagText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5, // Adiciona um espaço entre o ícone e o texto
  },
});

export default StatusTag;
