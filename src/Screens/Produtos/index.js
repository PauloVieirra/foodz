import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../../Services/supabaseClient";
import { Ionicons } from "@expo/vector-icons";
import styles from './styles.js';


export default function Cadastros() {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null); // URL da imagem
  const [imageUrl, setImageUrl] = useState(null); // URL da imagem após upload
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("")
  const [medida, setMedida] = useState("kg");
  const [curtaDescricao, setCurtaDescricao] = useState("");
  const [longaDescricao, setLongaDescricao] = useState("");
  const [avaliacao, setAvaliacao] = useState("");

  // Função para selecionar a imagem usando o ImagePicker
  const selecionarImagem = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri); // Definir a URI da imagem selecionada
      }
    } catch (error) {
      Alert.alert("Erro ao selecionar imagem", error.message);
    }
  };

  // Função para enviar a imagem ao Supabase Storage
  const uploadImagem = async () => {
    if (!image) return;

    const fileName = image.split("/").pop();
    const fileType = image.split(".").pop();

    const { data, error } = await supabase.storage
      .from("products") // Substitua pelo nome do bucket no Supabase
      .upload(`produtos/${fileName}`, {
        uri: image,
        name: fileName,
        type: `image/${fileType}`,
      });

    if (error) {
      Alert.alert("Erro ao fazer upload da imagem", error.message);
      throw error;
    }

    // Recupera a URL da imagem após o upload
    const url = supabase.storage
      .from("products")
      .getPublicUrl(`produtos/${fileName}`).data.publicUrl;

    setImageUrl(url); // Define o estado com a URL da imagem
    return url;
  };

  // Função para enviar os dados do produto ao Supabase
  const cadastrarProduto = async () => {
    try {
      const url = await uploadImagem(); // Aguarda o upload da imagem
      const { data, error } = await supabase.from("produtos").insert([
        {
          imagem_url: url,
          nome: nome,
          preco: preco,
          quant: quantidade,
          medida: medida,
          curta_descricao: curtaDescricao,
          longa_descricao: longaDescricao,
          avaliacao: avaliacao,
        },
      ]);

      if (error) {
        Alert.alert("Erro ao cadastrar produto", error.message);
      } else {
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
        // Resetar formulário após cadastro
        resetForm();
      }
    } catch (error) {
      Alert.alert("Erro inesperado", error.message);
    }
  };

  // Resetar formulário
  const resetForm = () => {
    setStep(1);
    setImage(null);
    setImageUrl(null);
    setNome("");
    setPreco("");
    setQuantidade("");
    setMedida("kg");
    setCurtaDescricao("");
    setLongaDescricao("");
    setAvaliacao("");
  };

  return (
    <View style={styles.contstep}>
      <View style={styles.line}><Text style={styles.title}>Cadastro</Text></View>
      {step === 1 && (
        <>
           <View style={styles.conttextimg}>
              <Text style={styles.textimg}>Primeiro escolha uma imagem do seu produto</Text>
          </View>
          <View style={styles.contitem}>
          <TouchableOpacity onPress={selecionarImagem} style={styles.contimage}>
            {image ? <Image source={{ uri: image }} style={styles.image}  resizeMode="contain" /> : <Ionicons name="images" style={styles.icon}></Ionicons>}
          </TouchableOpacity>
          <View style={styles.line}>
         
          </View>
         
           </View>
          <View style={styles.contnav}>
          <TouchableOpacity onPress={selecionarImagem} style={styles.secundarybtn}>
            <Text style={styles.textbtnsec}> {image ? "Trocar Imagem" : "Selecionar Imagem"} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep(2)} style={styles.prymarybtn}>
            <Text style={styles.textbtn}> Próximo </Text>
          </TouchableOpacity>
          </View>
        </>
      )}

      {step === 2 && (
        <View style={styles.contstep}>
        <View style={styles.conttextimg}>
              <Text style={styles.textimg}>Escreva o nome do produto</Text>
          </View>
        <View style={styles.contitem}>
          <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
        
          <TextInput
            placeholder="Preço"
            value={preco}
            keyboardType="numeric"
            onChangeText={setPreco}
            style={styles.input} 
          />

          <View style={styles.linequant}>
            <TextInput
              placeholder="Quantidade"
              value={quantidade}
              keyboardType="numeric"
              onChangeText={setQuantidade}
              style={styles.inputmedium} 
            />
           <Picker selectedValue={medida} onValueChange={(itemValue) => setMedida(itemValue)} style={styles.inputpicker}>
            <Picker.Item label="Kg" value="kg" />
            <Picker.Item label="Ml" value="ml" />
            <Picker.Item label="Un" value="un" />
           </Picker>
           </View>

           </View> 


          <View style={styles.contnav}>
          <TouchableOpacity  onPress={() => setStep(1)} style={styles.prymarybtn}>
            <Text style={styles.textbtn}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep(3)} style={styles.prymarybtn}>
            <Text style={styles.textbtn}> Próximo </Text>
          </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.contstep}>
          <View style={styles.contitemdescriptsup}>
            <View style={styles.line}>
              <Text style={styles.textimg}>Informe uma descricao curta</Text>
            </View>
           
           <TextInput
            placeholder="Curta Descrição"
            value={curtaDescricao}
            onChangeText={setCurtaDescricao}
            maxLength={100}
            style={styles.inputtextcurto}
          />
         </View>
         <View style={styles.contitemdescript}>
         <View style={styles.line}>
              <Text style={styles.textimg}>Informe uma descricao mais completa</Text>
            </View>
         <TextInput
            placeholder="Longa Descrição"
            value={longaDescricao}
            onChangeText={setLongaDescricao}
            multiline={true} // Permite múltiplas linhas
            numberOfLines={4} // Número inicial de linhas
            style={styles.inputtextlongo}
          />
         </View>


          <View style={styles.contnav}>
          <TouchableOpacity onPress={() => setStep(2)} style={styles.prymarybtn}>
            <Text style={styles.textbtn}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity title="Próximo" onPress={() => setStep(4)} style={styles.prymarybtn}>
            <Text style={styles.textbtn}> Próximo </Text>
          </TouchableOpacity>
            </View>
        </View>
      )}

      {step === 4 && (
      
       <View style={styles.contstep}>
      
       <View style={styles.contitem}>
       <View style={styles.contimage}>  
           {image && <Image source={{ uri: image }} style={styles.image} resizeMode="contain"  />}
       </View>
       </View>
       <View style={styles.contitemdescript}>
       <View style={styles.line}>
         <Text style={styles.title}>{nome}</Text>
       </View>
      <View style={styles.line}>
       <Text style={styles.preco}>{preco}</Text>
        <Text style={styles.medida}> {medida}</Text>
      </View>
       <View>
         <Text style={styles.text}>{curtaDescricao}</Text>
        <Text style={styles.text}>{longaDescricao}</Text> 
       </View>
       <View>
       <Text>{avaliacao}</Text>
       </View>
      
       </View>
       <View style={styles.contnav}>
       <TouchableOpacity  onPress={() => setStep(3)} style={styles.prymarybtn}>
        <Text> Voltar </Text>
       </TouchableOpacity>
       <TouchableOpacity  onPress={cadastrarProduto} style={styles.prymago}>
         <Text>Confirmar</Text>
       </TouchableOpacity>
       </View>
     </View> 
      )}

     
      
     
    </View>
 
  );
}
