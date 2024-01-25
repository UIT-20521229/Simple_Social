import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FriendStack from './FriendStack';
import ChatStack from './ChatStack';
import NewsFeedStack from './NewsFeedStack';
import { Setting } from '../screens/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomStack() {
    return (
        <BottomTab.Navigator initialRouteName='NewsFeed'
            shifting={true}
            labeled={false}
            barStyle={{ maxHeight: 70 }}
        >
            <BottomTab.Screen name="NewsFeed" component={NewsFeedStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="web" color={color} size={26} />
                    )
                }}
            />
            <BottomTab.Screen name="Friend" component={FriendStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="account-group" color={color} size={26} />
                    )
                }}
            />
            <BottomTab.Screen name="Chat" component={ChatStack}
                options={() => {    // Hide the tab bar when entering this screen
                    return {
                        tabBarIcon: ({ color }) => (
                            <Icon name="chat" color={color} size={26} />
                        ),
                        tabBarVisible: false,
                    };
                }}
            />
            <BottomTab.Screen name="Setting" component={Setting}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="cog" color={color} size={26} />
                    ),

                }}
            />
        </BottomTab.Navigator>
    );
}