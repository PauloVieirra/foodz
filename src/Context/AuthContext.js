import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../Services/supabaseClient';
import LoadingIndicator from '../Components/Loading';

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
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const navigation = useNavigation();

  // Função para salvar o usuário localmente usando AsyncStorage
  const saveUserLocally = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
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
        setIsLoggedIn(true);
      } else {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session?.user) {
          setUser(session.user);
          await saveUserLocally(session.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error.message);
    }
  };

  // Função para buscar o perfil do usuário logado e atualizar o estado 'user'
  const fetchUserProfile = async () => {
    try {
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao buscar perfil do usuário:', error.message);
        return null;
      }

      const userProfile = data?.[0];
      setUser((prevUser) => ({ ...prevUser, profile: userProfile }));
      setUserType(userProfile?.userType || null);
      return userProfile;
    } catch (err) {
      console.error('Erro inesperado ao buscar perfil do usuário:', err);
      return null;
    }
  };

  // Função de cadastro
  const signUp = async (email, password) => {
    try {
      handleLoading(true, 'Criando sua conta...'); // Ativa o loading ao iniciar o cadastro

      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        sendEmailVerification: false
      });

      if (error) throw new Error(error.message);

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .insert([{ user_id: user.id, email }]);

      if (profileError) throw new Error(profileError.message);

      await saveUserLocally(user);
      return { user };
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error.message);
      throw error;
    } finally {
      handleLoading(false); // Desativa o loading após o cadastro
    }
  };

  // Função de login
  const login = async (email, password) => {
    try {
      handleLoading(true, 'Entrando...'); // Ativa o loading ao iniciar o login

      await AsyncStorage.clear();

      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw new Error(error.message);

      setUser(user);
      setIsLoggedIn(true);
      await saveUserLocally(user);
      return { user };
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      throw error;
    } finally {
      handleLoading(false); // Desativa o loading após o login
    }
  };

  // Função de logout atualizada
  const logout = async () => {
    try {
      handleLoading(true, 'Saindo...'); // Mensagem de carregamento específica para o logout
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      setUser(null);
      setUserType(null);
      setIsLoggedIn(false);
      await AsyncStorage.clear();
      console.log('Usuário deslogado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
      throw error;
    } finally {
      handleLoading(false); // Desativa o loading após o logout
    }
  };

  //função handleLoading para incluir uma mensagem
const handleLoading = (loading, message = '') => {
  setLoading(loading);
  setLoadingMessage(message);
};

  const handleLoadingCart = (loading) => {
    setLoadingCar(loading);
  };

  useEffect(() => {
    fetchUser(); // Busca o usuário quando o provedor é montado
  }, []);

  const fetchProdutos = async () => {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*');

      if (error) {
        console.error('Erro ao buscar produtos:', error.message);
        return;
      }

      setProdutos(data);
    } catch (err) {
      console.error('Erro inesperado ao buscar produtos:', err);
    }
  };

  useEffect(() => {
    fetchProdutos(); // Busca inicial dos produtos

    const produtoListener = supabase
      .channel('public:produtos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'produtos' }, (payload) => {
        fetchProdutos(); // Atualiza os produtos quando houver uma mudança
      })
      .subscribe();

    return () => {
      supabase.removeChannel(produtoListener);
    };
  }, []);

  
return (
  <AuthContext.Provider value={{ 
    login, 
    logout, 
    signUp, 
    fetchUser, 
    fetchUserProfile,
    handleLoading,
    fetchProdutos,
    user, 
    userType, 
    isLoading,
    loadingMessage, // Inclua a mensagem de carregamento aqui
    produtos,
    isLoggedIn
  }}>
    {isLoading ? <LoadingIndicator message={loadingMessage} /> : children}
  </AuthContext.Provider>
);
};
