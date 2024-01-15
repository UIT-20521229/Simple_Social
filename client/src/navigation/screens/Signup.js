import React, { useState } from "react";
import { IP } from "@env";
import {
  Alert, StyleSheet, Image, Text,
  Button, TextInput, View, SafeAreaView,
  KeyboardAvoidingView, Pressable, StatusBar,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const onHandleSignup = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    }

    await axios.post(`http://${IP}:3200/api/register`, user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setAvatar("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={styles.container}
        keyboardVerticalOffset={-100}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Register To your Account</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholderTextColor="black"
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholderTextColor="black"
              placeholder="Enter your email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
              placeholderTextColor="black"
              placeholder="Enter your password"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Image</Text>
            <TextInput
              value={avatar}
              onChangeText={(text) => setAvatar(text)}
              style={styles.input}
              placeholderTextColor="black"
              placeholder="Enter the image URL"
            />
          </View>

          <Pressable
            onPress={onHandleSignup}
            style={styles.registerButton}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.signInLink}
          >
            <Text style={styles.signInLinkText}>
              Already Have an account? Sign in
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
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 50,
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
    marginTop: 10,
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
  registerButton: {
    width: 200,
    backgroundColor: "#4A55A2",
    padding: 15,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signInLink: {
    marginTop: 15,
  },
  signInLinkText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});



