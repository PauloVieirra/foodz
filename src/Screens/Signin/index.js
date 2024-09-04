// screens/Signin.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Context/AuthContext'; // Ajuste o caminho conforme sua estrutura de diretórios
import styles from './styles';

export default function Signin() {
  const navigation = useNavigation();
  const { login, handleLoading  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Limpar erros anteriores
    try {
      await login(email, password);
       handleLoading();
        navigation.navigate('Home'); // Navegar para a tela inicial ou outra tela após login
        setTimeout(() => {
        handleLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      Alert.alert("Erro", err.message); // Exibir erro se houver
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

