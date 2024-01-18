import { createStackNavigator } from '@react-navigation/stack';
import { NewsFeed, DetailsUser } from '../screens/index';

const Stack = createStackNavigator();

export default function NewsFeedStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='NewsFeeds'>
            <Stack.Screen name="NewsFeeds" component={NewsFeed} />
            <Stack.Screen name="DetailsUser" component={DetailsUser} />
        </Stack.Navigator>
    )
}