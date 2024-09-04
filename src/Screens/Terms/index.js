import React from 'react';
import { ScrollView, View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';

const TermsAndPrivacyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Termos de Uso</Text>
        <Text style={styles.section}>
          {`Bem-vindo ao nosso aplicativo. Ao usar nosso aplicativo, você concorda com os seguintes termos e condições. Por favor, leia-os com atenção.`}
        </Text>
        <Text style={styles.section}>
          {`1. Aceitação dos Termos\n
          Ao usar nosso aplicativo, você concorda em cumprir e estar sujeito aos termos e condições estabelecidos neste documento. Se você não concordar com algum dos termos, por favor, não use o aplicativo.\n
          2. Uso do Aplicativo\n
          Você concorda em usar o aplicativo apenas para fins legais e de acordo com todas as leis aplicáveis.\n
          3. Propriedade Intelectual\n
          Todo o conteúdo do aplicativo, incluindo textos, gráficos e outros materiais, é protegido por direitos autorais e outras leis de propriedade intelectual.\n
          4. Modificações\n
          Podemos atualizar estes termos a qualquer momento. As mudanças serão publicadas no aplicativo e entrarão em vigor imediatamente.`}
        </Text>

        <Text style={styles.header}>Política de Privacidade</Text>
        <Text style={styles.section}>
          {`Sua privacidade é importante para nós. Esta política de privacidade explica como coletamos, usamos e protegemos suas informações pessoais.`}
        </Text>
        <Text style={styles.section}>
          {`1. Informações que Coletamos\n
          Coletamos informações pessoais que você nos fornece diretamente, como nome, e-mail e outras informações de contato.\n
          2. Uso das Informações\n
          Usamos suas informações para fornecer e melhorar nossos serviços, responder a consultas e para fins de marketing.\n
          3. Compartilhamento de Informações\n
          Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços ou quando exigido por lei.\n
          4. Segurança\n
          Tomamos medidas razoáveis para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.`}
        </Text>

        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  section: {
    fontSize: 16,
    marginVertical: 10,
    lineHeight: 24,
  },
});

export default TermsAndPrivacyScreen;
