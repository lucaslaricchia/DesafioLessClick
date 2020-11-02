import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import AwesomeAlert from "react-native-awesome-alerts";

import api from "../api";

export default function Eventos({ route, navigation }) {
  const token = route.params;
  const [listaEventos, setListaEventos] = useState([]);
  const [showAlert, setAlert] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noEvent, setNoEvents] = useState(false);

  async function loadEventos() {
    if (totalPages && page > totalPages) {
      return;
    }
    if (page > 1) {
      setLoading(true);
    }

    const options ={
      headers:{
        "Authorization": `Bearer ${token}`
      }
      
    }

    try {
      const response = await api.get(`/eventos?page=${page}`, options);

      if (response.status == 200) {
        setTotalPages(response.data.last_page);
        setListaEventos([...listaEventos, ...response.data.data]);
        setPage(page + 1);
        setAlert(false);
        setLoading(false);
        return;
      }

      if (response.status == 404) {
        console.log("Not Found");
        setAlert(false)
        return;
      }
    } catch (error) {
      setNoEvents(true);
      setAlert(false)
      console.log(error);
      return;
    }
  }

  useFocusEffect(
    
    React.useCallback(() => {
      setAlert(true)
      loadEventos();
      return () => {
        setPage(1);
        setTotalPages(0);
        setListaEventos([]);
      };
    }, [])
  );

  function handleNavigationToDetails(evento) {
    setListaEventos([]);
    navigation.navigate("Detalhes do Evento", {'evento': evento, 'token': token});
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

  return (
    <View style={styles.container}>
      <FlatList
        data={listaEventos}
        keyExtractor={(evento) => `${evento.id}`}
        style={styles.lista}
        onEndReached={() => loadEventos()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && loader}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.nome}</Text>
            <Text style={styles.datas}>Início: {moment(item.data).format("DD/MM/YYYY HH:MM")}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNavigationToDetails(item)}
            >
              <Text style={{ color: "black", fontSize: 16, fontWeight: 'bold' }}>
                SELECIONAR EVENTO
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <AwesomeAlert
        show={showAlert}
        showProgress={true}
        title="Loading..."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0074B7",
  },

  card: {
    flex: 1,
    padding: 5,
    backgroundColor: "#003B73",
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
  },

  title: {
    flex: 1,
    letterSpacing: 1.2,
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },

  lista: {
    backgroundColor: "#0074B7",
  },

  datas: {
    flex: 1,
    paddingBottom: 5,
    color: '#fefefe',
    paddingLeft: 5,
  },
  containerCartao: {
    flexDirection: "row",
  },

  button: {
    alignItems: "center",
    padding: 10,
    color: 'black',
    borderRadius: 5,
    backgroundColor: "#D6DDE0",
  },

  imagem: {
    width: 100,
    height: 80,
    marginBottom: 5,
  },
});
