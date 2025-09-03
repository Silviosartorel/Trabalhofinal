import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Idoso({ navigation }) {
  const [idadeAtual, setIdadeAtual] = useState('');
  const [idadeAposentadoria, setIdadeAposentadoria] = useState('');
  const [valorDesejado, setValorDesejado] = useState('');
  const [resultado, setResultado] = useState(null);
  const [prazoMeses, setPrazoMeses] = useState(null);
  const [prazoAnos, setPrazoAnos] = useState(null);
  const [graficoData, setGraficoData] = useState([]);

  const rentabilidadeMensal = 0.007;

  const calcularInvestimentoMensal = () => {
    const idadeAtualNum = parseInt(idadeAtual);
    const idadeAposentadoriaNum = parseInt(idadeAposentadoria);
    const valorDesejadoNum = parseFloat(valorDesejado);

    if (isNaN(idadeAtualNum) || isNaN(idadeAposentadoriaNum) || isNaN(valorDesejadoNum) || idadeAposentadoriaNum <= idadeAtualNum) {
      setResultado('Verifique os dados inseridos.');
      return;
    }

    const meses = (idadeAposentadoriaNum - idadeAtualNum) * 12;
    setPrazoMeses(meses);

    const anos = meses / 12;
    setPrazoAnos(anos.toFixed(1));

    const fator = Math.pow(1 + rentabilidadeMensal, meses);
    const investimentoMensal = (valorDesejadoNum * rentabilidadeMensal) / (fator - 1);
    setResultado(investimentoMensal.toFixed(2));

    // Evolução do valor acumulado
    let valorAcumulado = 0;
    let dataGrafico = [];
    for (let i = 1; i <= meses; i++) {
      valorAcumulado = valorAcumulado * (1 + rentabilidadeMensal) + investimentoMensal;
      dataGrafico.push(valorAcumulado.toFixed(2));
    }
    setGraficoData(dataGrafico);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>💰 Calculadora de Aposentadoria</Text>

        <Text style={styles.label}>👦 Idade Atual:</Text>
        <TextInput
          style={styles.input}
          placeholder="Idade Atual"
          keyboardType="numeric"
          value={idadeAtual}
          onChangeText={setIdadeAtual}
        />

        <Text style={styles.label}>👴 Idade para Aposentar:</Text>
        <TextInput
          style={styles.input}
          placeholder="Idade para Aposentar"
          keyboardType="numeric"
          value={idadeAposentadoria}
          onChangeText={setIdadeAposentadoria}
        />

        <Text style={styles.label}>💰 Valor Desejado (R$):</Text>
        <TextInput
          style={styles.input}
          placeholder="Valor Desejado (R$)"
          keyboardType="numeric"
          value={valorDesejado}
          onChangeText={setValorDesejado}
        />

        <Text style={styles.fixedRate}>📈 Rentabilidade mensal: 0,7% (fixa)</Text>

        <TouchableOpacity style={styles.button} onPress={calcularInvestimentoMensal}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>📌 Prazo total: {prazoMeses} meses ({prazoAnos} anos)</Text>
            <Text style={styles.resultText}>📌 Investimento mensal necessário: R$ {resultado}</Text>
          </View>
        )}

        {graficoData.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>📈 Evolução do valor acumulado</Text>
            <LineChart
              data={{
                labels: ["0", Math.floor(prazoMeses / 2).toString(), prazoMeses.toString()],
                datasets: [{ data: graficoData.map(val => parseFloat(val)), color: (opacity = 1) => `rgba(151, 7, 71, ${opacity})`, strokeWidth: 3 }],
                legend: ["Projeção de Acúmulo"]
              }}
              width={Dimensions.get("window").width - 60}
              height={250}
              chartConfig={{
                backgroundGradientFrom: "#fff0f6",
                backgroundGradientTo: "#ffe5f0",
                color: (opacity = 1) => `rgba(151, 7, 71, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                propsForDots: { r: "4", strokeWidth: "2", stroke: "#970747" },
              }}
              style={{ marginTop: 20, borderRadius: 15 }}
              fromZero
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff0f6" },
  inner: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#970747", marginBottom: 20, textAlign: "center" },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fixedRate: { fontSize: 16, fontStyle: "italic", color: "#555", marginVertical: 10 },
  button: {
    backgroundColor: "#970747",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  resultBox: {
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resultText: { fontSize: 18, marginVertical: 5, color: "#333" },
  chartContainer: { marginTop: 25, padding: 15, borderRadius: 15, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
});
