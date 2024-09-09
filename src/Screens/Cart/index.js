import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';

export default function CartScreen() {
  const {user} = useAuth();
  const { cartItems, removeFromCart, clearCart, updateQuantity, sendOrder } = useCart(); // Obtém as funções e o estado do contexto
  const [orderStatus, setOrderStatus] = useState(null); // Estado para mensagem de sucesso

  // Calcula o total utilizando o método reduce
  const total = cartItems
    .reduce((total, item) => total + parseFloat(item.preco) * (item.quantidade || 1), 0)
    .toFixed(2);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.nome}</Text>
      <Text style={styles.itemPrice}>R$ {item.preco}</Text>
      <Text style={styles.itemQuantity}>{item.quantidade} {item.medida}</Text>

      {/* Botões para alterar quantidade */}
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

      <Button title="Remover" onPress={() => removeFromCart(item.id)} />
    </View>
  );

  const handleSendOrder = async () => {
    // Substitua os valores abaixo pelos valores reais conforme a implementação
    const clienteId = user.id; // Exemplo: ID do cliente
    console.log(clienteId);
    const enderecoEntrega = 'Rua Exemplo, 123'; // Exemplo: Endereço de entrega

    try {
      await sendOrder(clienteId, enderecoEntrega);
      setOrderStatus('Pedido enviado com sucesso!');
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
      <Text style={styles.totalText}>Total: R$ {total}</Text>
      <Button title="Limpar Carrinho" onPress={clearCart} />
      <Button title="Confirmar Pedido" onPress={handleSendOrder} />
      {orderStatus && <Text style={styles.orderStatus}>{orderStatus}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  itemContainer: { padding: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  itemName: { fontSize: 18 },
  itemPrice: { fontSize: 16, color: 'green' },
  itemQuantity: { fontSize: 16, marginVertical: 8 },
  totalText: { fontSize: 20, fontWeight: 'bold', marginVertical: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  button: { backgroundColor: '#ddd', padding: 8, marginHorizontal: 5, borderRadius: 4 },
  buttonText: { fontSize: 20, fontWeight: 'bold' },
  quantityText: { fontSize: 16, paddingHorizontal: 8 },
  orderStatus: { marginTop: 16, fontSize: 16, fontWeight: 'bold', color: 'green' }
});
