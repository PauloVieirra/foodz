import React ,{ useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useCart } from '../../Context/CartContext';

export default function NotificationList() {
  const { notifications, loading, markAsRead } = useCart();

  if (loading) return <Text>Carregando...</Text>;

  return (
    <View>
      {notifications.map((notification) => (
        <View key={notification.id}>
          <Text>{notification.titulo}</Text>
          <Text>{notification.mensagem}</Text>
          {!notification.lida && (
            <Button title="Marcar como Lida" onPress={() => markAsRead(notification.id)} />
          )}
        </View>
      ))}
    </View>
  );
}
