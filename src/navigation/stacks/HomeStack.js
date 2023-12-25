import { createStackNavigator } from '@react-navigation/stack';
import { Home, Friends } from '../screens/index';
import ChatStack from './ChatStack';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="Chat" component={ChatStack} options={{ headerShown: false }} />
            <Stack.Screen name="Friends" component={Friends} />
        </Stack.Navigator>
    )
}