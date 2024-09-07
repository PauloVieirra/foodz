import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigation();

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
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      } else {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session && session.user) {
          setIsLoggedIn(true);
          setUser(session.user);
          await saveUserLocally(session.user);
        } else {
          setUser(null); // Certifique-se de que o estado do usuário seja definido como null
        }
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error.message);
    }
  };

  // Função para buscar o perfil do usuário logado e atualizar o estado 'user'
  const fetchUserProfile = async () => {
    try {
      if (!user) {
        return null;
      }

      // Busca os dados do perfil do usuário a partir do user_id
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id);  // Compara o id do usuário logado com a coluna user_id

      if (error) {
        console.error('Erro ao buscar perfil do usuário:', error.message);
        return null;
      }

      const userProfile = data?.[0];  // Obtém o primeiro perfil (ou null se não houver)

      // Verifica novamente se o usuário ainda está logado antes de atualizar o estado
      if (userProfile && user) {
        setUser({ ...user, profile: userProfile });
      }

      return userProfile;
    } catch (err) {
      console.error('Erro inesperado ao buscar perfil do usuário:', err);
      return null;
    }
  };

  // Função de cadastro
  const signUp = async (email, password) => {
    try {
      setLoading(true);

      // Cria o usuário no Supabase Auth
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        sendEmailVerification: false
      });

      if (error) throw new Error(error.message);

      // Adiciona o usuário à tabela 'user_profiles' com o ID corretoadm
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
      setLoading(false);
    }
  };

  // Função de login
  const login = async (email, password) => {
    try {
      setLoading(true); // Ativa o loading ao iniciar o login

      // Limpa o AsyncStorage antes de salvar os novos dados do usuário
      await AsyncStorage.clear(); // Remove todos os dados armazenados localmente

      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw new Error(error.message);

      setUser(user);
      setIsLoggedIn(true);
      await saveUserLocally(user); // Salva o usuário localmente após o login
      return { user };
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      throw error;
    } finally {
      setLoading(false); // Desativa o loading após o login
    }
  };

  // Função de logout atualizada
  const logout = async () => {
    try {
      // Tenta deslogar o usuário no Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }

      // Limpa o estado local do usuário
      setUser(null); // Define user como null
      setUserType(null); // Define userType como null
      setIsLoggedIn(false);
      // Remove todos os dados armazenados localmente
      await AsyncStorage.clear(); // Limpa o AsyncStorage

      console.log('Usuário deslogado com sucesso');
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

 // Função para buscar itens da tabela 'produtos'
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

  // Inscrição em eventos realtime na tabela 'produtos'
  const produtoListener = supabase
    .channel('public:produtos')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'produtos' }, (payload) => {
    
      fetchProdutos(); // Atualiza os produtos quando houver uma mudança
    })
    .subscribe();

  // Limpeza ao desmontar o componente
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
      produtos,
      isLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  );
};
