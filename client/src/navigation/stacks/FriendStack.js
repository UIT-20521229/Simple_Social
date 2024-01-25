import { createStackNavigator } from '@react-navigation/stack';
import { Home, Friends } from '../screens/index';
import ChatStack from './ChatStack';

const Stack = createStackNavigator();

// HomeStack aka Recent Message Stack 
export default function FriendStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="Chat" component={ChatStack} />
            <Stack.Screen name="Friends" component={Friends} />
        </Stack.Navigator>
    )
}