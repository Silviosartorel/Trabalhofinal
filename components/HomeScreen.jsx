import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Importando o gráfico
import { Dimensions } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [idadeAtual, setIdadeAtual] = useState('');
  const [idadeAposentadoria, setIdadeAposentadoria] = useState('');
  const [valorDesejado, setValorDesejado] = useState('');
  const [resultado, setResultado] = useState(null);
  const [prazoMeses, setPrazoMeses] = useState(null);
  const [prazoAnos, setPrazoAnos] = useState(null);
  const [graficoData, setGraficoData] = useState([]); // Armazenando os dados do gráfico

  const rentabilidadeMensal = 0.007;

  // Função para calcular o investimento mensal necessário e gerar os dados do gráfico
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

    // Convertendo meses para anos
    const anos = meses / 12;
    setPrazoAnos(anos.toFixed(1)); // Exibindo anos com 1 casa decimal

    // Valor mensal necessário para atingir a meta
    const fator = Math.pow(1 + rentabilidadeMensal, meses);
    const investimentoMensal = (valorDesejadoNum * rentabilidadeMensal) / (fator - 1);
    setResultado(investimentoMensal.toFixed(2));

    // Gerar os dados do gráfico de evolução do valor acumulado
    let valorAcumulado = 0;
    let dataGrafico = [];
    for (let i = 1; i <= meses; i++) {
      valorAcumulado += investimentoMensal * Math.pow(1 + rentabilidadeMensal, i);
      dataGrafico.push(valorAcumulado.toFixed(2));
    }

    setGraficoData(dataGrafico); // Atualizar o estado com os dados do gráfico
  };

  // Configuração do gráfico
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#ff9800',
    backgroundGradientTo: '#ff9800',
    decimalPlaces: 2, // Exibir até 2 casas decimais
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
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
            <Text style={styles.resultado}>📌 Prazo total: {prazoMeses} meses, {prazoMeses} anos</Text>
            <Text style={styles.resultado}>📌 Prazo total: {prazoAnos} anos</Text>
            <Text style={styles.resultado}>📌 Investimento mensal necessário: R$ {resultado}</Text>
          </View>
        )}

        {/* Exibir o gráfico */}
        {graficoData.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Evolução do valor acumulado ao longo dos meses</Text>
            <LineChart
              data={{
                labels: Array.from({ length: prazoMeses }, (_, i) => `${i + 1}`), // Meses como labels
                datasets: [
                  {
                    data: graficoData.map((val) => parseFloat(val)), // Dados do gráfico
                    strokeWidth: 2, // Espessura da linha
                  },
                ],
              }}
              width={Dimensions.get('window').width - 40} // Largura do gráfico (um pouco menor que a largura da tela)
              height={220} // Altura do gráfico
              chartConfig={chartConfig} // Configurações do gráfico
              bezier // Usar curvas suaves
              style={{ marginVertical: 8 }}
            />
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
  chartContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
