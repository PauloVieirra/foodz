import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useCart } from '../../Context/CartContext';
import styles from './styles';

export default function DetailsScreen({ route }) {
  const { addToCart } = useCart();
  const [count, setCount] = useState(1);
  const { produto } = route.params; // Recebe o produto passado pela navegação

  return (
    <View style={styles.container}>
      <View style={styles.contimg}>
        <Image source={{ uri: produto.imagem_url }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.body}>
        <Text style={styles.itemName}>{produto.nome}</Text>
        <View style={styles.linecount}>
          <View style={styles.btncount}>
            <TouchableOpacity style={styles.btncontint} onPress={() => setCount(count > 1 ? count - 1 : 1)}>
              <Text style={styles.textbm}>-</Text>
            </TouchableOpacity>
            <TouchableHighlight style={styles.btntext}>
              <Text style={styles.textbtnc}>{count}</Text>
            </TouchableHighlight>
            <TouchableOpacity style={styles.btncontint} onPress={() => setCount(count + 1)}>
              <Text style={styles.textb}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>R$ {produto.preco}</Text>
        </View>
        <Text style={styles.itemDescription}>{produto.longa_descricao}</Text>
      </View>
      <View style={styles.contnav}>
        <TouchableOpacity style={styles.btnaddtocart} onPress={() => addToCart({ ...produto, quantidade: count })}>
          <Text style={styles.textbtndetail}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
