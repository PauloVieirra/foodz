import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

// Dados de exemplo
const DATA = [
    { id: '1', title: 'Item 1', image: require('../../../assets/item1.jpg') },
    { id: '2', title: 'Item 2', image: require('../../../assets/item1.jpg') },
    { id: '3', title: 'Item 3', image: require('../../../assets/item1.jpg') },
    { id: '4', title: 'Item 4', image: require('../../../assets/item1.jpg') },
];

const { width } = Dimensions.get('window'); // Largura da tela

const HorizontalSlider = () => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={item.image} style={styles.image} />
        </View>
    );

    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false} // Ocultar o indicador de rolagem horizontal
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        height:100,
        paddingVertical: 10,
    },
    item: {
        marginHorizontal: 4,
        alignItems: 'center',
    },
    image: {
        width: width * 0.4, // Ajuste o tamanho conforme necessário
        height: 80,
        borderRadius: 10,
        
    },
    title: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HorizontalSlider;
