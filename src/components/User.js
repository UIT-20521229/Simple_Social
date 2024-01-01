import { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { setUsers, setUserId } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { ListItem, Avatar } from "@rneui/themed";
import { IP } from "@env";

export default function User({ item }) {
  const { userId, users } = useSelector(state => state.user);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const response = await fetch(`http://${IP}:3200/api/friends/${userId}`);

        const data = await response.json();

        if (response.ok) {
          setUserFriends(data);
        } else {
          console.log("error retrieving user friends", response.status);
        }
      } catch (error) {
        console.log("Error message", error);
      }
    };

    fetchUserFriends();
  }, [userFriends]);

  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    console.log("send friend request response");
    try {
      const response = await fetch(`http://${IP}:3200/api/friend-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });
      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  return (
    <ListItem style={styles.container} bottomDivider>
        <Avatar
          size={20}
          rounded
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
        />
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.name}>{item?.name}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.email}>{item?.email}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>

        <ListItem.Content right>
          {userFriends.includes(item._id) ? (
            <Pressable style={styles.buttonFriends}>
              <Text style={styles.buttonText}>Friends</Text>
            </Pressable>
          ) : requestSent || friendRequests.some((friend) => friend._id === item._id) ? (
            <Pressable style={styles.buttonRequestSent}>
              <Text style={styles.buttonText}>Request Sent</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => sendFriendRequest(userId, item._id)}
              style={styles.buttonAddFriend}
            >
              <Text style={styles.buttonText}>Add Friend</Text>
            </Pressable>
          )}
        </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  email: {
    marginTop: 4,
    color: "gray",
  },
  buttonFriends: {
    backgroundColor: "#82CD47",
    padding: 10,
    width: 105,
    borderRadius: 6,
  },
  buttonRequestSent: {
    backgroundColor: "gray",
    padding: 10,
    width: 105,
    borderRadius: 6,
  },
  buttonAddFriend: {
    backgroundColor: "#567189",
    padding: 10,
    borderRadius: 6,
    width: 105,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 13,
  },
});
