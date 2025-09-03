import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#f7e6eb", "#ffffff"]}
      style={styles.container}
    >
      <Text style={styles.title}>📊 Calculadoras Financeiras</Text>
      <Text style={styles.subtitle}>Escolha uma opção abaixo:</Text>

      <View style={styles.buttonsGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Juros")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>📈 Calculadora de Juros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Inflacao")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>💵 Calculadora de Inflação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Idoso")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>🧓 Calculadora de Aposentadoria</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.bottomButton]}
        onPress={() => navigation.navigate("SobreDesenvolvedores")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>⚙️ Sobre Desenvolvedores</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#970747",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: "#444",
    textAlign: "center",
  },
  buttonsGroup: {
    // mantém os 3 primeiros botões agrupados
  },
  button: {
    backgroundColor: "#970747",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomButton: {
    marginTop: "auto", 
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});
