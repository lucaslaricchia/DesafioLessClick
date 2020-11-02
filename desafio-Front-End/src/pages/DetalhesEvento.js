import moment from "moment";
import api from "../api";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ticket from "../components/ticket";
import AwesomeAlert from "react-native-awesome-alerts";

export default function DetalhesEvento({ route, navigation }) {
  const evento = route.params.evento;
  const token = route.params.token;
  const [listaIngressos, setListaIngressos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(0);
  const [showAlert, setAlert] = useState(true);
  const [loading, setLoading] = useState(false);
  const [vazio, setVazio] = useState(false);

  async function loadIngressos() {
    if (!!totalPage && page > totalPage) return;
    if (page > 1) {
      setLoading(true);
    }

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(
        `/eventos/${evento.id}/ingressos?page=${page}`,
        options
      );
      if (response.data.total == 0) {
        setAlert(false);
        setVazio(true);
        setLoading(false);
        return;
      }
      setLoading(false);
      setTotalPages(response.data.last_page);
      setListaIngressos([...listaIngressos, ...response.data.data]);
      setPage(page + 1);
      setAlert(false);
    } catch (error) {
      setAlert(false);
      console.log(error);
    }
  }

  const loader = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 20,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color="#999" />
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      loadIngressos();
      return () => {
        setPage(1);
        setTotalPages(0);
        setListaIngressos([]);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        showProgress={true}
        title="Loading..."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />
      <View style={styles.header}>
        <Text style={styles.nome}>{evento.nome}</Text>
        <Text style={styles.dataInicial}>
          Início: {moment(evento.data).format("DD/MM/YYYY HH:MM")}
        </Text>
      </View>

      {vazio ? (
        <View style={styles.lista}>
          <View
            style={{
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#FFF",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Nenhum ingresso encontrado</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={listaIngressos}
          keyExtractor={(ingresso) => String(ingresso.id)}
          style={styles.lista}
          onEndReached={() => loadIngressos()}
          onEndReachedThreshold={0.2}
          ListFooterComponent={loading && loader}
          renderItem={({ item }) => (
            <View style={styles.ingressoContainer}>
              <Ticket
                props={{
                  nome: item.nome,
                  valor: item.valor,
                  setor: item.setor.nome,
                  id: item.id,
                }}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

/*
Alguns estilos...
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
    backgroundColor: "#0074B7",
  },
  header: {
    backgroundColor: "#003B73",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
  },
  nome: {
    fontFamily: "Signika_700Bold",
    letterSpacing: 1.5,
    fontSize: 19,
    color: "white",
    marginLeft: 5,
  },
  dataInicial: {
    color: "#fcfcfc",
    fontSize: 15,
  },
  lista: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  ingressoContainer: {
    height: 75,
    borderRadius: 8,
    marginBottom: 16,
  },
});
