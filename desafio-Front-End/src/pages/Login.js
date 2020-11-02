import React, { useState, useRef } from "react";
import api from "../api";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [showConnecting, setConnecting] = useState(false);
  const ref1 = useRef();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Sair da aplicação?",
          "",
          [
            { text: "NÃO", onPress: () => null, style: "cancel" },
            {
              text: "SIM",
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ],
          { cancelable: false }
        );
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        setAlert(false);
        setConnecting(false);
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  async function logar() {
    var data = {
      email: email,
      password: password,
    };
    try {
      const response = await api.post("/auth/login", data);
      if (!!response.data.access_token) {
        setConnecting(false);
        setPassword("");
        setEmail("");
        navigation.navigate("Eventos", response.data.access_token);
      }

      if (response.data.error == "Unauthorized") {
        setConnecting(false);
        setTimeout(()=>setAlert(true), 200);
      }
    } catch (error) {
      setConnecting(false);
      console.log(error);
      setTimeout(()=>setAlert(true), 200);
    }
  }

  async function formSubmitted() {
    setConnecting(true);
    logar();
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        style={styles.logoImage}
        source={require("../../assets/Logo.png")}
      />
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onSubmitEditing={() => ref1.current.focus()}
          autoCorrect={false}
          style={styles.inputText}
          placeholder="Email..."
          value={email}
          blurOnSubmit={false}
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          ref={ref1}
          onSubmitEditing={() => formSubmitted()}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          value={password}
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => formSubmitted()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <AwesomeAlert
        show={showConnecting}
        showProgress={true}
        title="Conectando..."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />
      <AwesomeAlert
        show={alert}
        showProgress={false}
        title="Email ou Senha incorretos!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Confirmar"
        confirmButtonColor="#3ac2d0"
        onConfirmPressed={() => {
          setAlert(false);
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0074B7",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#7D40E7",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#1F3541",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
  logoImage: {
    marginBottom: 60,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
});
