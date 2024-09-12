import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding:10
  },
  card: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    backgroundColor: '#fff',

    // Configurações de sombra para iOS
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Offset da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 3.84, // Raio da sombra

    // Configurações de sombra para Android
    elevation: 5, // Nível de elevação para Android
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    width: "100%",
    height:'100%',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20 ,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    backgroundColor:"#fff",
    borderBottomWidth:1,
    borderBottomColor:'#C9C7C7',
    paddingHorizontal:6,
    paddingVertical:16
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    color:'#505151',
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  line:{
    width:'100%',
    height:'auto',
    flexDirection:'row',
    justifyContent:"space-between"
  },
  tag: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textcod:{
    fontSize:18,
    fontWeight:'bold',
    color:"#5B5B5B"
  },
  textcard:{
    fontSize:18,
    marginTop:6
  },
  textdata:{
    fontSize:15,
    marginTop:6
  },
  textprice:{
    fontSize:18,
    fontWeight:'bold',
    color:"#239854"
  }
});

export default styles;
