import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { setUser } from '../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import AuthStack from './stacks/AuthStack';
import ChatStack from './stacks/ChatStack';
import { ContactList } from './screens/index';
import axios from 'axios';

export default function RootNavigator() {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("https://randomuser.me/api/")
            .then(res => {
                dispatch(setUser(res.data.results[0]));
            })
            .catch(err => console.log(err))
    }, [user]);

    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <ActivityIndicator size="large" color="blue" />
    //         </View>
    //     )
    // }

    return (
        <NavigationContainer>
            {user ? <ChatStack /> : <AuthStack />}
            {/* <ContactList /> */}
        </NavigationContainer>
    )
}