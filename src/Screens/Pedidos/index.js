import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from "react-native";
import { useCart } from "../../Context/CartContext";

export default function PedidosAdm() {
  const { fetchOrders, updateOrderStatus } = useCart();
  const [pedidos, setPedidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const pedidos = await fetchOrders(); // Busca todos os pedidos
      setPedidos(pedidos);
    };

    loadOrders();
  }, []);

  const handlePressPedido = (pedido) => {
    setPedidoSelecionado(pedido); // Define o pedido selecionado
    setModalVisible(true); // Abre o modal
  };

  const handleStatusChange = async (newStatus) => {
    try {
      if (pedidoSelecionado) {
        await updateOrderStatus(pedidoSelecionado.id, newStatus); // Atualizar o status do pedido
        setPedidoSelecionado({ ...pedidoSelecionado, status: newStatus }); // Atualiza o status localmente
      }
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemInfo}>{item.quantidade} x {item.produtos.nome} (R$ {item.preco_unitario.toFixed(2)} cada)</Text>
    </View>
  );

  const renderPedido = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressPedido(item)}>
      <View style={styles.pedidoContainer}>
        <Text style={styles.clienteNome}>Cliente: {item.user_profiles.nome}</Text>
        <Text style={styles.pedidoInfo}>Pedido ID: {item.id}</Text>
        <Text style={styles.pedidoInfo}>Data: {new Date(item.data_pedido).toLocaleDateString()}</Text>
        <Text style={styles.pedidoInfo}>Total: R$ {item.valor_total.toFixed(2)}</Text>
        <Text style={styles.pedidoInfo}>Status: {item.status}</Text>
        <Text style={styles.pedidoInfo}>Endereço: {item.endereco_entrega}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPedido}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum pedido encontrado</Text>}
      />

      {/* Modal de Detalhes do Pedido */}
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
              <Text>Status Atual: {pedidoSelecionado.status}</Text>

              {/* Exibir Itens do Pedido */}
              {pedidoSelecionado.itens_pedido && (
                <FlatList
                  data={pedidoSelecionado.itens_pedido}
                  keyExtractor={(item) => item.produto_id.toString()}
                  renderItem={renderItem}
                />
              )}

              {/* Botões para atualizar o status */}
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  pedidoContainer: { padding: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 },
  clienteNome: { fontWeight: 'bold' },
  pedidoInfo: { marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 20 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  itemContainer: { paddingVertical: 5 },
  itemInfo: { fontSize: 16 },
});
