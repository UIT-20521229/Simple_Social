import { Axios } from "axios";
import React, { useState } from "react";
import {
  Alert, StyleSheet, Image, Text,
  Button, TextInput, View, SafeAreaView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
// const backImage = require("../assets/background.jpg");

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const onHandleSignup = async () => {
    await axios.post("http://localhost:3200/api/addUser", {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => console.log(err))
  };

  return (
    <View stlye={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>Signup</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={(name) => setEmail(name)}
          value={name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Mật khẩu"
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry={true}
        />
        <Button title="Đăng ký" onPress={onHandleSignup} />
        <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
          <Text style={{ color: "black" }}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <Text style={{ color: "black", fontWeight: "bold" }}> Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginTop: 30,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    width: 200,
    height: 40,
    backgroundColor: "#00B14F",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
