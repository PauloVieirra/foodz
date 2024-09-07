import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../Context/AuthContext";

export default function Pedidos(){

    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
     }
     
    return (
     <View>
        <Text>
        Recibos
        </Text>
        <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
     </View>
    );
}