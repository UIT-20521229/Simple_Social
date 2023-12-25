import { useEffect, useLayoutEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers, setUserId } from '../../redux/slices/userSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { decode } from "base-64";
import axios from 'axios';
import { User } from '../../components/index';
import { IP } from "@env";
global.atob = decode;

export default function Home({ navigation }) {
    const { users, userId, userLoading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        await AsyncStorage.removeItem('token')
        navigation.navigate("Login")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Text>Fake</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.buttonHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                        <Icon name="message-processing-outline" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
                        <Icon name="account-group-outline" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogOut}>
                        <Icon name="logout" size={30} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])


    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('token')
            const decodeToken = jwtDecode(token)
            const userId = decodeToken.userId
            dispatch(setUserId(userId))

            axios.get(`http://${IP}:3200/api/users/${userId}`)
                .then(res => {
                    console.log("res:", res)
                    dispatch(setUsers(res.data))
                })
                .catch(err => {
                    console.log("err:", err)
                })
        }
        fetchUser()
    }, [])

    return (
        <View style={styles.container}>
            {users ? users.map((item, index) => (
                <User key={index} item={item} />
            )) : <ActivityIndicator style={{ flex: 1 }}></ActivityIndicator>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 130,
        marginRight: 5,
    },
})

