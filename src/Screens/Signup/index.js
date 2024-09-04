// screens/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Context/AuthContext'; // Ajuste o caminho conforme sua estrutura de diretórios
import styles from './styles';

export default function Signup() {
  const navigation = useNavigation();
  const { signUp, login, handleLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError(""); // Limpar erros anteriores
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    try {
      // Supondo que signUp retorne o usuário e uma confirmação de e-mail (se aplicável)
      const { user, error } = await signUp(email, password);
      if (error) {
        throw new Error(error.message);
      }
      // Fazer login automático após o cadastro bem-sucedido
      const { session, error: loginError } = await login(email, password);
      if (loginError) {
        throw new Error(loginError.message);
      }
      handleLoading();
      // Navegar para a página inicial após o login bem-sucedido
      navigation.navigate('Home');
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
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        textContentType="password"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        title="Register"
        onPress={handleSignup}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}


