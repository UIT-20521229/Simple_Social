import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { Avatar, Text, Chip, Button, Icon } from '@rneui/themed';
import axios from 'axios'
import { IP } from '@env'

export default function DetailsUser() {
    const route = useRoute()
    const { user } = route.params
    const [avatar, setAvatar] = useState(null)
    const [username, setUsername] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Avatar
                    size={100}
                    rounded
                    source={avatar ? avatar : { uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
                    key={user._id}
                />
            </View>
            <View style={styles.userName}>
                <Text style={styles.textUserName}>@{user.name}</Text>
            </View>
            <View style={styles.button}>
                <Button
                    icon={() => (
                        <Icon name="chat" type='entypo' color="white" />
                    )}
                    iconContainerStyle={{ marginLeft: 10 }}
                    buttonStyle={{
                        backgroundColor: 'rgba(199, 43, 98, 1)',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 50,
                        marginVertical: 40,
                    }}
                />
                <Button
                    icon={() => (
                        <Icon name="call" type='Ionicons' color="white" />
                    )}
                    iconContainerStyle={{ marginLeft: 10 }}
                    buttonStyle={{
                        backgroundColor: 'rgba(199, 43, 98, 1)',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 50,
                        marginVertical: 40,
                    }}
                />
            </View>
            <View>
                <Chip
                    title="Follow"
                    onPress={() => console.log('Pressed')}
                    containerStyle={{
                        marginHorizontal: 50,
                    }}
                />
            </View>
            <View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'white'
    },
    avatar: {
        alignItems: 'center',
        marginTop: 20
    },
    userName: {
        alignItems: 'center',
        marginTop: 20,
    },
    textUserName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})