import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import Login from "./pages/Login";
import Eventos from "./pages/Eventos";
import DetalhesEvento from "./pages/DetalhesEvento";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1F3541" },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
      >
        <Screen name="Login" component={Login} />
        <Screen name="Eventos" component={Eventos} />
        <Screen name="Detalhes do Evento" component={DetalhesEvento} />
      </Navigator>
    </NavigationContainer>
  );
}
