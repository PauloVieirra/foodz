import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal:8,
    },
    itemContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      width: '45%',
      height: 240,
      shadowColor: '#000', // Cor da sombra
      shadowOpacity: 0.09, // Aumentar a opacidade para tornar a sombra mais visível
      shadowOffset: { width: 4, height: 4 }, // Menor deslocamento para espalhar mais uniformemente
      shadowRadius: 20, // Aumentar o raio para um desfoque maior
      elevation: 8, // Aumentar a elevação para melhorar o efeito no Android
      marginVertical: 16,
      marginHorizontal:8,
    },
    
    contimg:{
     flex:1,
     height:'100%',
     backgroundColor:"#fff",
     borderTopLeftRadius:8,
     borderTopRightRadius:8,
     paddingHorizontal:8,
     paddingVertical:2
    },
    contdescricao:{
     alignItems:'flex-start',
     height:'30%',
     paddingHorizontal:8,
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itemPrice: {
      fontSize: 20,
      marginTop: 5,
      textAlign: 'center',
      fontWeight:'600'
    },
    itemMedia: {
        height:'100%',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical:'bottom',
        fontWeight:'600',
        color:'#131313',
        opacity:0.5

      },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 18,
      color: '#999',
    },
    columnWrapper: {
      justifyContent: 'space-between', // Garante espaçamento uniforme entre as colunas
    },
    image: {
      width: '100%',
      height: '100%', // Adicionei a altura da imagem
      borderTopLeftRadius:8,
      borderTopRightRadius:8
    },
    line:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        gap:6
    },
    linebarr:{
      width:'100%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:10,
      marginVertical:16
  },
    searchBar:{
       width:'100%',
       height:52,
       borderRadius:8,
       backgroundColor:'#EFEFEF',
       paddingHorizontal:10,

    }
  });

  export default styles;