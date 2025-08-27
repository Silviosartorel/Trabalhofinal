import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen.jsx";
import Inflacao from "./components/Inflacao.jsx";
import Idoso from "./components/Idoso.jsx";
import Juros from "./components/Juros.jsx";
import SobreDesenvolvedores from "./components/SobreDesenvolvedores.jsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "📊 Calculadoras Financeiras" }}
        />
         <Stack.Screen
          name="Juros"
          component={Juros}
          options={{ title: "Calculadora de Juros" }}
        />
        <Stack.Screen
          name="Inflacao"
          component={Inflacao}
          options={{ title: "Calculadora de Inflação" }}
        />
        <Stack.Screen
          name="Idoso"
          component={Idoso}
          options={{ title: "Calculadora de Aposentadoria" }}
        />
        <Stack.Screen
          name="SobreDesenvolvedores"
          component={SobreDesenvolvedores}
          options={{ title: "Sobre os Desenvolvedores" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
