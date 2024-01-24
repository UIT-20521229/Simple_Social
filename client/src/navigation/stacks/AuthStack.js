import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, Splash } from '../screens/index';
import DrawerStack from './DrawerStack';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}