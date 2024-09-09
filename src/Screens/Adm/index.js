import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { useAuth } from "../../Context/AuthContext";

export default function AdminPage(){
    const {user} = useAuth();
    return (
        <View style={styles.container}>
            <Text>
                Adm
                
            </Text>
        </View>
    )
}