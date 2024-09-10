import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    safeArea:{
        width:'100%',
        height:52,
        backgroundColor:"#fff",
        marginTop:0,
        paddingLeft:16,
        paddingRight:16,
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:52,
        backgroundColor:"#fff"
    },
 
    contimage: {
        width: 38,
        height: 38,
         justifyContent:'center',
        alignItems:'center',
      },
    image: {
        width: 38,
        height: 38,
        borderRadius:38,
        resizeMode: 'cover', // Ajusta a imagem ao contêiner
      },
      contmenu: {
        width: 76,
        height: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      },
      circle:{
        width:24,
        height:24,
      },
      badge: {
        width: 22,
        height: 22,
        borderRadius: 11, // Ajusta o borderRadius para metade da largura e altura
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 12,
        right: 10,
        backgroundColor: '#68D38F'
      },
      badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: 20, // Ajusta o lineHeight para centralizar verticalmente o texto
        marginLeft:2
      },
      titlescreen:{
        fontSize:20,
        fontWeight:'600'
      },
      backButton:{
        width:'auto',
        height:'100%',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        justifyContent:'center',
      },
      badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red', // Cor de fundo do badge
      },
      badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
      },
})

export default styles;