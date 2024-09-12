import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../../Context/AuthContext'; // Ajuste o caminho conforme sua estrutura de diretórios
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Signin() {
  const { login, fetchUserProfile, handleLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLog = async () => {
    setError(""); // Limpar erros anteriores
    handleLoading(true); // Ativa o loading imediatamente ao clicar no botão de login

    try {
      const { user } = await login(email, password);

      // Após o login, buscar o perfil do usuário
      const profile = await fetchUserProfile();

    } catch (err) {
      setError(err.message);
      Alert.alert("Erro", err.message); // Exibir erro se houver
    } finally {
      handleLoading(false); // Desativa o loading após o login
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Password" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign In" onPress={handleLog} />
    </View>
  );
}
