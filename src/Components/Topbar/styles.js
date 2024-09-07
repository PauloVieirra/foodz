import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    safeArea:{
        width:'100%',
        height:52,
        backgroundColor:"#fff",
        marginTop:48,
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
        alignItems:'center'
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
      }
})

export default styles;