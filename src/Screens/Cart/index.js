import React, { useState } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

export default function CartScreen() {
  const { user, handleLoading } = useAuth();
  const { cartItems, removeFromCart, clearCart, updateQuantity, sendOrder } = useCart(); // Obtém as funções e o estado do contexto
  const [orderStatus, setOrderStatus] = useState(null); // Estado para mensagem de sucesso
  const navigation = useNavigation();
  console.log(cartItems);

  // Calcula o total do carrinho utilizando o método reduce
  const total = cartItems
    .reduce((total, item) => total + parseFloat(item.preco) * (item.quantidade || 1), 0)
    .toFixed(2);

  // Calcula o total de cada item
  const totalItem = (item) => (parseFloat(item.preco) * (item.quantidade || 1)).toFixed(2);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imagem_url || 'https://via.placeholder.com/150' }} style={styles.img} resizeMode='contain' />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.nome}</Text>
        <Text style={styles.itemPrice}>R$ {item.preco}</Text>
        <View style={styles.line}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateQuantity(item.id, item.quantidade - 1)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantidade}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateQuantity(item.id, item.quantidade + 1)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
 
      <View style={styles.box}>
      <Text style={styles.itemQuantity}>{item.quantidade} {item.medida}</Text>
      <Text style={styles.textpricesecondary}>R$ {totalItem(item)}</Text> 
      </View>

    </View>
  );

  const handleSendOrder = async () => {
    const clienteId = user.id; // Exemplo: ID do cliente
    const enderecoEntrega = user.profile.endereco; // Exemplo: Endereço de entrega
    const telefone = user.profile.telefone;
    try {
      await sendOrder(clienteId, enderecoEntrega, telefone);

      setOrderStatus('Pedido enviado com sucesso!');
      setTimeout(() => {
        setOrderStatus(null); // Limpa a mensagem após 3 segundos
        handleLoading(false);
      }, 3000); // 3000 milissegundos = 3 segundos

    } catch (error) {
      setOrderStatus('Erro ao enviar o pedido. Tente novamente.');
    }

    // Limpar o carrinho após o envio
    clearCart();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Carrinho Vazio</Text>}
      />
<View> 
    <View style={styles.linetotal}>
       <Text style={styles.totalText}>Total: R$ {total}</Text>
    </View>
    <View style={styles.linebtn}>
        {cartItems && cartItems.length > 0 ? (
          <>

          
            <Pressable style={styles.btndelet} onPress={clearCart}>
              <Ionicons name="trash-outline" size={26} color={'#fff'} />
            </Pressable>
            <Pressable onPress={handleSendOrder} style={styles.btnsend}>
              <Text style={styles.btntxt}>Enviar Pedido</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.btnsend}>
              <Text style={styles.btntxt}>Colocar algo no carrinho</Text>
            </Pressable>
          </>
        )}
        {orderStatus && <Text style={styles.orderStatus}>{orderStatus}</Text>}
      </View>
      </View>
    </View>
  );
}
