import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function ProdutosScreen() {
  const { fetchProdutos, produtos } = useAuth(); // Obtém a função de busca e os produtos do contexto
  const { addToCart } = useCart(); // Obtém o carrinho e a
  const [searchText, setSearchText] = useState(''); // Estado para o texto de busca
  const [filteredProdutos, setFilteredProdutos] = useState([]); // Estado para os produtos filtrados

  const navigation = useNavigation();

  // Chama a função de busca quando o componente for montado
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Atualiza a lista de produtos filtrados quando o texto de busca muda
  useEffect(() => {
    if (searchText.length >= 4) {
      const filtered = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProdutos(filtered);
    } else {
      setFilteredProdutos(produtos);
    }
  }, [searchText, produtos]);

  // Renderiza cada produto na lista
  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.itemContainer} onPress={() => navigation.navigate('Detalhes', { produto: item })}>
    
    
        <View style={styles.contimg}>
          <Image source={{ uri: item.imagem_url }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.contdescricao}>
          <Text style={styles.itemName}>{item.nome}</Text>
          <View style={styles.line}>
            <Text style={styles.itemPrice}>R$ {item.preco}</Text>
            <Text style={styles.itemMedia}>{item.quant}{item.medida}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnplus} onPress={() => addToCart({ ...item, quantidade: 1 })}>
          <Text style={styles.textbtn}>+</Text>
        </TouchableOpacity>
    
      </Pressable>
    );
  };

  // Verifica se os produtos estão sendo carregados
  if (!produtos) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.linebarr}>
          <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar por nome..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      </View>
    

      
      <FlatList
        data={filteredProdutos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No products available.</Text>}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}
