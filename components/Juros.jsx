import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Juros() {
  const [valorInicial, setValorInicial] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [tempoMeses, setTempoMeses] = useState("");
  const [valorFinal, setValorFinal] = useState(null);
  const [jurosTotais, setJurosTotais] = useState(null);
  const [graficoData, setGraficoData] = useState([]);

  const calcular = () => {
    const P = parseFloat(valorInicial);
    const i = parseFloat(taxaJuros) / 100;
    const n = parseInt(tempoMeses);

    if (isNaN(P) || isNaN(i) || isNaN(n) || n <= 0) {
      setValorFinal(null);
      setJurosTotais(null);
      return;
    }

    const VF = P * Math.pow(1 + i, n);
    setValorFinal(VF.toFixed(2));
    setJurosTotais((VF - P).toFixed(2));

    const dados = [];
    for (let t = 1; t <= n; t++) {
      dados.push((P * Math.pow(1 + i, t)).toFixed(2));
    }
    setGraficoData(dados);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>📈 Simulador de Juros Compostos</Text>

        <Text style={styles.label}>💰 Valor inicial (R$):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={valorInicial}
          onChangeText={setValorInicial}
          placeholder="Ex: 1000"
        />

        <Text style={styles.label}>📊 Taxa de juros mensal (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={taxaJuros}
          onChangeText={setTaxaJuros}
          placeholder="Ex: 1,5"
        />

        <Text style={styles.label}>⏳ Tempo (meses):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={tempoMeses}
          onChangeText={setTempoMeses}
          placeholder="Ex: 12"
        />

        <TouchableOpacity style={styles.button} onPress={calcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {valorFinal && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>📌 Valor final: R$ {valorFinal}</Text>
            <Text style={styles.resultText}>
              📌 Total de juros ganhos: R$ {jurosTotais}
            </Text>
          </View>
        )}

        {graficoData.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Evolução do investimento</Text>
            <LineChart
              data={{
                labels: ["0", Math.floor(tempoMeses / 2).toString(), tempoMeses],
                datasets: [
                  {
                    data: graficoData.map((v) => parseFloat(v)),
                    color: (opacity = 1) => `rgba(151, 7, 71, ${opacity})`,
                    strokeWidth: 3,
                  },
                ],
                legend: ["Valor acumulado"],
              }}
              width={Dimensions.get("window").width - 60}
              height={250}
              chartConfig={{
                backgroundGradientFrom: "#fff0f6",
                backgroundGradientTo: "#ffe5f0",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(151, 7, 71, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#970747",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { fontSize: 16, marginBottom: 6, color: "#333", fontWeight: "500" },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    backgroundColor: "#970747",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#970747",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  resultBox: {
    marginTop: 20,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultText: { fontSize: 16, color: "#2e7d32", marginBottom: 6 },
  chartContainer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#970747",
    textAlign: "center",
  },
});
