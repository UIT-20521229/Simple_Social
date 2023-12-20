import { createStackNavigator } from '@react-navigation/stack';
import { Home, Chat, Friends } from '../screens/index';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Friends" component={Friends} />
        </Stack.Navigator>
    )
}