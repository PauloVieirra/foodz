import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../Services/supabaseClient'; 
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Obtendo o usuário autenticado do contexto

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cartItems');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart items:', error);
      }
    };

    saveCartItems();
  }, [cartItems]);

  const addToCart = (produto) => {
    const existingItem = cartItems.find((item) => item.id === produto.id);

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + produto.quantidade }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...produto, quantidade: produto.quantidade }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantidade) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: quantidade }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart items:', error);
    }
  };

  // Função para enviar o pedido para o Supabase
  const sendOrder = async (clienteId, enderecoEntrega) => {
    try {
      if (!clienteId) {
        throw new Error('Cliente não especificado.');
      }

      // Calcula o valor total do pedido
      const valorTotal = cartItems.reduce((total, item) => total + item.quantidade * item.preco, 0);

      // Insere o pedido na tabela `pedidos`
      const { data: pedido, error: pedidoError } = await supabase
        .from('pedidos')
        .insert([
          {
            cliente_id: clienteId, // Usa o ID do cliente fornecido
            data_pedido: new Date().toISOString(),
            valor_total: valorTotal,
            status: 'pendente',
            endereco_entrega: enderecoEntrega,
          },
        ])
        .select()
        .single();

      if (pedidoError) {
        throw new Error('Erro ao enviar o pedido principal: ' + pedidoError.message);
      }

      // Insere cada item do pedido na tabela `itens_pedido`
      for (const item of cartItems) {
        const { error: itemError } = await supabase
          .from('itens_pedido')
          .insert([
            {
              pedido_id: pedido.id,
              produto_id: item.id,
              quantidade: item.quantidade,
              preco_unitario: item.preco,
              subtotal: item.quantidade * item.preco,
            },
          ]);

        if (itemError) {
          throw new Error('Erro ao enviar o item do pedido: ' + itemError.message);
        }
      }

      // Limpa o carrinho após o envio
      await clearCart();
    } catch (error) {
      console.error('Erro ao enviar o pedido:', error);
    }
  };

  // Função para buscar pedidos com detalhes dos itens e nomes dos produtos
  const fetchOrders = async () => {
    try {
      // Busca pedidos e inclui detalhes dos itens e produtos
      const { data: pedidos, error } = await supabase
        .from('pedidos')
        .select(`
          *,
          user_profiles (nome),
          itens_pedido (
            *,
            produtos (nome)
          )
        `);

      if (error) {
        throw new Error('Erro ao buscar pedidos: ' + error.message);
      }

      return pedidos; // Retorna os pedidos com detalhes dos itens e produtos
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      return [];
    }
  };

  // Função para buscar itens do pedido
  const fetchOrderItems = async (pedidoId) => {
    try {
      const { data: itens, error } = await supabase
        .from('itens_pedido')
        .select('*')
        .eq('pedido_id', pedidoId);

      if (error) {
        throw new Error('Erro ao buscar itens do pedido: ' + error.message);
      }

      console.log('Itens do pedido obtidos com sucesso:', itens);
      return itens || [];
    } catch (error) {
      console.error('Erro ao buscar itens do pedido:', error);
      return [];
    }
  };

  // Função para atualizar o status do pedido
  const updateOrderStatus = async (pedidoId, newStatus) => {
    try {
      const { error } = await supabase
        .from('pedidos')
        .update({ status: newStatus })
        .eq('id', pedidoId);

      if (error) {
        throw new Error('Erro ao atualizar o status do pedido: ' + error.message);
      }

      console.log('Status do pedido atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar o status do pedido:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        sendOrder,
        pedidos,
        fetchOrders,
        fetchOrderItems,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
