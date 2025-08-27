import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function Inflacao() {
  const [valorAtual, setValorAtual] = useState("");
  const [inflacao, setInflacao] = useState("");
  const [tempo, setTempo] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const vAtual = parseFloat(valorAtual);
    const taxa = parseFloat(inflacao) / 100;
    const anos = parseInt(tempo);

    if (isNaN(vAtual) || isNaN(taxa) || isNaN(anos)) return;

    const vFuturo = vAtual * Math.pow(1 + taxa, anos);
    const poderCompra = vAtual / Math.pow(1 + taxa, anos);

    setResultado({
      vFuturo: vFuturo.toFixed(2),
      poderCompra: poderCompra.toFixed(2),
      dados: [vAtual, vFuturo],
      labels: ["Atual", "Futuro"]
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💰 Calculadora de Inflação</Text>

      <TextInput
        style={styles.input}
        placeholder="Valor Atual (R$)"
        keyboardType="numeric"
        value={valorAtual}
        onChangeText={setValorAtual}
      />
      <TextInput
        style={styles.input}
        placeholder="Taxa de Inflação Anual (%)"
        keyboardType="numeric"
        value={inflacao}
        onChangeText={setInflacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Tempo (anos)"
        keyboardType="numeric"
        value={tempo}
        onChangeText={setTempo}
      />

      <TouchableOpacity style={styles.button} onPress={calcular}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>📈 Valor Futuro: R$ {resultado.vFuturo}</Text>
          <Text style={styles.resultText}>🛒 Poder de Compra Atual: R$ {resultado.poderCompra}</Text>

          <BarChart
            data={{
              labels: resultado.labels,
              datasets: [{ data: resultado.dados.map(val => parseFloat(val)) }]
            }}
            width={Dimensions.get("window").width - 60}
            height={250}
            yAxisLabel="R$ "
            chartConfig={{
              backgroundGradientFrom: "#fefefe",
              backgroundGradientTo: "#ffe5f0",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(151,7,71,${opacity})`,
              labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
              barPercentage: 0.6,
              style: { borderRadius: 12 },
            }}
            style={{ marginTop: 20, borderRadius: 15 }}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff0f6",
    minHeight: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#970747",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "#970747",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultBox: {
    marginTop: 25,
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "500",
    color: "#333",
  },
});
