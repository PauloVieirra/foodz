import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../Context/AuthContext";
import styles from "./styles";

export default function Notify() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
     
    </View>
  );
}
