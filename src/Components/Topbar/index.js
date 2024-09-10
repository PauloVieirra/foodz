import React,{useEffect} from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity,Pressable } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext'; // Adiciona importação do contexto do carrinho
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';

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
  const { cartItems, notifications } = useCart(); // Obtém os itens do carrinho
  const navigation = useNavigation();
  const route = useRoute();
  const screenName = route.name;

  useEffect(() => {
    fetchUserProfile();
  }, []);

  

  // Calcula o total de itens no carrinho
  const totalItems = cartItems.reduce((total, item) => total + (item.quantidade || 1), 0);
  const totalNotificacoesNaoLidas = notifications.filter(n => !n.lida).length;

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View>
        {/* Verifica se a tela atual é 'Detalhes' ou 'Carrinho' */}
        {(screenName === 'Detalhes' || screenName === 'Carrinho') ? (
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
              <Text style={styles.titlescreen}>Voltar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.titlescreen}>{screenName}</Text>
        )}
      </View>
      <View style={styles.contmenu}>
        <View style={{ position: 'relative' }}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          {totalNotificacoesNaoLidas > 0 && <NotificationBadge count={totalNotificacoesNaoLidas} />}
        </View>

        <Pressable style={{ position: 'relative' }} onPress={() => navigation.navigate('Carrinho')}>
          <Ionicons name="cart-outline" size={24} color="black" />
          {totalItems > 0 && (
            <View style={[styles.badge, { backgroundColor: 'red' }]}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  </SafeAreaView>
  );
}


