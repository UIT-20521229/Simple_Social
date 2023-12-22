import { StyleSheet, Text, View } from 'react-native'
import { useCallback, useState, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { setUserId } from '../../../redux/slices/userSlice'

export default function ChatMessage() {
    const navigation = useNavigation()
    const { userId } = useSelector(state => state.user)
    const [messages, setMessages] = useState([])

    useEffect(() => {

    }, [])

    const onSend = useCallback((messages = []) => {
        const {
            sendId,
            receiveId,
            messageType,
            message,
            timestamp,
            imageUrl
        } = messages[0]

        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])
    console.log(messages)
    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userId,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})