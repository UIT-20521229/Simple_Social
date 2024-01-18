import { createStackNavigator } from '@react-navigation/stack';
import { Chat, ChatMessage } from '../screens/index';

const Stack = createStackNavigator();

export default function ChatStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chats" component={Chat} />
            <Stack.Screen name="Message" component={ChatMessage} />
        </Stack.Navigator>
    )
}