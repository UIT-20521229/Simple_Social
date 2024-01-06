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
    const [sendMessages, setSendMessages] = useState(true)
    const { receiveId } = route.params
    const { userId } = useSelector(state => state.user)
    const [image, setImage] = useState('')

    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    }, [navigation])

    useEffect(() => {
        dispatch(reset())
        const fetchMessages = () => {
            axios.get(`http://${IP}:3200/api/messages/${userId}/${receiveId}`)
                .then(res => {
                    dispatch(sendMessage(res.data))
                })
                .catch(err => console.log(err))
        }
        fetchMessages()
    }, [image, sendMessages])

    const onSend = async (messages = []) => {
        const msg = messages[0]
        dispatch(sendMessage(msg))
        try {
            const data = new FormData()
            data.append('text', msg.text)
            data.append('user', msg.user._id)
            data.append('image', {
                uri: image.uri,
                type: `${image.type}/jpeg`,
                name: 'image.jpg'
            } || null);
            data.append('receiveId', receiveId)

            const respone = await axios.post(`http://${IP}:3200/api/messages`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSendMessages(!sendMessages)
            setImage('')
        } catch (error) {
            console.log(error.status.message)
        }
    }

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
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
                renderMessageImage={props => {
                    const imageUri = props.currentMessage.image;
                    const fileName = imageUri.split('\\').pop().split('/').pop();
                    return (
                        <Image
                            {...props}
                            source={{ uri: `http://${IP}:3200/${fileName}` }}
                            style={{ width: 150, height: 100 }}
                            borderTopLeftRadius={10}
                            borderTopRightRadius={10}
                        />
                    );
                }}
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