import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';


export default function HomeScreen({ navigation }) {
  const [idadeAtual, setIdadeAtual] = useState('');
  const [idadeAposentadoria, setIdadeAposentadoria] = useState('');
  const [valorDesejado, setValorDesejado] = useState('');
  const [resultado, setResultado] = useState(null);
  const [prazoMeses, setPrazoMeses] = useState(null);
  const [acumuladoCom300, setAcumuladoCom300] = useState(null);

  const rentabilidadeMensal = 0.007;
  const valorTeste = 300; 

  const calcularInvestimentoMensal = () => {
    const idadeAtualNum = parseInt(idadeAtual);
    const idadeAposentadoriaNum = parseInt(idadeAposentadoria);
    const valorDesejadoNum = parseFloat(valorDesejado);

    if (
      isNaN(idadeAtualNum) ||
      isNaN(idadeAposentadoriaNum) ||
      isNaN(valorDesejadoNum) ||
      idadeAposentadoriaNum <= idadeAtualNum
    ) {
      setResultado('Verifique os dados inseridos.');
      return;
    }

    const meses = (idadeAposentadoriaNum - idadeAtualNum) * 12;
    setPrazoMeses(meses);

    // Valor mensal necessário para atingir a meta
    const fator = Math.pow(1 + rentabilidadeMensal, meses);
    const investimentoMensal = (valorDesejadoNum * rentabilidadeMensal) / (fator - 1);
    setResultado(investimentoMensal.toFixed(2));

    // Simulação extra: quanto acumularia com R$ 300 por mês
    const acumulado = valorTeste * ((Math.pow(1 + rentabilidadeMensal, meses) - 1) / rentabilidadeMensal);
    setAcumuladoCom300(acumulado.toFixed(2));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Calculadora de Aposentadoria 💰</Text>

        <Text> 🧓 Idade atual:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={idadeAtual}
          onChangeText={setIdadeAtual}
        />

        <Text>🎯 Idade para se aposentar:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={idadeAposentadoria}
          onChangeText={setIdadeAposentadoria}
        />

        <Text>💰 Valor desejado para aposentadoria (R$):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={valorDesejado}
          onChangeText={setValorDesejado}
        />

        <Text style={styles.fixedRate}>📈 Rentabilidade mensal: 0,7% ao mês (fixa)</Text>

        <Button title="Calcular" onPress={calcularInvestimentoMensal} />

        {resultado && (
          <View style={styles.resultBox}>
            <Text style={styles.resultado}>📌 Prazo total: {prazoMeses} meses</Text>
            <Text style={styles.resultado}>📌 Investimento mensal necessário: R$ {resultado}</Text>
            <Text style={styles.resultado}>📌 Se guardar R$300/mês, acumulará: R$ {acumuladoCom300}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  fixedRate: {
    marginBottom: 20,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f4f7',
    borderRadius: 8,
  },
  resultado: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2e7d32',
    marginBottom: 8,
  },
});