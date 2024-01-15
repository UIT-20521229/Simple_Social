import { createStackNavigator } from '@react-navigation/stack';
import { Login, Setting } from '../screens/index';

const Stack = createStackNavigator();

export default function SettingStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Settings" component={Setting} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}