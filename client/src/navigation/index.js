import AuthStack from './stacks/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import DrawerStack from './stacks/DrawerStack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { setIsLogged } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function RootNavigator() {
    const dispatch = useDispatch();
    const { isLogged } = useSelector(state => state.user);
    const scheme = useColorScheme();

    useEffect(() => {
        const keepLoggedIn = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                dispatch(setIsLogged(true));
            } else return;
        };
        keepLoggedIn();
    }, [isLogged]);

    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            {isLogged ? <DrawerStack /> : <AuthStack />}
        </NavigationContainer>
    )
}