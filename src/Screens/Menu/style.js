import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
     flex:1,
     height:'100%',
     backgroundColor:"#000"
    },
    containerimg:{
        width:200,
        height:200,
        backgroundColor:"#000"
    },
    btnsair:{
        width:'94%',
        maxWidth:380,
        height:42,
        backgroundColor:'#FF0000',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center'
    },
    scrollContent: {
        paddingVertical: 20, // Espaçamento vertical dentro do ScrollView
        flexDirection:'column'
      },
      textbtnsair:{
        color:"#fff",
        fontSize:18,
        fontWeight:'600'
      },
      line:{
        flex:1,
        width:'100%',
        height:42,
        backgroundColor:'#dedede',
      }

})

export default styles;