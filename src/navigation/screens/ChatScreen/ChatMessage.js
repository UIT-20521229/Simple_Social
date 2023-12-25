import { IP } from '@env'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { useCallback, useState, useEffect, useLayoutEffect, useMemo } from 'react'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage, reset } from '../../../redux/slices/messageSlice'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';

export default function ChatMessage() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()
    const { message } = useSelector(state => state.message)
    const { receiveId } = route.params
    const { userId } = useSelector(state => state.user)
    const [imageUrl, setImageUrl] = useState('')
    const [videoUrl, setVideoUrl] = useState('')

    useEffect(() => {
        dispatch(reset())
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://${IP}:3200/api/messages/${userId}/${receiveId}`)
                const data = await response.json();
                if (data) {
                    dispatch(sendMessage(data))
                }
            } catch (error) {
                console.log("error fetching messages", error);
            }
        }
        fetchMessages()
    }, [])

    const onSend = useCallback(async (messages = []) => {
        const msg = messages[0]

        const myMsg = {
            _id: msg._id,
            text: msg.text,
            user: msg.user,
            image: imageUrl || '',
            video: videoUrl || '',
            createdAt: new Date().toISOString(),
            receiveId: receiveId
        }
        try {
            await axios.post(`http://${IP}:3200/api/messages`, myMsg)
            dispatch(sendMessage(myMsg))
        } catch (error) {
            console.log(error)
        }
    }, [message])

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result.assets[0])

        if (!result.canceled) {
            if (result.assets[0].type === 'video') {
                setVideoUrl(result.assets[0].uri)
            } else {
                setImageUrl(result.assets[0].uri)
            }
        }
    };

    const renderSend = props => {
        return (
            <Send {...props}>
                <Icon
                    name="send"
                    style={{
                        color: '#46CF76',
                        height: 40,
                    }}
                    size={32}
                />
            </Send>
        );
    };

    const renderBubble = props => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#46CF76',
                    },
                    left: {
                        backfroundColor: '#aaa',
                    },
                }}
            />
        );
    };

    const renderLeftIcon = () => {
        return (
            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 5, paddingRight: 5 }}>
                <TouchableOpacity onPress={chooseImage} >
                    <Icon name="image" size={30} color="#46CF76" />
                </TouchableOpacity>
            </View>
        );
    }

    return (

        <View style={styles.container}>
            <GiftedChat
                messages={message}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userId,
                }}
                alwaysShowSend
                renderSend={renderSend}
                renderBubble={renderBubble}
                renderActions={renderLeftIcon}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})