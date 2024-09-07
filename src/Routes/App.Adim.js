// routes/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminPage from '../Screens/Adm';
import ProfileAdm from '../Screens/ProfileAdm';
import Cadastros from '../Screens/Produtos';
import PedidosAdm from '../Screens/Pedidos';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppAdm = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline'; // Ícone para a aba Home
          } else if (route.name === 'Pedidos') {
            iconName = 'receipt-outline'; // Ícone para a aba Recibos
          } else if (route.name === 'Cadastro') {
            iconName = 'add'; // Ícone para a aba Cart
          } else if (route.name === 'Perfil') {
            iconName = 'person-outline'; // Ícone para a aba Profille
          }

          // Retorna o ícone especificado com o tamanho e a cor
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green', // Cor do ícone ativo
        tabBarInactiveTintColor: 'gray', // Cor do ícone inativo
        headerShown: false, // Esconder o cabeçalho
        tabBarStyle: {
          backgroundColor: '#fff', // Cor de fundo da barra de navegação
          height: 70, // Aumenta a altura da barra de navegação
          paddingBottom: 10, // Espaçamento interno na parte inferior
          paddingTop: 10, // Espaçamento interno na parte superior
        },
        tabBarLabelStyle: {
          fontSize: 14, // Aumenta o tamanho da fonte dos rótulos
          fontWeight: 400, // Peso da fonte dos rótulos
        },
      })}
    >
      <Tab.Screen name="Home" component={AdminPage}/>
      <Tab.Screen name="Pedidos" component={PedidosAdm}/>
      <Tab.Screen name="Cadastro" component={Cadastros}/>
      <Tab.Screen name="Perfil" component={ProfileAdm}/>
    </Tab.Navigator>
  );
};

export default AppAdm;


