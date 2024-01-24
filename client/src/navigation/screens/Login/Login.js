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
import Splash from "../../screens/Splash";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { setIsLogged } from "../../../redux/slices/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
        dispatch(setIsLogged(true));
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
    }, 2000);
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
