import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';
import ChatStack from './stacks/ChatStack';

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}