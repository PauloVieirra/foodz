import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import DetailsScreen from '../Screens/Detail';
import Profille from '../Screens/Profille';
import Pedidos from '../Screens/Registros';
import Cart from '../Screens/Cart';
import Menus from '../Screens/Menu';
import Ofertas from '../Screens/Promocoes';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../Context/CartContext'; // Importe o contexto do carrinho
import Topbar from '../Components/Topbar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação principal do Tab
const TabNavigator = () => {
  const { cartItems, pedidos } = useCart(); // Obtém os itens do carrinho do contexto

  // Calcula a quantidade total de itens no carrinho
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantidade, 0);
  const totalPedidos = pedidos.length; // Considera a quantidade total de pedidos

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: (props) => <Topbar {...props} />,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home-outline';
          } else if (route.name === 'Pedidos') {
            iconName = 'receipt-outline';
          } else if (route.name === 'Ofertas') {
            iconName = 'pricetags-outline';
          } else if (route.name === 'Menu') {
            iconName = 'menu';
          }

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              
              {/* Exibe a badge no ícone do carrinho */}
              {route.name === 'Carrinho' && totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
              
              {/* Exibe a badge no ícone de pedidos */}
              {route.name === 'Pedidos' && totalPedidos > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalPedidos}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
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
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Pedidos" component={Pedidos} />
      <Tab.Screen name="Ofertas" component={Ofertas} />
      <Tab.Screen name="Menu" component={Menus} />
    </Tab.Navigator>
  );
};

// Navegação principal do aplicativo usando Stack Navigator
const AppRoutes = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ 
          header: (props) => <Topbar {...props} />, // Adiciona o Topbar como cabeçalho personalizado
          headerShown: false, // Ativa o cabeçalho para exibir o Topbar
        }} 
      />
    
      <Stack.Screen 
        name="Detalhes"
        component={DetailsScreen} 
        options={{ 
          title: 'Detalhes do Produto', 
          header: (props) => <Topbar {...props} />, // Adiciona o Topbar como cabeçalho personalizado
          headerShown: true, // Ativa o cabeçalho para exibir o Topbar
        }} 
      />

    <Stack.Screen 
        name="Carrinho"
        component={Cart} 
        options={{ 
          title: '', 
          header: (props) => <Topbar {...props} />, // Adiciona o Topbar como cabeçalho personalizado
          headerShown: true, // Ativa o cabeçalho para exibir o Topbar
        }} 
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default AppRoutes;
