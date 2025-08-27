import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function SobreDesenvolvedores() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👨‍💻 Sobre os Desenvolvedores</Text>

      <Text style={styles.subtitle}>
        Este aplicativo foi desenvolvido com dedicação e carinho por:
      </Text>

      <View style={styles.developerCard}>
        
        <Text style={styles.devName}>Gabriel Coelho</Text>
        <Text style={styles.devRole}>Programador</Text>
      </View>

      <View style={styles.developerCard}>
        
        <Text style={styles.devName}>Silvio Sartorel</Text>
        <Text style={styles.devRole}>Programador</Text>
      </View>

      <Text style={styles.footer}>
        Obrigado por usar nosso app! Esperamos que nossas calculadoras
        financeiras sejam úteis para você. 💜
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff0f6",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#970747",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
  },
  developerCard: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
  },
  devName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#970747",
  },
  devRole: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  footer: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 30,
    paddingHorizontal: 10,
  },
});
