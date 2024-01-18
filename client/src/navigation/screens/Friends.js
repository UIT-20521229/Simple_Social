import { Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { FriendRequest } from "../../components/index";
import { useSelector, useDispatch } from "react-redux";
import { IP } from "@env";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Friends() {
    const { userId } = useSelector((state) => state.user);
    const [friendRequests, setFriendRequests] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get(
                    `http://${IP}:3200/users/friend-request/${userId}`
                );
                if (response.status === 200) {
                    const friendRequestsData = response.data.map((friendRequest) => ({
                        _id: friendRequest._id,
                        name: friendRequest.name,
                        email: friendRequest.email,
                        image: friendRequest.image,
                    }));
                    setFriendRequests(friendRequestsData);
                }
            } catch (err) {
                console.log("error message", err);
            }
        };

        fetchFriendRequests();
    }, []);


    console.log(friendRequests);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Friends</Text>
                <TouchableOpacity>
                    <Icon name="magnify" size={26} />
                </TouchableOpacity>
            </View>

            {friendRequests.length > 0 && <Text>Friend Requests!</Text>}

            {friendRequests.map((item, index) => (
                <FriendRequest
                    key={index}
                    item={item}
                    friendRequests={friendRequests}
                    setFriendRequests={setFriendRequests}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        height: 50,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },

});

