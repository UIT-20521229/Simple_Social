import AuthStack from './stacks/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import DrawerStack from './stacks/DrawerStack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export default function RootNavigator() {
    const [isLogged, setIsLogged] = useState(false);
    const scheme = useColorScheme();
    useEffect(() => {
        const keepLoggedIn = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                setIsLogged(true);
            } else return;
        };
        keepLoggedIn();
    }, []);

    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            {isLogged ? <DrawerStack /> : <AuthStack />}
        </NavigationContainer>
    )
}