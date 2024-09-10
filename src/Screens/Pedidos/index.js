import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Button, useWindowDimensions, SafeAreaView } from "react-native";
import { useCart } from "../../Context/CartContext";
import styles from './styles'; // Importa o arquivo de estilos

export default function PedidosAdm() {
  const { fetchOrders, updateOrderStatus } = useCart();
  const [pedidos, setPedidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const loadOrders = async () => {
      const pedidos = await fetchOrders(); 
      setPedidos(pedidos);
    };

    loadOrders();
  }, []);

  const maxColumns = 6; 
  const cardMinWidth = 180;
  const numColumns = width < 600 ? 1 : Math.min(maxColumns, Math.floor(width / cardMinWidth));
  const cardWidth = width / numColumns;

  const handlePressPedido = (pedido) => {
    setPedidoSelecionado(pedido);
    setModalVisible(true);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      if (pedidoSelecionado) {
        await updateOrderStatus(pedidoSelecionado.id, newStatus); 
        setPedidoSelecionado({ ...pedidoSelecionado, status: newStatus }); 
      }
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  return (
    <SafeAreaView style={styles.conteinerg}>
      <View style={styles.container}> 
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <View style={[styles.gridContainer, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {pedidos.length > 0 ? (
            pedidos.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handlePressPedido(item)} style={{ width: cardWidth, padding: 5 }}>
                <View style={styles.pedidoContainer}>
                  <Text style={styles.clienteNome}>Cliente: {item.user_profiles.nome}</Text>
                  <Text style={styles.pedidoInfo}>Pedido ID: {item.id}</Text>
                  <Text style={styles.pedidoInfo}>Data: {new Date(item.data_pedido).toLocaleDateString()}</Text>
                  <Text style={styles.pedidoInfo}>Total: R$ {item.valor_total.toFixed(2)}</Text>
                  <Text style={styles.pedidoInfo}>Status: {item.status}</Text>
                  <Text style={styles.pedidoInfo}>Endereço: {item.endereco_entrega}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
          )}
        </View>
      </ScrollView>

      {pedidoSelecionado && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalhes do Pedido</Text>
              <Text>Pedido ID: {pedidoSelecionado.id}</Text>
              <Text>Cliente: {pedidoSelecionado.user_profiles.nome}</Text>
              <Text>Data: {new Date(pedidoSelecionado.data_pedido).toLocaleDateString()}</Text>
              <Text>Total: R$ {pedidoSelecionado.valor_total.toFixed(2)}</Text>
              <Text>Endereço: {pedidoSelecionado.endereco_entrega}</Text>
              <Text>Telefone: {pedidoSelecionado.telefone}</Text>
              <Text>Status Atual: {pedidoSelecionado.status}</Text>

              {pedidoSelecionado.itens_pedido && (
                <ScrollView>
                  {pedidoSelecionado.itens_pedido.map((item) => (
                    <View key={item.produto_id} style={styles.itemContainer}>
                      <Text style={styles.itemInfo}>{item.quantidade} x {item.produtos.nome} (R$ {item.preco_unitario.toFixed(2)} cada)</Text>
                    </View>
                  ))}
                </ScrollView>
              )}

              <Button title="Aceitar Pedido" onPress={() => handleStatusChange("aceito")} />
              <Button title="Cancelar Pedido" onPress={() => handleStatusChange("cancelado")} />
              <Button title="Saiu para Entrega" onPress={() => handleStatusChange("entrega")} />
              <Button title="Finalizar Pedido" onPress={() => handleStatusChange("finalizado")} />
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
      </View>
    </SafeAreaView>
  );
}
