import {
    CreateDrawerNavigator, DrawerContentScrollView,
    DrawerItemList, DrawerItem, createDrawerNavigator
} from '@react-navigation/drawer';
import { Help, Login } from '../screens';
import BottomStack from './BottomStack';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../../redux/slices/userSlice';

const Drawer = createDrawerNavigator();

function AppDrawerContent(props) {
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <DrawerItemList {...props} style={{ borderwidth: 1 }} />
            <View style={{ flex: 1, borderwidth: 1 }}>
                <DrawerItem label={() => <Icon name='exit-outline' type='ionicon' size={40} />}
                    onPress={async () => {
                        await AsyncStorage.clear()
                        dispatch(setIsLogged(false))
                    }}
                    style={{ flex: 1, marginTop: 480, marginLeft: 180 }}
                />
            </View>
        </DrawerContentScrollView>
    );
}

export default function DrawerStack() {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='HomeScreen'
            drawerContent={props => <AppDrawerContent {...props} />}
        >
            <Drawer.Screen name="HomeScreen" component={BottomStack} options={{ title: 'Home' }} />
            <Drawer.Screen name="Help" component={Help} />
        </Drawer.Navigator>
    )
}