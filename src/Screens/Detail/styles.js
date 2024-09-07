import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      padding: 20,
    },
    contimg: {
      flex: 1,
      backgroundColor: "#fff",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      overflow: "hidden", // Garante que a imagem respeite o border radius da View
      justifyContent: "center",
      alignItems: "center",
    },
     body:{
      flex:1
     },
    image: {
      flex:1,
      width: 300,
      height: 200,
      marginBottom: 20,
    },
    itemName: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    itemPrice: {
      fontSize: 30,
      fontWeight:'600'
    },
    itemDescription: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
    },
    line:{
      width:'100%',
      flexDirection:'row',
    },
    linecount:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    btncount:{
      width:'auto',
      height:48,
      flexDirection:'row',
      alignItems:'center',
    },
    btntext:{
      fontSize:16,
      width:38,
      height:48,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#fff'
    },
    btncontint:{
       width:50,
       height:48,
       alignItems:'center',
       justifyContent:'center',
       
    },
    textbtnc:{
      fontSize:20
    },
    textb:{
      fontSize:28
    },
    textbtndetail:{
      color:'#fff',
          fontSize:18,
          fontWeight:'bold'
  },
    textbm:{
      fontSize:28,
      marginBottom:16
    },
    contnav:{
      width:'100%',
      height:'auto',
      marginBottom:20,
      flexDirection:'row',
      justifyContent:'space-between',
  },
  btnaddtocart:{
    width:'100%',
    height:52,
    backgroundColor:'#53B175',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100
  }
  });



  export default styles;