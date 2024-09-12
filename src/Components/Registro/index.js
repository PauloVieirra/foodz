import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, Pressable } from "react-native";
import { useCart } from "../../Context/CartContext";
import StatusTag from "../Diversos";
import styles from "./styles";

export default function Registros() {
  const { pedidos } = useCart();
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedPedido(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ padding: 6 }}>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <Pressable key={pedido.id} style={styles.card} onPress={() => handleOpenModal(pedido)}>
              <View style={styles.line}>
                <Text style={styles.textcod}>Código: {pedido.id}</Text>
                <StatusTag status= {pedido.status}> <Text> {pedido.status}</Text> </StatusTag>
              </View>
              <View styles={styles.space}></View>
              <View style={styles.line}>
              <Text style={styles.textcard}>R$ {pedido.valor_total.toFixed(2)}</Text>
              <Text style={styles.textdata}>{new Date(pedido.data_pedido).toLocaleDateString()}</Text>
              </View>

            </Pressable>
          ))
        ) : (
          <Text>Nenhum pedido encontrado</Text>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Itens do Pedido</Text>
            <ScrollView>
              {selectedPedido?.itens_pedido?.length > 0 ? (
                selectedPedido.itens_pedido.map((item) => (
                  <View key={item.id} style={styles.itemContainer}>
                    {item.image_url ? (
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.itemImage}
                        resizeMode='contain'
                      />
                    ) : (
                      <Text>Imagem não disponível</Text>
                    )}
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.produtos?.nome}</Text>
                      <Text style={styles.textprice}>R$ {item.preco_unitario.toFixed(2)}</Text>
                      <View style={styles.line}> 
                      <Text>Quantidade: {item.quantidade}</Text>
                      {selectedPedido.status === "preparando" && (
                          <Text>Preparando</Text>
                        )}
                        {selectedPedido.status === "cancelado" && (
                          <Text>Cancelado</Text>
                        )}
                      </View>
                      
                    </View>
                  </View>
                ))
              ) : (
                <Text>Nenhum item encontrado para este pedido.</Text>
              )}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
