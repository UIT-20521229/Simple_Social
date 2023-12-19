import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}