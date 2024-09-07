import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../Context/AuthContext";

export default function ProfileAdm(){
    const { logout } = useAuth();

   const  handlesair = () => {
    logout();
   } 
    return (
     <View>
        <Text>
                ProfileAdm
                <TouchableOpacity  onPress={handlesair}><Text>Sair </Text></TouchableOpacity>
    
        </Text>
     </View>
    );
}