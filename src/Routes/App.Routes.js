// routes/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import DetailsScreen from '../Screens/Detail'; // Certifique-se de que o caminho para a tela de detalhes esteja correto
import Profille from '../Screens/Profille';
import Pedidos from '../Screens/Registros';
import Cart from '../Screens/Cart';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação principal do Tab
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Pedidos') {
          iconName = 'receipt-outline';
        } else if (route.name === 'Cart') {
          iconName = 'cart-outline';
        } else if (route.name === 'Profille') {
          iconName = 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: '400',
      },
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Pedidos" component={Pedidos} />
    <Tab.Screen name="Cart" component={Cart} />
    <Tab.Screen name="Profille" component={Profille} />
  </Tab.Navigator>
);

// Navegação principal do aplicativo usando Stack Navigator
const AppRoutes = () => {
  return (
    <Stack.Navigator>
      {/* O Tab Navigator é a tela principal */}
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      {/* Tela de detalhes que será sobreposta */}
      <Stack.Screen 
        name="Detalhes" // Verifique se o nome é "Detalhes"
        component={DetailsScreen} 
        options={{ title: 'Detalhes do Produto' }} 
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
