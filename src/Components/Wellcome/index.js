import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import styles from "./styles";

const WellcomeText = () => {
  const { pedidos } = useCart();
  const { user, fetchUserProfile } = useAuth();
  
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Verifica se o perfil está completo
  const isProfileComplete = user?.profile?.complite_profile;

  return (
    <View style={styles.container}>
      {isProfileComplete ? (
        // Exibe a tela personalizada quando o perfil estiver completo
        <>
          <Text style={styles.title}>
            Oi, <Text style={styles.textNome}>{user.profile.nome}</Text>!
          </Text>
          <Text style={styles.subTitle}>O que vamos pedir hoje?</Text>
        </>
      ) : (
        // Exibe uma mensagem pedindo para completar o cadastro se o perfil não estiver completo
        <>
          <Text style={styles.title}>O que vamos pedir hoje?</Text>
        </>
      )}
    </View>
  );
};

const AdditionalComponent = () => {
  const { pedidos } = useCart(); // Utiliza o valor de pedidos do contexto

  return (
    <View style={styles.container}>
      {pedidos.length > 0 ? ( // Verifica se há pedidos
        <Text style={styles.subTitle}>Acompanhe seu pedido!</Text>
      ) : (
        <Text style={styles.subTitle}>Você não tem pedidos!</Text>
      )}
    </View>
  );
};

export { WellcomeText, AdditionalComponent };
