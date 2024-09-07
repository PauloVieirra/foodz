import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../../Context/AuthContext'; // Ajuste o caminho conforme sua estrutura de diretórios
import styles from './styles';

export default function Signin() {
  const { login, handleLoading, fetchUserProfile, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
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
      handleLoading(false); // Desativa o loading após definir a rota ou capturar um erro
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        title="Login"
        onPress={handleLogin}
      />
      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate('Signup')}
      />
      <Button
        title="Termos"
        onPress={() => navigation.navigate('TermsAndPrivacyScreen')}
      />
    </View>
  );
}
