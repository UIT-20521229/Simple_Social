import {
  StyleSheet, Text, View,
  ScrollView, Pressable, StatusBar,
  TouchableOpacity
} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { UserChat } from "../../../components/index";
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed'
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
    <View style={styles.container}>
      <HeaderRNE
        leftComponent={{
          text: 'Message',
          color: '#fff',
          style: { fontSize: 16, fontWeight: 'bold', color: 'white' },
          onPress: () => navigation.toggleDrawer(),
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Icon name="search" color="white" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ style: styles.header }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
});