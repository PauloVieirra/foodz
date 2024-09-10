// screens/DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import HorizontalSlider from '../../Components/Slide';
import {WellcomeText} from '../../Components/Wellcome/index';
import ProdutosScreen from '../../Components/Produto';

const Home = () => {





  return (
    <View style={styles.container}>
      <View style={styles.cardWell}>
        <WellcomeText />
      </View>
      <ProdutosScreen/>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'#FFF',
  
  },
  slider:{
    height:100,
  },
  cardWell: {
    width:'100%',
    backgroundColor: '#fff', // Cor de fundo do card
    borderRadius: 4,           // Bordas arredondadas
    padding: 0,                // Espaçamento interno do card
    margin: 1,                 // Espaçamento externo entre o card e os outros elementos
    
    justifyContent:'flex-start'       // Elevação (sombra no Android)
  },
});

export default Home;
