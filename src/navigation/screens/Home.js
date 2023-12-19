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
global.atob = decode;

export default Home = ({ navigation }) => {
    const { users, userId, userLoading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        fetchUser()
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Text>Chat</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.buttonHeader}>
                    <TouchableOpacity >
                        <Icon name="message-processing-outline" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogOut}>
                        <Icon name="logout" size={30} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const fetchUser = async () => {
        const token = await AsyncStorage.getItem('token')
        const decodeToken = jwtDecode(token)
        const userId = decodeToken.userId
        dispatch(setUserId(userId))
        console.log("userId:", userId)

        axios.get(`http://26.88.95.239:3200/api/users/${userId}`)
            .then(res => {
                console.log("res:", res)
                dispatch(setUsers(res.data))
            })
            .catch(err => {
                console.log("err:", err)
            })
    }
    
    useEffect(() => {
        fetchUser()
    }, [])

        return (
            <View style={styles.container}>
                {users ? users.map((item, index) => (
                    <User key={index} item={item} />
                )) : <ActivityIndicator></ActivityIndicator>}
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 80,
        marginRight: 5,
    },
})

