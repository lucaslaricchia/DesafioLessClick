import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Ticket({ props }) {
  const nome = props.nome;
  const valor = props.valor;
  const setor = props.setor;
  const id = props.id;
  return (
    <View style={styles.ticket}>
      <View style={styles.ticketLeft}>
        <Text style={styles.valor}>Valor: </Text>
        <Text style={styles.reais}>${valor}</Text>
      </View>
      <View style={styles.ticketRight}>
        <Text style={styles.nome}>{nome}</Text>
    <Text style={styles.setor}>ID: {id}   Setor: {setor}</Text>
        <View style={styles.triangulo1} />
        <View style={styles.triangulo2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ticket: {
    flex: 1,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    flexDirection: "row",
  },
  valor: {
    fontFamily: 'RobotoMono_400Regular',
    color: 'black',
    fontSize: 15,
  },
  reais:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },    
  nome:{
    fontFamily: 'Signika_400Regular',
    letterSpacing: 2,
    fontSize: 16,
  },    
  setor:{
    fontFamily: 'Signika_400Regular',
    letterSpacing: 2,
    fontSize: 16,
  },    
  ticketLeft: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    justifyContent: "space-around",
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    position: "relative",
    backgroundColor: "#F94A66",
    width: "35%",
  },
  ticketRight: {
    padding: 5,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: "relative",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(0,0,0,0)",
    backgroundColor: "#AFD8F2",
    width: "65%",
    borderStyle: "dashed",
    zIndex: 0,
  },
  triangulo1: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 18,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: '#0074B7',
    position: "absolute",
    top: -3,
    left: -11,
    zIndex: 99,
    transform: [{ rotate: "180deg" }],
  },
  triangulo2: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 18,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: '#0074B7',
    position: "absolute",
    bottom: -3,
    left: -11,
    zIndex: 99,
  },
});
