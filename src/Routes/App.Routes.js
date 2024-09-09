import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import DetailsScreen from '../Screens/Detail';
import Profille from '../Screens/Profille';
import Pedidos from '../Screens/Registros';
import Cart from '../Screens/Cart';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../Context/CartContext'; // Importe o contexto do carrinho

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação principal do Tab
const TabNavigator = () => {
  const { cartItems } = useCart(); // Obtém os itens do carrinho do contexto

  // Calcula a quantidade total de itens no carrinho
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantidade, 0);

  return (
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

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === 'Cart' && totalItems > 0 && (
               <View
               style={[
                 styles.badge,
                 {
                   backgroundColor: totalItems < 0 ? 'white' : 'green', // Cor do círculo baseada na quantidade de itens
                 },
               ]}
             >
               <Text
                 style={[
                   styles.badgeText,
                   {
                     color: totalItems > 1 ? 'black' : 'white', // Cor do texto ajustada para contraste
                   },
                 ]}
               >
                 {totalItems}
               </Text>
             </View>
             
              )}
            </View>
          );
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
};

// Navegação principal do aplicativo usando Stack Navigator
const AppRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Detalhes"
        component={DetailsScreen} 
        options={{ title: 'Detalhes do Produto' }} 
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
