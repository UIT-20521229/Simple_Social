import { createStackNavigator } from '@react-navigation/stack';
import { NewsFeed, DetailsUser } from '../screens/index';

const Stack = createStackNavigator();

export default function ChatStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NewsFeeds" component={NewsFeed} />
            <Stack.Screen name="DetailsUser" component={DetailsUser} />
        </Stack.Navigator>
    )
}