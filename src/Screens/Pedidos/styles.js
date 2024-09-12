import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  conteinerg: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  pedidoContainer: {
    width: '96%',
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 10
  },
  clienteNome: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pedidoInfo: {
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    paddingVertical: 5,
  },
  itemInfo: {
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Ajusta o espaçamento entre os itens
  },
});

export default styles;
