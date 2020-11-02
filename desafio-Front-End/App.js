import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes";
import {useFonts } from 'expo-font';
import {RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono'
import {Signika_400Regular, Signika_700Bold } from '@expo-google-fonts/signika'

export default function App() {
  
  const [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
    Signika_400Regular,
    Signika_700Bold
  });

  if(!fontsLoaded){
    return null;
  }

  return <Routes />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
  },
});
