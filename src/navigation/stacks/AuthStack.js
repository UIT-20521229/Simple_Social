import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, Splash } from '../screens/index';
import DrawerStack from './DrawerStack';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={DrawerStack} />
        </Stack.Navigator>
    )
}