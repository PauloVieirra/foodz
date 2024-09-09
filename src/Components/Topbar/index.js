import React,{useEffect} from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext'; // Adiciona importação do contexto do carrinho
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import Profile from '../../Screens/Profille';

// Componente para o círculo de notificação
const NotificationBadge = ({ count }) => {
  // Define a cor do badge com base na quantidade de itens
  const badgeColor = count > 1 ? 'white' : 'red';
  const textColor = count > 1 ? 'black' : 'white';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: badgeColor }, // Cor do círculo
      ]}
    >
      <Text style={{ color: textColor, fontSize: 10 }}>{count}</Text> {/* Cor do texto */}
    </View>
  );
};

export default function Topbar() {
  const { user, fetchUserProfile } = useAuth();
  const { cartItems } = useCart(); // Obtém os itens do carrinho

  useEffect(() => {
    fetchUserProfile();
  }, []);

  

  // Calcula o total de itens no carrinho
  const totalItems = cartItems.reduce((total, item) => total + (item.quantidade || 1), 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contimage}>
        <Image
            source={user?.profile?  { uri: user.profile.image } : require('../../../assets/icon.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.contmenu}>
          <View style={{ position: 'relative' }}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            {/* Se desejar adicionar lógica para notificações, ajuste aqui */}
          </View>
          
          <View style={{ position: 'relative' }}>
            <Ionicons name="cart-outline" size={24} color="black" />
            {totalItems > 0 && (
             <View style={styles.badge}> 
              <Text style={styles.badgeText}>
              {totalItems} {/* Exibe o badge com a quantidade de itens */}
              </Text>
              </View>
             )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}


