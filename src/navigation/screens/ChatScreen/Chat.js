import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { UserChat } from "../../../components/index";
import { IP } from "@env";

export default function ChatsScreen() {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId } = useSelector((state) => state.user);

  const navigation = useNavigation();

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(`http://${IP}:3200/api/accepted-friends/${userId}`);

        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, []);

  console.log("friends", acceptedFriends)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});