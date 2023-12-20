import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { setUserId } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
    const { userId } = useSelector((state) => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const acceptRequest = async (friendRequestId) => {
        try {
            const response = await fetch(
                "http://192.168.1.3:3200/friend-request/accept",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        senderId: friendRequestId,
                        recepientId: userId,
                    }),
                }
            );

            if (response.ok) {
                setFriendRequests(
                    friendRequests.filter((request) => request._id !== friendRequestId)
                );
                navigation.navigate("Chats");
            }
        } catch (err) {
            console.log("error acceptin the friend request", err);
        }
    };
    return (
        <Pressable style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: item.image }}
            />

            <Text style={styles.text}>
                {item?.name} sent you a friend request!!
            </Text>

            <Pressable
                onPress={() => acceptRequest(item._id)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Accept</Text>
            </Pressable>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 10,
        flex: 1,
    },
    button: {
        backgroundColor: "#0066b2",
        padding: 10,
        borderRadius: 6,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
    },
});

export default FriendRequest;
