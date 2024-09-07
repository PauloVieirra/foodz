import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { useAuth } from "../../Context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

// Componente para o círculo de notificação
const NotificationBadge = ({ color }) => (
  <View
    style={{
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: color,
      position: 'absolute',
      top: -2,
      right: -2,
    }}
  />
);

export default function Topbar() {
  const { user } = useAuth();

  // Defina a cor do círculo com base na condição de notificações
  // Você pode ajustar a lógica aqui para diferentes tipos de notificações
  const notificationColor = user?.nome ? 'red' : 'green';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contimage}>
          <Image
            source={user?.image ? { uri: user.image } : require('../../../assets/icon.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.contmenu}>
          <View style={{ position: 'relative' }}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <NotificationBadge color={notificationColor} />
          </View>
          
          <View>
          <Ionicons name="menu" size={24} color="black"></Ionicons>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
