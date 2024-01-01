import { StyleSheet, View, Pressable } from "react-native";
import { useContext, useEffect, useState, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { setUsers, setUserId } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { IP } from "@env";
import axios from 'axios';
import { Image, Text } from '@rneui/themed'

function UserChat({ item }) {
    const { userId } = useSelector(state => state.user);
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                await axios.get(`http://${IP}:3200/api/messages/${userId}/${item._id}`)
                    .then(res => {
                        setMessages(res.data)
                    })
                    .catch(err => console.log(err))
            } catch (error) {
                console.log("error fetching messages", error);
            }
        };
        fetchMessages();
    }, []);

    const getLastMessage = () => {
        const userMessages = messages.map((message) => {
            const lastMessage = {
                messages: message.text,
                timeStamp: message.createdAt,
            };
            return lastMessage;
        })

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
                navigation.navigate("Message", {
                    receiveId: item._id,
                })
            }
            style={styles.container}
        >
            <Image
                style={styles.image}
                source={{
                    uri: item.image ? item.image : 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/81/81ae0c5055925b5470e7621b7a1a1918f75e2ff1.jpg'
                }}
            />

            <View style={styles.content}>
                <Text style={styles.name}>{item?.name}</Text>
                {lastMessage && (
                    <Text style={styles.message}>
                        {lastMessage?.messages}
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

export default memo(UserChat);  