import { useCallback, useEffect, useState } from "react";
import {
  Alert, StyleSheet, Image, TouchableOpacity,
  Text, Button, TextInput, View, SafeAreaView,
  KeyboardAvoidingView, Pressable, ImageBackground, StatusBar
} from "react-native";
import { IP } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Splash from "../screens/Splash";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const onHandleLogin = useCallback(async () => {
    const user = {
      email: email,
      password: password,
    };

    await axios.post(`http://${IP}:3200/users/login`, user)
      .then(async (response) => {
        console.log(response);
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);
        navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert(
          "Login Error",
          "An error occurred while logging in"
        );
        console.log("login failed", error.message);
      });
  })

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={styles.container}
        keyboardVerticalOffset={-1000}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Sign In to Your Account</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholderTextColor={"black"}
              placeholder="Enter Your Email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
              placeholderTextColor={"black"}
              placeholder="Password"
            />
          </View>

          <TouchableOpacity
            onPress={onHandleLogin}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <Pressable
            onPress={() => navigation.navigate("Signup")}
            style={styles.signupButton}
          >
            <Text style={styles.signupButtonText}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: StatusBar.currentHeight,
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#4A55A2",
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 15,
  },
  formContainer: {
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  input: {
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#4A55A2",
    padding: 15,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupButton: {
    marginTop: 15,
  },
  signupButtonText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});
