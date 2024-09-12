import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    itemContainer: {
        padding: 8,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection:'row'
    },
    itemName: {
        fontSize: 18
    },
    itemPrice: {
        fontSize: 16,
        color: 'green'
    },
    itemQuantity: {
        fontSize: 16,
        marginVertical: 8
    },
    totalText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 16,
        color:'#69696A'
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        width:38,
        height:38,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 5,
        borderRadius: 4,
        borderWidth:1,
        borderColor:'#757373',
        borderStyle:'solid',
        borderRadius:100
        
    },
    buttonText: {
        fontSize: 26,
        fontWeight: '300',
        color:'#4E4E4E'
    },
    quantityText: {
        fontSize: 16,
        paddingHorizontal: 8
    },
    orderStatus: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
    },
    img:{
        width: 100,
        height: 100,
    },
    itemInfo:{
        flex:1,

    },
    line:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    btndelet:{
        width:44,
        height:44,
        backgroundColor:'#DF4620',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:22,
        marginRight:20
    },
    linebtn:{
        flex:1,
        height:52,
        maxHeight:52,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20
    },
    btnsend:{
        flex:1,
        height:52,
        backgroundColor:"#22A65B",
        alignItems:'center',
        justifyContent:'center',
        borderRadius:22
    },
    btntxt:{
        fontSize:18,
        color:'#fff'
    },
    box:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center',
        gap:10
    },
    textpricesecondary:{
        fontSize:16, 
        fontWeight:'bold',
        color:'#69696A'
    },
    linetotal:{
        height:80,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-end',
        backgroundColorL:'#69696A'
    }


});

export default styles;