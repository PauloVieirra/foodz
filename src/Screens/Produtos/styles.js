import { StyleSheet } from "react-native";


const styles = StyleSheet.create({


    contstep:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        padding:4
    },
    contitem:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    contnav:{
        width:'100%',
        height:'auto',
        marginBottom:20,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10
    },
    prymarybtn:{
        width:'auto',
        minWidth:100,
        height:48,
        paddingHorizontal:16,
        backgroundColor:"#53B175",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,shadowColor: '#000', // Cor da sombra
        shadowOpacity: 0.15, // Opacidade da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 2, // Propriedade específica para Android
      },
      prymago:{
        width:'auto',
        minWidth:100,
        height:48,
        paddingHorizontal:16,
        backgroundColor:"#EF8B44",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,shadowColor: '#000', // Cor da sombra
        shadowOpacity: 0.15, // Opacidade da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 2, // Propriedade específica para Android
      },
    input:{
        width:"90%",
        height:48,
        backgroundColor:'#F5F5F5',
        margin:8,
        paddingHorizontal:8,
        borderRadius:8
    },
    inputmedium:{
        width:"43%",
        height:48,
        backgroundColor:'#F5F5F5',
        margin:8,
        paddingHorizontal:8,
        borderRadius:8
    },
    inputpicker: {
        width: "43%",
        height: 48,
        backgroundColor: '#F5F5F5',
        margin: 8,
        paddingHorizontal: 8,
        borderRadius: 8, // Define o raio da borda
    },
    inputtextcurto:{
        width:"100%",
        height:'40%',
        backgroundColor:'#F5F5F5',
        paddingHorizontal:8,
        borderRadius:8
    },
    
    inputtextlongo:{
        width:"100%",
        height:'60%',
        backgroundColor:'#F5F5F5',
        paddingHorizontal:8,
        borderRadius:8
    },
    contitemdescriptsup:{
        flex:1,
        width:'100%',
        height:'50%',
        paddingHorizontal:16,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
    },
    contitemdescript:{
        flex:1,
        width:'100%',
        height:'50%',
        paddingHorizontal:16,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'flex-start',
    },
    line:{
        width:'100%',
        flexDirection:'row',
    },
    linequant:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    contimage:{
         width:'100%',
         height:'100%',
         alignItems:'center',
         justifyContent:'center'
    },
    image:{ 
          width:'100%',
          height:'100%',
          maxWidth:300,
          maxHeight:300,
    },
    title:{
         fontSize:20
    },
    text:{
          fontSize:18
    },
    textbtn:{
        color:'#fff',
            fontSize:14,
            fontWeight:'bold'
    },
    textbtnsec:{
        color:'#131313',
            fontSize:14,
            fontWeight:'bold'
    },
    preco:{
            fontSize:30,
            fontWeight:'bold'
            
    },
    medida:{
            fontSize:16,
            marginLeft:4
    },
    icon:{
     fontSize:200
    },
        secundarybtn: {
          width: 'auto',
          height: 48,
          paddingHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#fff',
          borderRadius: 30,
          borderWidth: 1,
          borderColor: '#70B9BE',
          borderStyle: 'solid',
          shadowColor: '#000', // Cor da sombra
          shadowOpacity: 0.2, // Opacidade da sombra
          shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
          shadowRadius: 3.84, // Raio de desfoque da sombra
          elevation: 2, // Propriedade específica para Android
        },
        conttextimg:{
            width:'100%',
            height:150,
            alignItems:'flex-start',
            justifyContent:'center',
        },
        textimg:{
            fontSize:28,
            fontWeight:'bold',
            color:'#131313'
        }


})

export default styles;