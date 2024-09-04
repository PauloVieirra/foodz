import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../Services/supabaseClient';

// Criando o contexto de autenticação
const AuthContext = createContext();

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor de contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // Função para salvar o usuário localmente usando AsyncStorage
  const saveUserLocally = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('Usuário salvo com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar o usuário localmente:', error.message);
    }
  };

  // Função para buscar o usuário localmente ou na sessão do Supabase
  const fetchUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session && session.user) {
          setUser(session.user);
          await saveUserLocally(session.user);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error.message);
    }
  };

  // Função de cadastro
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        sendEmailVerification: false
      });

      if (error) throw new Error(error.message);

      await saveUserLocally(user);
      return { user };
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função de login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw new Error(error.message);

      setUser(user);
      await saveUserLocally(user); // Salvar o usuário após o login
      return { user };
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      setUser(null);
      await AsyncStorage.removeItem('user'); // Remover o usuário localmente
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
      throw error;
    }
  };

  // Função para lidar com o estado de loading
  const handleLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  useEffect(() => {
    fetchUser(); // Busca o usuário quando o provedor é montado
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, signUp, fetchUser, user, userType, handleLoading, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
