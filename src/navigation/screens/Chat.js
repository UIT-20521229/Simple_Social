import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import {
  TouchableOpacity, Text, Button, Image,
  View, StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { sendMessage } from "../../redux/slices/messageSlice";
import { setUserId } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chat() {
  const { message } = useSelector(state => state.message);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //State handle upload file
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState([]);

  const handleChoose = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    const uri = result.assets[0].uri;
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    setImage(uri);
    setImageUrl(fileName);
  };

  const onSignOut = () => {
    dispatch(setUserId(null));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSignOut}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    let myMsg = {
      _id: msg._id,
      createdAt: msg.createdAt,
      text: msg.text,
      user: msg.user,
    };

    if (imageUrl !== '') {
      myMsg = {
        ...myMsg,
        image: image,
      };
    }
    else {
      myMsg = {
        ...myMsg,
        image: '',
      };
    }

    await addDoc(collection(database, 'chats'), {
      ...myMsg,
      image: imageUrl || '',
    });

    dispatch(sendMessage(myMsg))
    setImage(null);
    setImageUrl('');
  }, []);

  console.log(message)

  return (
    <View style={styles.container}>
      <GiftedChat
        key={user => user._id}
        messages={message}
        onSend={messages => onSend(messages)}
        user={{ '_id': 1, 'name': 'User Test' }}
        renderSend={(props) => (
          <View
            style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
            {imageUrl !== '' ? (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  marginRight: 10,
                }}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    position: 'absolute',
                  }}
                />
                <TouchableOpacity
                  onPress={() => { setImageUrl(''); }}
                  style={{ width: 16, height: 16, tintColor: '#fff' }}
                >
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                handleChoose();
              }}>
              <Icon
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 10,
                  color: 'orange',
                }}
                name="paperclip"
                size={24}
              />
            </TouchableOpacity>
            <Send {...props} containerStyle={{ justifyContent: 'center' }}>
              <Icon
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 10,
                  color: 'orange',
                }}
                name="send"
                size={24}
              />
            </Send>
          </View>
        )}
        alwaysShowSend
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
