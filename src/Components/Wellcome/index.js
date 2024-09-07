import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../Context/AuthContext";
import styles from "./styles";

export default function WellcomeText() {
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
          <Text style={styles.subTitle}>O que vamos pedir hoje ?</Text>
        </>
      ) : (
        // Exibe uma mensagem pedindo para completar o cadastro se o perfil não estiver completo
        <>
          <Text style={styles.title}>Complete seu cadastro!</Text>
          <Text style={styles.subTitle}>
            Precisamos de mais informações suas para concluir seu cadastro.
          </Text>
        </>

      )}
    </View>
  );
}
