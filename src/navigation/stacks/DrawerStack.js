import {
    CreateDrawerNavigator, DrawerContentScrollView,
    DrawerItemList, DrawerItem, createDrawerNavigator
} from '@react-navigation/drawer';
import { Help, Login } from '../screens';
import BottomStack from './BottomStack';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function AppDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <DrawerItemList {...props} style={{ borderwidth: 1 }} />
            <View style={{ flex: 1, borderwidth: 1 }}>
                <DrawerItem label={() => <Icon name='exit-outline' type='ionicon' size={40} />}
                    onPress={() => {
                        props?.navigation.replace("Login")
                        AsyncStorage.clear()
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
            initialRouteName='Home'
            drawerContent={props => <AppDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={BottomStack} />
            <Drawer.Screen name="Help" component={Help} />
        </Drawer.Navigator>
    )
}