import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { setUsers, setUserId } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux'


export default function UserChat({ item }) {
    const { userId } = useSelector(state => state.user);
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const fetchMessages = async () => {
        try {
            const response = await fetch(
                `http://192.168.1.3:3200/messages/${userId}/${item._id}`
            );
            const data = await response.json();

            if (response.ok) {
                setMessages(data);
            } else {
                console.log("error showing messags", response.status.message);
            }
        } catch (error) {
            console.log("error fetching messages", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);
    console.log(messages);

    const getLastMessage = () => {
        const userMessages = messages.filter(
            (message) => message.messageType === "text"
        );

        const n = userMessages.length;

        return userMessages[n - 1];
    };
    const lastMessage = getLastMessage();
    console.log(lastMessage);
    const formatTime = (time) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("en-US", options);
    };
    return (
        <Pressable
            onPress={() =>
                navigation.navigate("Messages", {
                    recepientId: item._id,
                })
            }
            style={styles.container}
        >
            <Image
                style={styles.image}
                source={{ uri: item?.image }}
            />

            <View style={styles.content}>
                <Text style={styles.name}>{item?.name}</Text>
                {lastMessage && (
                    <Text style={styles.message}>
                        {lastMessage?.message}
                    </Text>
                )}
            </View>

            <View>
                <Text style={styles.time}>
                    {lastMessage && formatTime(lastMessage?.timeStamp)}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: "cover",
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
    },
    message: {
        marginTop: 3,
        color: "gray",
        fontWeight: "500",
    },
    time: {
        fontSize: 11,
        fontWeight: "400",
        color: "#585858",
    },
});
