import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../Context/AuthContext"; // Importa o contexto de autenticação
import { useCart } from "../../Context/CartContext";
import { AdditionalComponent } from "../../Components/Wellcome/index";
import Registros from "../../Components/Registro";
import styles from "./styles";


export default function Pedidos() {
  const { user } = useAuth();
  const { pedidos } = useCart();

  

  return (
    <View style={styles.container}>
       <AdditionalComponent/>
    <Registros/>
    </View>
  );
}
