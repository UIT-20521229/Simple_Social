import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { FriendRequest } from "../../components/index";
import { useSelector, useDispatch } from "react-redux";
import { IP } from "@env";
import { setUserId } from "../../redux/slices/userSlice";

export default function Friends() {
    const { userId } = useSelector((state) => state.user);
    const [friendRequests, setFriendRequests] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get(
                    `http://${IP}:3200/api/friend-request/${userId}`
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
            {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}

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
        padding: 10,
        marginHorizontal: 12,
    },
});

